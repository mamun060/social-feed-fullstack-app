"use client";
import { useUpdatePostMutation } from "@/lib/features/api/apiSlice";
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

      await updatePost({ id: postData.id, ...Object.fromEntries(updateData) }).unwrap();

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
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "24px",
          maxWidth: "500px",
          width: "90%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ margin: 0, fontSize: "20px", fontWeight: "600" }}>Edit Post</h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              color: "#666",
            }}
          >
            ✕
          </button>
        </div>

        {successMessage && (
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "16px",
              border: "1px solid #c3e6cb",
            }}
          >
            {successMessage}
          </div>
        )}

        {isError && error && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "16px",
              border: "1px solid #f5c6cb",
            }}
          >
            Error: {error?.data?.message || "Failed to update post"}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "16px" }}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px",
                fontFamily: "inherit",
                resize: "vertical",
                minHeight: "120px",
              }}
              placeholder="Write something..."
            />
          </div>

          {/* Visibility Dropdown */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "500", color: "#333" }}>
              Post Visibility
            </label>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
                backgroundColor: "white",
              }}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div
              style={{
                marginBottom: "16px",
                position: "relative",
                display: "inline-block",
              }}
            >
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  borderRadius: "6px",
                }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
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
            style={{ display: "none" }}
          />

          {/* Image Upload Button */}
          <div style={{ marginBottom: "16px" }}>
            <button
              type="button"
              onClick={handlePhotoClick}
              style={{
                background: "none",
                border: "1px solid #ddd",
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: "6px",
                fontSize: "14px",
                color: "#666",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                <path fill="#666" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75-3.54c-.3-.38-.77-.62-1.31-.62-.54 0-1.01.24-1.31.62L6.5 12.7c-.29.38-.29.92 0 1.3.29.38.77.62 1.31.62.54 0 1.02-.24 1.31-.62l1.25-1.6 2.79 3.58c.29.38.77.62 1.31.62.54 0 1.01-.24 1.31-.62.29-.38.29-.92 0-1.3l-4.12-5.3z"/>
              </svg>
              Change Image
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: "10px 20px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                backgroundColor: "white",
                color: "#333",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                padding: "10px 20px",
                border: "none",
                borderRadius: "6px",
                backgroundColor: "#3b82f6",
                color: "white",
                cursor: isLoading ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "500",
                opacity: isLoading ? 0.6 : 1,
              }}
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
