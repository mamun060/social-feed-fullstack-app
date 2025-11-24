from rest_framework import serializers
from .models import Post, Comment, PostLike, CommentLike
from users.serializers import UserSummarySerializer

class CommentSerializer(serializers.ModelSerializer):
    author = UserSummarySerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'post', 'author', 'text', 'parent', 'created_at', 'likes_count', 'is_liked', 'replies')
        read_only_fields = ('post',) 

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return obj.likes.filter(user=user).exists()
        return False

    def get_replies(self, obj):
        # Fetch replies recursively (only one level deep usually suggested for API, but requirement asks for replies)
        if obj.replies.exists():
            return CommentSerializer(obj.replies.all(), many=True, context=self.context).data
        return []

class PostSerializer(serializers.ModelSerializer):
    author = UserSummarySerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    # We won't load all comments in the feed list to optimize performance. 
    # A separate endpoint or detail view should load comments.
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ('id', 'author', 'content', 'image', 'visibility', 'created_at', 'likes_count', 'is_liked', 'comments_count')

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_is_liked(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return obj.likes.filter(user=user).exists()
        return False

    def get_comments_count(self, obj):
        return obj.comments.count()

class LikeUserSerializer(serializers.ModelSerializer):
    """To show WHO liked a post"""
    user = UserSummarySerializer(read_only=True)
    class Meta:
        model = PostLike
        fields = ('user', 'created_at')