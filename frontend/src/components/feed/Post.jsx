// components/feed/Post.jsx
import PostActions from './PostActions'; 
import Comments from './Comments';

// This remains a Server Component for display performance
export default function Post({ post }) {
    // Determine visibility text
    const visibilityText = post.is_private ? 'Private' : 'Public';

    return (
        <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
            <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
                {/* Post Top (Author Info and Dropdown) */}
                <div className="_feed_inner_timeline_post_top">
                    <div className="_feed_inner_timeline_post_box">
                        <div className="_feed_inner_timeline_post_box_image">
                            {/* Replace with actual image source */}
                            <img src={`/images/${post.author.image}`} alt="" className="_post_img" />
                        </div>
                        <div className="_feed_inner_timeline_post_box_txt">
                            <h4 className="_feed_inner_timeline_post_box_title">{post.author.name}</h4>
                            <p className="_feed_inner_timeline_post_box_para">
                                {post.time_ago} . 
                                <a href="#0">{visibilityText}</a>
                            </p>
                        </div>
                    </div>
                    {/* Dropdown (Needs state to show/hide, should be Client Component or wrapped) */}
                    <div className="_feed_inner_timeline_post_box_dropdown">
                        {/* Placeholder for Dropdown component (needs 'use client') */}
                    </div>
                </div>

                {/* Post Content */}
                <h4 className="_feed_inner_timeline_post_title">{post.content}</h4>
                {post.image_url && (
                    <div className="_feed_inner_timeline_image">
                        {/* Use S3 URL or /public/images/ if storing locally */}
                        <img src={post.image_url} alt="Post Image" className="_time_img" />
                    </div>
                )}
            </div>

            {/* Total Reactions/Counts (Needs to be a Client component to react to likes) */}
            {/* Note: This section is often complex and must be wrapped in 'use client' logic */}
            <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
                {/* ... (Likers display HTML using post.liker_preview) ... */}
                <p className="_feed_inner_timeline_total_reacts_para">9+</p>
            </div>

            {/* Reactions (Like/Comment/Share buttons - Client Component for interaction) */}
            <PostActions postId={post.id} initialPost={post} />

            {/* Comment Section (Client Component for interaction) */}
            <Comments postId={post.id} initialComments={post.comments} />
        </div>
    );
}