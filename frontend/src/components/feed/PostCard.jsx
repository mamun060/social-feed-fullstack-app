"use client";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import EditPostModal from "./EditPostModal";
import WhoLikedModal from "./WhoLikedModal";
import Comments from "./Comments";
import { useDeletePostMutation, useLikePostMutation } from "@/lib/features/postsApi/postApi";
import { useGetUserQuery } from "@/lib/features/api/apiSlice";

const PostCard = ({ postData , onPostDeleted }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isWhoLikedModalOpen, setIsWhoLikedModalOpen] = useState(false);
  const [likePost, { isLoading: isLiking }] = useLikePostMutation();
  const [localIsLiked, setLocalIsLiked] = useState(postData?.is_liked || false);
  const [localLikesCount, setLocalLikesCount] = useState(postData?.likes_count || 0);
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const { data: currentUser } = useGetUserQuery();

  const {
    id,
    author: authorObj = {},
    content = "",
    image: postImage = "/images/timeline_img.png",
    visibility = "public",
    created_at,
    likes_count = 0,
    is_liked = false,
    comments_count = 0,
  } = postData || {};

  // Check if current user is the post owner
  const isPostOwner = currentUser && postData?.author?.id === currentUser.id;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteClick = () => {
    setDeleteConfirmOpen(true);
    setIsDropdownOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deletePost(postData.id).unwrap();
      setDeleteConfirmOpen(false);
      onPostDeleted?.(postData.id);
    } catch (err) {
      console.error("Failed to delete post:", err);
      alert("Failed to delete post. Please try again.");
      setDeleteConfirmOpen(false);
    }
  };

  const handleLike = async () => {
    try {
      setLocalIsLiked(!localIsLiked);
      setLocalLikesCount(localIsLiked ? localLikesCount - 1 : localLikesCount + 1);
      
      await likePost(postData.id).unwrap();
    } catch (err) {
      console.error("Failed to like/unlike post:", err);
      // Revert on error
      setLocalIsLiked(localIsLiked);
      setLocalLikesCount(localLikesCount);
      alert("Failed to like/unlike post. Please try again.");
    }
  };

  const author = authorObj
    ? `${authorObj.first_name || ""} ${authorObj.last_name || ""}`.trim() || authorObj.username
    : "Unknown Author";

  const formatTimeAgo = (iso) => {
    if (!iso) return "just now";
    const then = new Date(iso).getTime();
    const diff = Date.now() - then;
    const sec = Math.floor(diff / 1000);
    if (sec < 60) return `${sec}s`;
    const min = Math.floor(sec / 60);
    if (min < 60) return `${min}m`;
    const hr = Math.floor(min / 60);
    if (hr < 24) return `${hr}h`;
    const days = Math.floor(hr / 24);
    return `${days}d`;
  };

  const title = content ? content.split("\n")[0].slice(0, 120) : "";
  const [timeAgo, setTimeAgo] = React.useState("just now");
  
  useEffect(() => {
    const t = formatTimeAgo(created_at);
    setTimeAgo(t);
  }, [created_at]);

  const totalReactions = likes_count ?? 0;
  const comments = comments_count ?? 0;
  const shares = postData?.shares ?? 0;

  return (
    <div className="_feed_inner_timeline_post_area _b_radious6 _padd_b24 _padd_t24 _mar_b16">
      <div className="_feed_inner_timeline_content _padd_r24 _padd_l24">
        <div className="_feed_inner_timeline_post_top">
          <div className="_feed_inner_timeline_post_box">
            <div className="_feed_inner_timeline_post_box_image">
              <img
                src="/images/chat4_img.png"
                alt={author}
                className="_post_img"
              />
            </div>
            <div className="_feed_inner_timeline_post_box_txt">
              <h4 className="_feed_inner_timeline_post_box_title">{author}</h4>
              <p className="_feed_inner_timeline_post_box_para">
                {timeAgo} .<span>{visibility ?? ""}</span>
              </p>
            </div>
          </div>
          <div
            className="_feed_inner_timeline_post_box_dropdown"
            style={{ position: "relative" }}
          >
            <div className="_feed_timeline_post_dropdown">
              <button
                onClick={toggleDropdown}
                className="_feed_timeline_post_dropdown_link"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="4"
                  height="17"
                  fill="none"
                  viewBox="0 0 4 17"
                >
                  <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
                  <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
                </svg>
              </button>
            </div>
            {/* dropdown Menu - Conditional Rendering based on state */}
            {isDropdownOpen && (
              <div
                id="_timeline_drop"
                className="_feed_timeline_dropdown _timeline_dropdown show"
              >
                <ul className="_feed_timeline_dropdown_list">
                  {/* Item 1: Save Post */}
                  <li className="_feed_timeline_dropdown_item">
                    <a href="#0" className="_feed_timeline_dropdown_link">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="#1890FF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"
                          ></path>
                        </svg>
                      </span>
                      Save Post
                    </a>
                  </li>

                  {/* Item 2: Turn On Notification */}
                  <li className="_feed_timeline_dropdown_item">
                    <a href="#0" className="_feed_timeline_dropdown_link">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="22"
                          fill="none"
                          viewBox="0 0 20 22"
                        >
                          <path
                            fill="#377DFF"
                            fillRule="evenodd"
                            d="M7.547 19.55c.533.59 1.218.915 1.93.915.714 0 1.403-.324 1.938-.916a.777.777 0 011.09-.056c.318.284.344.77.058 1.084-.832.917-1.927 1.423-3.086 1.423h-.002c-1.155-.001-2.248-.506-3.077-1.424a.762.762 0 01.057-1.083.774.774 0 011.092.057zM9.527 0c4.58 0 7.657 3.543 7.657 6.85 0 1.702.436 2.424.899 3.19.457.754.976 1.612.976 3.233-.36 4.14-4.713 4.478-9.531 4.478-4.818 0-9.172-.337-9.528-4.413-.003-1.686.515-2.544.973-3.299l.161-.27c.398-.679.737-1.417.737-2.918C1.871 3.543 4.948 0 9.528 0zm0 1.535c-3.6 0-6.11 2.802-6.11 5.316 0 2.127-.595 3.11-1.12 3.978-.422.697-.755 1.247-.755 2.444.173 1.93 1.455 2.944 7.986 2.944 6.494 0 7.817-1.06 7.988-3.01-.003-1.13-.336-1.681-.757-2.378-.526-.868-1.12-1.851-1.12-3.978 0-2.514-2.51-5.316-6.111-5.316z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      Turn On Notification
                    </a>
                  </li>

                  {/* Item 3: Hide */}
                  <li className="_feed_timeline_dropdown_item">
                    <a href="#0" className="_feed_timeline_dropdown_link">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="#1890FF"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.2"
                            d="M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5"
                          ></path>
                        </svg>
                      </span>
                      Hide
                    </a>
                  </li>

                  {/* Item 4: Edit Post - Only show if user owns the post */}
                  {isPostOwner && (
                    <li className="_feed_timeline_dropdown_item">
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditModalOpen(true);
                          setIsDropdownOpen(false);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          width: "100%",
                          textAlign: "left",
                          cursor: "pointer",
                          padding: 0,
                        }}
                        className="_feed_timeline_dropdown_link"
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="#1890FF"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.2"
                              d="M8.25 3H3a1.5 1.5 0 00-1.5 1.5V15A1.5 1.5 0 003 16.5h10.5A1.5 1.5 0 0015 15V9.75"
                            ></path>
                            <path
                              stroke="#1890FF"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.2"
                              d="M13.875 1.875a1.591 1.591 0 112.25 2.25L9 11.25 6 12l.75-3 7.125-7.125z"
                            ></path>
                          </svg>
                        </span>
                        Edit Post
                      </button>
                    </li>
                  )}

                  {/* Item 5: Delete Post - Only show if user owns the post */}
                  {isPostOwner && (
                    <li className="_feed_timeline_dropdown_item">
                      <button
                        type="button"
                        onClick={handleDeleteClick}
                        style={{
                          background: "none",
                          border: "none",
                          width: "100%",
                          textAlign: "left",
                          cursor: "pointer",
                          padding: 0,
                        }}
                        className="_feed_timeline_dropdown_link"
                      >
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="#1890FF"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.2"
                              d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5zM7.5 8.25v4.5M10.5 8.25v4.5"
                            ></path>
                          </svg>
                        </span>
                        Delete Post
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <h4 className="_feed_inner_timeline_post_title">{title}</h4>
        <div className="_feed_inner_timeline_image">
          <img src={postImage} alt={title} className="_time_img" />
        </div>
      </div>

      {/* Stats Section */}
      <div className="_feed_inner_timeline_total_reacts _padd_r24 _padd_l24 _mar_b26">
        <div onClick={() => localLikesCount > 0 && setIsWhoLikedModalOpen(true)} className="_feed_inner_timeline_total_reacts_image">
          {/* Show reaction images based on like count */}
          {localLikesCount >= 1 && (
            <img
              src="/images/react_img1.png"
              alt="Image"
              className="_react_img1"
            />
          )}
          {localLikesCount >= 2 && (
            <img
              src="/images/react_img2.png"
              alt="Image"
              className="_react_img"
            />
          )}
          {localLikesCount >= 3 && (
            <img
              src="/images/react_img3.png"
              alt="Image"
              className="_react_img _rect_img_mbl_none"
            />
          )}
          
          {/* Show like count */}
          {localLikesCount > 0 && (
            <button 
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                marginLeft: localLikesCount >= 1 ? "8px" : "0",
              }}
            >
              <p className="_feed_inner_timeline_total_reacts_para">
                {localLikesCount > 5 ? `${localLikesCount}+` : localLikesCount}
              </p>
            </button>
          )}
        </div>
        <div className="_feed_inner_timeline_total_reacts_txt">
          <p className="_feed_inner_timeline_total_reacts_para1">
            <a href="#0">
              <span>{comments_count}</span> Comment
            </a>
          </p>
          <p className="_feed_inner_timeline_total_reacts_para2">
            {/* <span>{stats.shares}</span> Share */}
          </p>
        </div>
      </div>

      {/* Like Action Buttons */}
      <div className="_feed_inner_timeline_reaction">
        <button 
          className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${localIsLiked ? '_feed_reaction_active' : ''}`}
          onClick={handleLike}
          disabled={isLiking}
          style={{
            opacity: isLiking ? 0.6 : 1,
            cursor: isLiking ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                fill="none"
                viewBox="0 0 19 19"
              >
                <path
                  fill={localIsLiked ? "#FFCC4D" : "#efcb5fff"}
                  d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
                />
                <path
                  fill="#664500"
                  d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"
                />
                <path
                  fill="#fff"
                  d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z"
                />
                <path
                  fill="#664500"
                  d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"
                />
              </svg>
              {localIsLiked ? 'Unlike' : 'Like'}
            </span>
          </span>
        </button>
        <button className="_feed_inner_timeline_reaction_comment _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg
                className="_reaction_svg"
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="none"
                viewBox="0 0 21 21"
              >
                <path
                  stroke="#000"
                  d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"
                />
                <path
                  stroke="#000"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.938 9.313h7.125M10.5 14.063h3.563"
                />
              </svg>
              Comment
            </span>
          </span>
        </button>

        {/* <button className="_feed_inner_timeline_reaction_share _feed_reaction">
          <span className="_feed_inner_timeline_reaction_link">
            <span>
              <svg
                className="_reaction_svg"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="21"
                fill="none"
                viewBox="0 0 24 21"
              >
                <path
                  stroke="#000"
                  strokeLinejoin="round"
                  d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"
                />
              </svg>
              Share
            </span>
          </span>
        </button> */}

      </div>

      {/* Comments Component */}
      <Comments postId={postData?.id} postAuthorId={authorObj?.id} />
    
    {/* delete confirmation modal */}
    {deleteConfirmOpen && (
      <div
        className="modal_overlay"
        onClick={() => setDeleteConfirmOpen(false)}
      >
        <div
          className="modal_box" 
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="modal_title">
            Delete Post?
          </h3>
          <p className="modal_text">
            Are you sure you want to delete this post? This action cannot be undone.
          </p>
          <div className="modal_actions">
            <button
              type="button"
              onClick={() => setDeleteConfirmOpen(false)}
              disabled={isDeleting}
              className="modal_btn_cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="modal_btn_delete"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    )}
    
    {/* edit post modal */}
    <EditPostModal
      postData={postData}
      isOpen={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      onSuccess={() => {
        // update the post list
      }}
    />

    {/* who liked modal */}
    <WhoLikedModal
      postId={postData?.id}
      isOpen={isWhoLikedModalOpen}
      onClose={() => setIsWhoLikedModalOpen(false)}
      likeCount={localLikesCount}
    />
    </div>
  );
};

export default PostCard;
