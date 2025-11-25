from rest_framework import generics , permissions
from rest_framework.permissions import AllowAny
from .serializers import UserRegistrationSerializer , UserSummarySerializer
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from rest_framework.views import APIView

User = get_user_model()
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')

            # Set Access Token (Short lived)
            response.set_cookie(
                'access_token', access_token,
                httponly=True, 
                secure=not settings.DEBUG, 
                samesite='Lax',
                max_age=300 # 5 mins
            )
            
            # Set Refresh Token (Long lived)
            response.set_cookie(
                'refresh_token', refresh_token,
                httponly=True, 
                secure=not settings.DEBUG,
                samesite='Lax',
                max_age=86400 # 1 day
            )
            
            del response.data['access']
            del response.data['refresh']
            response.data['message'] = "Login Successful"

        return response

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # SimpleJWT expects 'refresh' in body. We grab it from cookie.
        if 'refresh' not in request.data and 'refresh_token' in request.COOKIES:
            request.data['refresh'] = request.COOKIES['refresh_token']
        
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            access_token = response.data.get('access')
            
            # Update Access Token Cookie
            response.set_cookie(
                'access_token', access_token,
                httponly=True,
                secure=not settings.DEBUG,
                samesite='Lax',
                max_age=300
            )
            
            if 'access' in response.data: del response.data['access']
            if 'refresh' in response.data: del response.data['refresh']
            
        return response

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

class ManageUserView(generics.RetrieveAPIView):
    serializer_class = UserSummarySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class LogoutView(APIView):
    def post(self, request):
        response = Response({"success": True, "message": "Logged out successfully"})
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')
        
        return response