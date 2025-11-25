import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_APP_API_URL,
  prepareHeaders: (headers) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
    }
    return headers;
  },
});

// Handles Automatic Refresh Logic
// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;

//     if (refreshToken) {
//       const refreshResult = await baseQuery(
//         {
//           url: 'auth/refresh/',
//           method: 'POST',
//           body: { refresh: refreshToken },
//         },
//         api,
//         extraOptions
//       );

//       if (refreshResult.data) {
//         localStorage.setItem('access_token', refreshResult.data.access);        
//         result = await baseQuery(args, api, extraOptions);
//       } else {
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         window.location.href = '/';
//       }
//     } else {
//       localStorage.removeItem('access_token');
//       window.location.href = '/';
//     }
//   }
//   return result;
// };

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const requestUrl = typeof args === 'string' ? args : args.url;
  
  if (requestUrl.includes('auth/login/')) {
    return result; 
  }

  if (result.error && result.error.status === 401) {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null;

    if (refreshToken) {
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
        localStorage.setItem('access_token', refreshResult.data.access);        
        result = await baseQuery(args, api, extraOptions);
      } else {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
      }
    } else {
      localStorage.removeItem('access_token');
      window.location.href = '/';
    }
  }
  return result;
};

// Define Endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Post'],
  endpoints: (builder) => ({
    
    // Auth
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register/',
        method: 'POST',
        body: userData,
      }),
    }),

    // users
    getUser: builder.query({
      query: () => '/auth/me/',
      providesTags: ['User'],
    }),

    // Feed
    getPosts: builder.query({
      query: () => '/posts/',
      providesTags: ['Post'],
    }),

    getMyPosts: builder.query({
      query: () => '/posts/my_posts/',
      providesTags: ['Post'],
    }),

    createPost: builder.mutation({
      query: (formData) => ({
        url: '/posts/',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Post'],
    }),

    updatePost: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/posts/${id}/`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: ['Post'],
    }),

    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),

    // Like
    likePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}/like/`,
        method: 'POST',
      }),
      invalidatesTags: ['Post'],
    }),

    likeList: builder.query({
      query: (id) => `/posts/${id}/likes_list/`,
      providesTags: ['Post'],
    }),

    // post search
    searchPosts: builder.query({
      query: (searchTerm) => `/posts/?search=${searchTerm}`,
      providesTags: ['Post'],
    }),
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useGetUserQuery,
  useGetPostsQuery, 
  useGetMyPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLikePostMutation,
  useLikeListQuery,
  useSearchPostsQuery,
} = apiSlice;

