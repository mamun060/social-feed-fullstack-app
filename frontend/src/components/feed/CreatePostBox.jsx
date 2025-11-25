"use client";
import { useCreatePostMutation } from '@/lib/features/api/apiSlice';
import React from 'react';

const CreatePostBox = () => {
  const [createPost, { isLoading, isError, error }] = useCreatePostMutation();
  const [content, setContent] = React.useState('');
  const [imagePreview, setImagePreview] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const [successMessage, setSuccessMessage] = React.useState('');

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
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) {
      alert('Please write something before posting');
      return;
    }

    try {
      const postData = new FormData();
      postData.append('content', content);
      postData.append('visibility', 'public');
      if (selectedFile) {
        postData.append('image', selectedFile);
      }

      await createPost(postData).unwrap();
      
      // Reset form
      setContent('');
      setImagePreview(null);
      setSelectedFile(null);
      setSuccessMessage('Post created successfully!');
      
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err) {
      console.error('Failed to create post:', err);
    }
  };

  return (
    <div className="_feed_inner_text_area _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
      {successMessage && (
        <div className="_feed_success_box">
          {successMessage}
        </div>
      )}
      
      {isError && error && (
        <div className="_feed_error_box">
          Error: {error?.data?.message || 'Failed to create post'}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="_feed_inner_text_area_box">
          <div className="_feed_inner_text_area_box_image">
            <img src="/images/txt_img.png" alt="Image" className="_txt_img" />
          </div>
          <div className="form-floating _feed_inner_text_area_box_form">
            <textarea 
              className="form-control _textarea" 
              placeholder="Leave a comment here" 
              id="floatingTextarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
            ></textarea>
            <label className="_feed_textarea_label" htmlFor="floatingTextarea">
              Write something ...
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="none" viewBox="0 0 23 24">
                <path fill="#666" d="M19.504 19.209c.332 0 .601.289.601.646 0 .326-.226.596-.52.64l-.081.005h-6.276c-.332 0-.602-.289-.602-.645 0-.327.227-.597.52-.64l.082-.006h6.276zM13.4 4.417c1.139-1.223 2.986-1.223 4.125 0l1.182 1.268c1.14 1.223 1.14 3.205 0 4.427L9.82 19.649a2.619 2.619 0 01-1.916.85h-3.64c-.337 0-.61-.298-.6-.66l.09-3.941a3.019 3.019 0 01.794-1.982l8.852-9.5zm-.688 2.562l-7.313 7.85a1.68 1.68 0 00-.441 1.101l-.077 3.278h3.023c.356 0 .698-.133.968-.376l.098-.096 7.35-7.887-3.608-3.87zm3.962-1.65a1.633 1.633 0 00-2.423 0l-.688.737 3.606 3.87.688-.737c.631-.678.666-1.755.105-2.477l-.105-.124-1.183-1.268z" />
              </svg>
            </label>
          </div>
        </div>

        {/* image preview */}
        {imagePreview && (
          <div className="_feed_image_preview_wrapper">
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="_feed_image_preview"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="_feed_remove_btn"
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
          style={{ display: 'none' }}
        />

        {/* bottom controls */}
        <div className="_feed_inner_text_area_bottom" style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button 
            type="button"
            onClick={handlePhotoClick}
            className="_feed_photo_btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
              <path fill="#666" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75-3.54c-.3-.38-.77-.62-1.31-.62-.54 0-1.01.24-1.31.62L6.5 12.7c-.29.38-.29.92 0 1.3.29.38.77.62 1.31.62.54 0 1.02-.24 1.31-.62l1.25-1.6 2.79 3.58c.29.38.77.62 1.31.62.54 0 1.01-.24 1.31-.62.29-.38.29-.92 0-1.3l-4.12-5.3z"/>
            </svg>
            Photo
          </button>
          <button 
            type="submit" 
            disabled={isLoading}
            className={`_feed_post_btn ${isLoading ? '_loading' : ''}`}
          >
            {isLoading ? 'Posting...' : 'Post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostBox;