"use client";
import React from "react";
import { useLikeListQuery } from "@/lib/features/api/apiSlice";

const WhoLikedModal = ({ postId, isOpen, onClose, likeCount }) => {
  const { data, isLoading, isError } = useLikeListQuery(postId, {
    skip: !isOpen || !postId,
  });

  const likes = Array.isArray(data) ? data : data?.results || [];
  if (!isOpen) return null;

  return (
    <div className="_who_liked_overlay" onClick={onClose}>
      <div className="_who_liked_modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="_who_liked_header">
          <h2 className="_who_liked_title">Who Liked This</h2>
          <button className="_who_liked_close_btn" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18 6L6 18M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="_who_liked_content">
          {isLoading ? (
            <div className="_who_liked_loading">
              <p>Loading...</p>
            </div>
          ) : isError ? (
            <div className="_who_liked_error">
              <p>Failed to load likes</p>
            </div>
          ) : likes.length > 0 ? (
            <div className="_who_liked_list">
              {data?.map((like) => (
                <div key={like.user?.id} className="_who_liked_item">
                  <div className="_who_liked_user_image">
                    <img
                      src={like.user?.profile_picture || "/images/chat4_img.png"}
                      alt={like.user?.username || "User"}
                      className="_who_liked_avatar"
                    />
                  </div>
                  <div className="_who_liked_user_info">
                    <h4 className="_who_liked_user_name">
                      {like.user?.first_name && like.user?.last_name
                        ? `${like.user.first_name} ${like.user.last_name}`
                        : like.user?.username || "Unknown User"}
                    </h4>
                    {/* <p className="_who_liked_user_handle">@{like.user?.username}</p> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="_who_liked_empty_state">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="none"
                viewBox="0 0 48 48"
              >
                <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="2" />
                <path
                  fill="currentColor"
                  d="M24 12c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12z"
                />
              </svg>
              <p>No likes yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhoLikedModal;
