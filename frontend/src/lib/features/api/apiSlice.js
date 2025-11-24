import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// 1. Base Query: Standard request handler
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000/api/v1/', // Your Django URL
  prepareHeaders: (headers) => {
    // Only access localStorage in the browser
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
    }
    return headers;
  },
});

// 2. Wrapper Query: Handles Automatic Refresh Logic
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If error is 401 (Unauthorized), try to refresh
  if (result.error && result.error.status === 401) {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;

    if (refreshToken) {
      // Call refresh endpoint manually
      const refreshResult = await baseQuery(
        {
          url: 'auth/refresh/',
          method: 'POST',
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Success! Store the new token
        localStorage.setItem('access_token', refreshResult.data.access);
        
        // Retry the original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed (Session expired completely)
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    } else {
      // No refresh token available
      localStorage.removeItem('access_token'); // Clean up potentially stale token
      window.location.href = '/login';
    }
  }
  return result;
};

// 3. Define Endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Post'], // Used for automatic cache invalidation
  endpoints: (builder) => ({
    
    // Auth
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register/',
        method: 'POST',
        body: userData,
      }),
    }),

    // Feed
    getPosts: builder.query({
      query: () => 'posts/',
      providesTags: ['Post'], // If 'Post' tag is invalidated, this refetches
    }),

    createPost: builder.mutation({
      query: (formData) => ({
        url: 'posts/',
        method: 'POST',
        body: formData, // FormData automatically handles Content-Type multipart/form-data
      }),
      invalidatesTags: ['Post'], // This triggers getPosts to run again automatically
    }),

    // Like
    likePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}/like/`,
        method: 'POST',
      }),
      invalidatesTags: ['Post'], // Refetch to update like count/status
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useGetPostsQuery, 
  useCreatePostMutation,
  useLikePostMutation
} = apiSlice;