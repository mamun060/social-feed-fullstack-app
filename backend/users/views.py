from rest_framework import generics , permissions
from rest_framework.permissions import AllowAny
from .serializers import UserRegistrationSerializer , UserSummarySerializer
from django.contrib.auth import get_user_model


User = get_user_model()
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

class ManageUserView(generics.RetrieveAPIView):
    serializer_class = UserSummarySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user