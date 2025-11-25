# posts/views.py
from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.db.models import Q
from .models import Post, Comment, PostLike, CommentLike
from .serializers import PostSerializer, CommentSerializer, LikeUserSerializer

class IsPostAuthor(permissions.BasePermission):
    """Custom permission to check if user is the author of the post"""
    def has_object_permission(self, request, view, obj):
        return obj.author == request.user

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    # Scalability: Order by newest first
    ordering = ['-created_at']
    filter_backends = [filters.SearchFilter]
    search_fields = ['content', 'author__username']
    
    def get_queryset(self):
        user = self.request.user
        # Requirement: Show Public posts OR Private posts owned by the user
        return Post.objects.filter(
            Q(visibility='public') | Q(author=user)
        ).select_related('author').prefetch_related('likes', 'comments').order_by('-created_at')

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    def perform_update(self, serializer):
        """Only allow author to update their own post"""
        if serializer.instance.author != self.request.user:
            raise PermissionDenied("You can only update your own posts.")
        serializer.save()
    
    def perform_destroy(self, instance):
        """Only allow author to delete their own post"""
        if instance.author != self.request.user:
            raise PermissionDenied("You can only delete your own posts.")
        instance.delete()
    
    @action(detail=False, methods=['get'])
    def my_posts(self, request):
        """Get all posts created by the current user"""
        user_posts = Post.objects.filter(author=request.user).select_related('author').prefetch_related('likes', 'comments').order_by('-created_at')
        serializer = self.get_serializer(user_posts, many=True)
        return Response(serializer.data)

    # Endpoint to toggle like on a post
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        post = self.get_object()
        like_obj, created = PostLike.objects.get_or_create(post=post, user=request.user)
        
        if not created:
            # If it existed, user clicked again -> Unlike
            like_obj.delete()
            return Response({'status': 'unliked'}, status=status.HTTP_200_OK)
        return Response({'status': 'liked'}, status=status.HTTP_201_CREATED)

    # Endpoint to see WHO liked the post
    @action(detail=True, methods=['get'])
    def likes_list(self, request, pk=None):
        post = self.get_object()
        likes = PostLike.objects.filter(post=post).select_related('user')
        serializer = LikeUserSerializer(likes, many=True)
        return Response(serializer.data)

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Filter comments by post_id if provided in URL params
        queryset = Comment.objects.filter(parent__isnull=True).select_related('author').prefetch_related('likes', 'replies')
        post_id = self.request.query_params.get('post_id')
        if post_id:
            queryset = queryset.filter(post_id=post_id)
        return queryset.order_by('-created_at')

    def perform_create(self, serializer):
        # Ensure post exists
        post_id = self.request.data.get('post')
        serializer.save(author=self.request.user, post_id=post_id)

    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        comment = self.get_object()
        like_obj, created = CommentLike.objects.get_or_create(comment=comment, user=request.user)
        
        if not created:
            like_obj.delete()
            return Response({'status': 'unliked'}, status=status.HTTP_200_OK)
        return Response({'status': 'liked'}, status=status.HTTP_201_CREATED)