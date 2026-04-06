from django.contrib import admin
from posts.models import Comment, CommentLike, Post, PostLike


class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0
    readonly_fields = ('author', 'text', 'created_at')
    fields = ('author', 'text', 'parent', 'created_at')
    show_change_link = True


class PostLikeInline(admin.TabularInline):
    model = PostLike
    extra = 0
    readonly_fields = ('user', 'created_at')
    fields = ('user', 'created_at')
    show_change_link = True


class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'author', 'visibility', 'created_at', 'updated_at')
    list_filter = ('visibility', 'created_at', 'author')
    search_fields = ('author__username', 'content')
    ordering = ('-created_at',)
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('author', 'content', 'image', 'visibility')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
    inlines = (CommentInline, PostLikeInline)


class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'post', 'author', 'parent', 'created_at')
    list_filter = ('created_at', 'author')
    search_fields = ('author__username', 'text', 'post__author__username')
    readonly_fields = ('created_at',)
    raw_id_fields = ('post', 'author', 'parent')
    ordering = ('-created_at',)


class PostLikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'post', 'user', 'created_at')
    list_filter = ('created_at', 'user')
    search_fields = ('post__author__username', 'user__username')
    readonly_fields = ('created_at',)
    raw_id_fields = ('post', 'user')
    ordering = ('-created_at',)


class CommentLikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'comment', 'user', 'created_at')
    list_filter = ('created_at', 'user')
    search_fields = ('comment__author__username', 'user__username')
    readonly_fields = ('created_at',)
    raw_id_fields = ('comment', 'user')
    ordering = ('-created_at',)


admin.site.register(Post, PostAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(PostLike, PostLikeAdmin)
admin.site.register(CommentLike, CommentLikeAdmin)
