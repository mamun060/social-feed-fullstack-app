from django.contrib import admin
from django.urls import path , include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import ManageUserView, RegisterView , CustomTokenObtainPairView, CustomTokenRefreshView, LogoutView
from posts.views import PostViewSet, CommentViewSet

# Router for ViewSets
router = DefaultRouter()
router.register(r'posts', PostViewSet, basename='post')
router.register(r'comments', CommentViewSet, basename='comment')

urlpatterns = [
    path('admin/', admin.site.urls),
    # Auth Routes
    path('api/v1/auth/register/', RegisterView.as_view(), name='register'),
    path('api/v1/auth/login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('api/v1/auth/refresh/', CustomTokenRefreshView.as_view(), name='refresh'),
    path('api/v1/auth/logout/', LogoutView.as_view(), name='logout'),
    # path('api/v1/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/v1/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/auth/me/', ManageUserView.as_view(), name='me'),
    # App Routes
    path('api/v1/', include(router.urls)),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)