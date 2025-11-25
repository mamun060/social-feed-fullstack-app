"use client";
import { useUpdatePostMutation } from "@/lib/features/postsApi/postApi";
import React, { useState, useEffect } from "react";

const EditPostModal = ({ postData, isOpen, onClose, onSuccess }) => {
  const [updatePost, { isLoading, isError, error }] = useUpdatePostMutation();
  const [content, setContent] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = React.useRef(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (postData && isOpen) {
      setContent(postData.content || "");
      setVisibility(postData.visibility || "public");
      setImagePreview(postData.image || null);
      setSelectedFile(null);
    }
  }, [postData, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert("Please write something in your post");
      return;
    }

    try {
      const updateData = new FormData();
      updateData.append("content", content);
      updateData.append("visibility", visibility);
      if (selectedFile) {
        updateData.append("image", selectedFile);
      }
      await updatePost({ id: postData.id, formData: updateData }).unwrap();

      setSuccessMessage("Post updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        onSuccess?.();
        onClose();
      }, 1500);
    } catch (err) {
      console.error("Failed to update post:", err);
      alert("Failed to update post. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>Edit Post</h3>
          <button
            onClick={onClose}
            className="close-btn" 
          >
            ✕
          </button>
        </div>

        {successMessage && (
          <div
            className="alert-success"
          >
            {successMessage}
          </div>
        )}

        {isError && error && (
          <div
            className="alert-error"
          >
            Error: {error?.data?.message || "Failed to update post"}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <textarea
              className="input-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write something..."
            />
          </div>

          <div className="field">
            <label className="label">
              Post Visibility
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              className="input-select"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div
              className="image-preview"
            >
              <img
                src={imagePreview}
                alt="Preview"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="remove-img-btn"
              >
                ✕
              </button>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden-input"
          />

          {/* Image Upload Button */}
          <div className="field">
            <button
              type="button"
              onClick={handlePhotoClick}
              className="img-upload-btn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path fill="#666" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75-3.54c-.3-.38-.77-.62-1.31-.62-.54 0-1.01.24-1.31.62L6.5 12.7c-.29.38-.29.92 0 1.3.29.38.77.62 1.31.62.54 0 1.02-.24 1.31-.62l1.25-1.6 2.79 3.58c.29.38.77.62 1.31.62.54 0 1.01-.24 1.31-.62.29-.38.29-.92 0-1.3l-4.12-5.3z"/>
              </svg>
              Change Image
            </button>
          </div>

          {/* Action Buttons */}
          <div className="modal-actions">
            <button
              type="button"
              onClick={onClose}
              className="btn-cancel"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-update"
            >
              {isLoading ? "Updating..." : "Update Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
