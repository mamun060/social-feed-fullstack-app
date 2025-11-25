import { apiSlice } from "../api/apiSlice";

const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (commentData) => ({
        url: `/comments/`,
        method: 'POST',
        body: commentData,
      }),
      invalidatesTags: ['Post' , 'Comment'],
    }),

    getCommentsByPost: builder.query({
      query: (postId) => `/comments/?post_id=${postId}`,
      providesTags: ['Post', 'Comment'],
    }),

    updateComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/comments/${id}/`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Post', 'Comment'],
    }),

    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post', 'Comment'],
    }),

    commentLikeUnlike: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}/like/`,
        method: 'POST',
      }),
      invalidatesTags: ['Comment', 'Post'],
    }),

    commentLikeList: builder.query({
      query: (id) => `/comments/${id}/likes_list/`,
      providesTags: ['Comment', 'Post'],
    }),

    createCommentReply: builder.mutation({
      query: ({ id, replyData }) => ({
        url: `/comments/${id}/reply/`,
        method: 'POST',
        body: replyData,
      }),
      invalidatesTags: ['Comment' , 'Post'],
    }),

    getAllCommentReplies: builder.query({
      query: (id) => `/comments/${id}/replies/`,
      providesTags: ['Comment', 'Post'],
    }),

  }),
});


export const {
    useCreateCommentMutation,
    useGetCommentsByPostQuery,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useCommentLikeUnlikeMutation,
    useCommentLikeListQuery,
    useCreateCommentReplyMutation,
    useGetAllCommentRepliesQuery, 
} = commentApi;