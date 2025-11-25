import { apiSlice } from "../api/apiSlice";

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
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
      query: ({ id, formData }) => ({
        url: `/posts/${id}/`,
        method: 'PUT',
        body: formData,
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
    useGetPostsQuery, 
    useGetMyPostsQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useLikePostMutation,
    useLikeListQuery,
    useSearchPostsQuery,
} = postApi;