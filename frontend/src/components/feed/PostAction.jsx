// components/feed/PostActions.jsx
'use client';

import { useState } from 'react';
// import { useMutation } from 'react-query'; // Use a data fetching library like Tanstack Query

export default function PostActions({ postId, initialPost }) {
    const [isLiked, setIsLiked] = useState(initialPost.is_liked_by_user);
    const [likeCount, setLikeCount] = useState(initialPost.like_count);

    const handleLike = async () => {
        // Optimistic update
        setIsLiked(prev => !prev);
        setLikeCount(prev => prev + (isLiked ? -1 : 1));

        try {
            // API Call: POST to /api/posts/{postId}/like/
            const response = await fetch(`/api/posts/${postId}/like/`, {
                method: 'POST',
                // Cookies should be sent automatically by the browser
            });

            if (!response.ok) {
                // Revert optimistic update on failure
                setIsLiked(prev => !prev);
                setLikeCount(prev => prev + (isLiked ? 1 : -1));
                console.error("Failed to toggle like");
            }
        } catch (error) {
            // Revert optimistic update on error
            setIsLiked(prev => !prev);
            setLikeCount(prev => prev + (isLiked ? 1 : -1));
        }
    };

    return (
        <div className="_feed_inner_timeline_reaction">
            {/* Like/Haha Button */}
            <button 
                onClick={handleLike} 
                className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${isLiked ? '_feed_reaction_active' : ''}`}
            >
                <span className="_feed_inner_timeline_reaction_link"> 
                    {/* SVG/Emoji goes here */}
                    <span>
                        {/* Use the exact SVG code from HTML, setting fill color based on isLiked state */}
                        <svg>...</svg>
                        {isLiked ? 'Liked' : 'Haha'} 
                        ({likeCount})
                    </span>
                </span>
            </button>
            
            {/* Comment Button (Toggles comment section visibility) */}
            <button className="_feed_inner_timeline_reaction_comment _feed_reaction">
                {/* ... Comment SVG/Text ... */}
                <span>Comment</span>
            </button>
            
            {/* Share Button */}
            <button className="_feed_inner_timeline_reaction_share _feed_reaction">
                {/* ... Share SVG/Text ... */}
                <span>Share</span>
            </button>
        </div>
    );
}