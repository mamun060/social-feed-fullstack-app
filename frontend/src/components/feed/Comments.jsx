"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetUserQuery } from "@/lib/features/api/apiSlice";
import { useCommentLikeListQuery, useCommentLikeUnlikeMutation, useCreateCommentMutation, useCreateCommentReplyMutation, useDeleteCommentMutation, useGetAllCommentRepliesQuery, useGetCommentsByPostQuery, useUpdateCommentMutation } from "@/lib/features/commentApi/commentApi";

const Comments = ({ postId, postAuthorId }) => {
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [whoLikedCommentId, setWhoLikedCommentId] = useState(null);
  const [localCommentLikes, setLocalCommentLikes] = useState({});
  const [showReplyForm, setShowReplyForm] = useState({});
  const [replyText, setReplyText] = useState({});
  const [expandedReplies, setExpandedReplies] = useState({});

  const { data: comments = [], isLoading: isLoadingComments } = useGetCommentsByPostQuery(postId);
  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [updateComment, { isLoading: isUpdating }] = useUpdateCommentMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();
  const [commentLikeUnlike, { isLoading: isCommentLiking }] = useCommentLikeUnlikeMutation();
  
  const { data: commentLikesList } = useCommentLikeListQuery(
    whoLikedCommentId,
    {
      skip: !whoLikedCommentId,
    }
  );
  const { data: currentUser } = useGetUserQuery();

  // reply hooks
  const [createCommentReply, { isLoading: isReplyCreating }] = useCreateCommentReplyMutation();
  const { data: replies = {}, isLoading: isLoadingReplies } = useGetAllCommentRepliesQuery(
      Object.keys(expandedReplies).find((key) => expandedReplies[key]),
      {
        skip: !Object.keys(expandedReplies).find((key) => expandedReplies[key]),
      }
    );

  // ensure comments is always an array
  const commentsList = Array.isArray(comments) ? comments : comments?.results || [];

  // initialize likes from comments data
  React.useEffect(() => {
    const likesMap = {};
    commentsList.forEach((comment) => {
      if (!localCommentLikes[comment.id]) {
        likesMap[comment.id] = {
          isLiked: comment.is_liked || false,
          likesCount: comment.likes_count || 0,
        };
      }
    });
    if (Object.keys(likesMap).length > 0) {
      setLocalCommentLikes((prev) => ({ ...prev, ...likesMap }));
    }
  }, [commentsList]);

  // utility to format time ago
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

  // create comment handler
  const handleCreateComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    try {
      await createComment({
        post: postId,
        text: newCommentText,
      }).unwrap();
      setNewCommentText("");
      setShowCommentForm(false);
    } catch (err) {
      console.error("Failed to create comment:", err);
      alert("Failed to create comment. Please try again.");
    }
  };

  const handleUpdateComment = async () => {
    if (!editingCommentText || !editingCommentText.trim()) return;

    try {
      await updateComment({
        id: editingCommentId,
        data: { text: editingCommentText },
      }).unwrap();
      setEditingCommentId(null);
      setEditingCommentText("");
    } catch (err) {
      console.error("Failed to update comment:", err);
      alert("Failed to update comment. Please try again.");
    }
  };

  const handleDeleteComment = async () => {
    try {
      await deleteComment(deleteConfirmId).unwrap();
      setDeleteConfirmId(null);
    } catch (err) {
      console.error("Failed to delete comment:", err);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const isCommentOwner = (commentAuthorId) => {
    return currentUser && commentAuthorId === currentUser.id;
  };

  const handleCommentLike = async (commentId) => {
    try {
      const current = localCommentLikes[commentId] || {
        isLiked: false,
        likesCount: 0,
      };
      setLocalCommentLikes((prev) => ({
        ...prev,
        [commentId]: {
          isLiked: !current.isLiked,
          likesCount: current.isLiked
            ? current.likesCount - 1
            : current.likesCount + 1,
        },
      }));

      await commentLikeUnlike(commentId).unwrap();
    } catch (err) {
      console.error("Failed to like/unlike comment:", err);
      setLocalCommentLikes((prev) => ({
        ...prev,
        [commentId]: {
          isLiked: !localCommentLikes[commentId].isLiked,
          likesCount: localCommentLikes[commentId].likesCount,
        },
      }));
      alert("Failed to like/unlike comment. Please try again.");
    }
  };

  const handleCreateReply = async (commentId) => {
    const replyContent = replyText[commentId]?.trim();
    if (!replyContent) return;

    try {
      await createCommentReply({
        id: commentId,
        replyData: { text: replyContent },
      }).unwrap();
      setReplyText((prev) => ({ ...prev, [commentId]: "" }));
      setShowReplyForm((prev) => ({ ...prev, [commentId]: false }));
    } catch (err) {
      console.error("Failed to create reply:", err);
      alert("Failed to create reply. Please try again.");
    }
  };

  const toggleReplies = (commentId) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <div className="_comments_section">

      {/* create comment form */}
      <div className="_create_comment_wrapper">
        <button
          type="button"
          onClick={() => setShowCommentForm(!showCommentForm)}
          className="_create_comment_toggle"
        >
          {showCommentForm ? "Hide" : "Add Comment"}
        </button>

        {showCommentForm && (
          <form onSubmit={handleCreateComment} className="_create_comment_form">
            <div className="_create_comment_content">
              <div className="_create_comment_image">
                <Image
                  src="/images/comment_img.png"
                  alt="Your avatar"
                  width={32}
                  height={32}
                  className="_comment_avatar"
                />
              </div>
              <div className="_create_comment_input_wrapper">
                <textarea
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="_create_comment_textarea"
                  disabled={isCreating}
                />
              </div>
            </div>
            <div className="_create_comment_actions">
              <button
                type="button"
                onClick={() => {
                  setShowCommentForm(false);
                  setNewCommentText("");
                }}
                disabled={isCreating}
                className="_create_comment_btn_cancel"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreating || !newCommentText.trim()}
                className="_create_comment_btn_submit"
              >
                {isCreating ? "Posting..." : "Post"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* comments list */}
      <div className="_comments_list">
        {isLoadingComments ? (
          <div className="_comments_loading">Loading comments...</div>
        ) : commentsList.length === 0 ? (
          <div className="_comments_empty">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          <div className="_comments_container">
            {commentsList.map((comment) => (
              <div key={comment.id} className="_comment_item">
                {/* editing mode */}
                {editingCommentId === comment.id ? (
                  <div className="_comment_edit_form">
                    <textarea
                      value={editingCommentText}
                      onChange={(e) => setEditingCommentText(e.target.value)}
                      className="_comment_edit_textarea"
                      disabled={isUpdating}
                    />
                    <div className="_comment_edit_actions">
                      <button
                        type="button"
                        onClick={() => setEditingCommentId(null)}
                        disabled={isUpdating}
                        className="_comment_edit_btn_cancel"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleUpdateComment}
                        disabled={
                          isUpdating ||
                          !editingCommentText ||
                          !editingCommentText.trim()
                        }
                        className="_comment_edit_btn_save"
                      >
                        {isUpdating ? "Saving..." : "Save"}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* comment display mode */}
                    <div className="_comment_header">
                      <div className="_comment_user_info">
                        <div className="_comment_avatar">
                          <Image
                            src="/images/comment_img.png"
                            alt={comment.author?.username || "User"}
                            width={32}
                            height={32}
                            className="_comment_avatar_img"
                          />
                        </div>
                        <div className="_comment_user_details">
                          <h5
                            className="_comment_user_name"
                            style={{ paddingTop: "10px" }}
                          >
                            {comment.author?.first_name ||
                            comment.author?.last_name
                              ? `${comment.author?.first_name || ""} ${
                                  comment.author?.last_name || ""
                                }`.trim()
                              : comment.author?.username}
                          </h5>
                          {/* <p className="_comment_username">
                            @{comment.author?.username}
                          </p> */}
                        </div>
                      </div>
                      {isCommentOwner(comment.author?.id) && (
                        <div className="_comment_actions">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingCommentId(comment?.id);
                              setEditingCommentText(comment?.text);
                            }}
                            className="_comment_action_btn _comment_edit_btn"
                            title="Edit comment"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="#1890FF"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.2"
                                d="M6.417 2H2a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1V7.583"
                              />
                              <path
                                stroke="#1890FF"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.2"
                                d="M11.25 1.583a1.167 1.167 0 111.65 1.65L7 8.583l-2 .5.5-2 5.75-5.917z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(comment.id)}
                            className="_comment_action_btn _comment_delete_btn"
                            title="Delete comment"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              fill="none"
                              viewBox="0 0 14 14"
                            >
                              <path
                                stroke="#FF4D4F"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.2"
                                d="M1.5 3.5h11m-3.5-1V2a1 1 0 00-1-1h-2a1 1 0 00-1 1v.5m1.5 6v3m3-3v3"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* comment content */}
                    <div className="_comment_content">
                      <p className="_comment_text">{comment?.text}</p>
                    </div>

                    {/* comment metadata */}
                    <div className="_comment_metadata">
                      <span className="_comment_time">
                        {formatTimeAgo(comment.created_at)}
                      </span>
                      {comment.updated_at &&
                        comment.created_at !== comment.updated_at && (
                          <span className="_comment_edited">(edited)</span>
                        )}
                    </div>

                    {/* comment actions - like button */}
                    <div className="_comment_actions_section">
                      <button
                        type="button"
                        onClick={() => handleCommentLike(comment.id)}
                        disabled={isCommentLiking}
                        className="_comment_like_btn"
                        style={{
                          opacity: isCommentLiking ? 0.6 : 1,
                          cursor: isCommentLiking ? "not-allowed" : "pointer",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            fill: localCommentLikes[comment.id]?.isLiked
                              ? "#FF4D4F"
                              : "none",
                            color: localCommentLikes[comment.id]?.isLiked
                              ? "#FF4D4F"
                              : "#999",
                          }}
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {localCommentLikes[comment.id]?.likesCount > 0 && (
                          <span className="_comment_like_count">
                            {localCommentLikes[comment.id]?.likesCount}
                          </span>
                        )}
                      </button>
                      {localCommentLikes[comment.id]?.likesCount > 0 && (
                        <button
                          type="button"
                          onClick={() => setWhoLikedCommentId(comment.id)}
                          className="_comment_who_liked_btn"
                        >
                          {localCommentLikes[comment.id]?.likesCount} liked
                        </button>
                      )}
                    </div>

                    {/* reply section */}
                    <div className="_comment_reply_section">
                      <button
                        type="button"
                        onClick={() => toggleReplies(comment.id)}
                        className="_comment_reply_toggle_btn"
                      >
                        {expandedReplies[comment.id] ? "Hide" : "Show"} replies
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setShowReplyForm((prev) => ({
                            ...prev,
                            [comment.id]: !prev[comment.id],
                          }))
                        }
                        className="_comment_reply_btn"
                      >
                        Reply
                      </button>
                    </div>

                    {/* reply form */}
                    {showReplyForm[comment.id] && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleCreateReply(comment.id);
                        }}
                        className="_create_reply_form"
                      >
                        <div className="_create_reply_content">
                          <div className="_create_reply_image">
                            <Image
                              src="/images/comment_img.png"
                              alt="Your avatar"
                              width={28}
                              height={28}
                              className="_reply_avatar"
                            />
                          </div>
                          <div className="_create_reply_input_wrapper">
                            <textarea
                              value={replyText[comment.id] || ""}
                              onChange={(e) =>
                                setReplyText((prev) => ({
                                  ...prev,
                                  [comment.id]: e.target.value,
                                }))
                              }
                              placeholder="Write a reply..."
                              className="_create_reply_textarea"
                              disabled={isReplyCreating}
                            />
                          </div>
                        </div>
                        <div className="_create_reply_actions">
                          <button
                            type="button"
                            onClick={() => {
                              setShowReplyForm((prev) => ({
                                ...prev,
                                [comment.id]: false,
                              }));
                              setReplyText((prev) => ({
                                ...prev,
                                [comment.id]: "",
                              }));
                            }}
                            disabled={isReplyCreating}
                            className="_create_reply_btn_cancel"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={
                              isReplyCreating || !replyText[comment.id]?.trim()
                            }
                            className="_create_reply_btn_submit"
                          >
                            {isReplyCreating ? "Posting..." : "Reply"}
                          </button>
                        </div>
                      </form>
                    )}

                    {/* replies list */}
                    {expandedReplies[comment.id] && (
                      <div className="_replies_container">
                        {isLoadingReplies ? (
                          <div className="_replies_loading">
                            <p>Loading replies...</p>
                          </div>
                        ) : Array.isArray(replies) && replies.length > 0 ? (
                          <div className="_replies_list">
                            {replies.map((reply) => (
                              <div key={reply.id} className="_reply_item">
                                <div className="_reply_avatar_container">
                                  <Image
                                    src="/images/comment_img.png"
                                    alt={reply.author?.username || "User"}
                                    width={28}
                                    height={28}
                                    className="_reply_avatar_img"
                                  />
                                </div>
                                <div className="_reply_content_wrapper">
                                  <div className="_reply_header">
                                    <h6 className="_reply_author_name">
                                      {reply.author?.first_name ||
                                      reply.author?.last_name
                                        ? `${reply.author?.first_name || ""} ${
                                            reply.author?.last_name || ""
                                          }`.trim()
                                        : reply.author?.username}
                                    </h6>
                                    <span className="_reply_time">
                                      {formatTimeAgo(reply.created_at)}
                                    </span>
                                  </div>
                                  <p className="_reply_text">{reply?.text}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="_replies_empty">
                            <p>No replies yet</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* who liked comment modal */}
      {whoLikedCommentId && (
        <div
          className="_who_liked_comment_modal_overlay"
          onClick={() => setWhoLikedCommentId(null)}
        >
          <div
            className="_who_liked_comment_modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="_who_liked_comment_header">
              <h3 className="_who_liked_comment_title">Likes</h3>
              <button
                type="button"
                onClick={() => setWhoLikedCommentId(null)}
                className="_who_liked_comment_close_btn"
              >
                ✕
              </button>
            </div>

            <div className="_who_liked_comment_content">
              {!commentLikesList ? (
                <div className="_who_liked_comment_loading">
                  <p>Loading likes...</p>
                </div>
              ) : commentLikesList?.length === 0 ? (
                <div className="_who_liked_comment_empty">
                  <p>No likes yet</p>
                </div>
              ) : (
                <div className="_who_liked_comment_list">
                  {commentLikesList.map((liker) => (
                    <div key={liker.id} className="_who_liked_comment_item">
                      <div className="_who_liked_comment_avatar">
                        <Image
                          src="/images/comment_img.png"
                          alt={liker.username}
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="_who_liked_comment_user_info">
                        <h5 className="_who_liked_comment_name">
                          {liker.first_name || liker.last_name
                            ? `${liker.first_name || ""} ${
                                liker.last_name || ""
                              }`.trim()
                            : liker.username}
                        </h5>
                        <p className="_who_liked_comment_username">
                          @{liker.username}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div
          className="_comment_delete_modal_overlay"
          onClick={() => setDeleteConfirmId(null)}
        >
          <div
            className="_comment_delete_modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="_comment_delete_modal_title">Delete Comment?</h3>
            <p className="_comment_delete_modal_text">
              Are you sure you want to delete this comment? This action cannot
              be undone.
            </p>
            <div className="_comment_delete_modal_actions">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                disabled={isDeleting}
                className="_comment_delete_modal_btn_cancel"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteComment}
                disabled={isDeleting}
                className="_comment_delete_modal_btn_delete"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
