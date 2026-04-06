import { apiSlice } from "../api/apiSlice";

const commentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (commentData) => ({
        url: `/comments/`,
        method: 'POST',
        body: commentData,
      }),
      async onQueryStarted(commentData, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const updatePost = (draft) => {
            if (draft.results) {
              const post = draft.results.find(p => p.id === commentData.post);
              if (post) {
                post.comments_count += 1;
              }
            } else if (draft.id === commentData.post) {
              draft.comments_count += 1;
            }
          };
          dispatch(apiSlice.util.updateQueryData('getPosts', undefined, updatePost));
          dispatch(apiSlice.util.updateQueryData('getMyPosts', undefined, updatePost));
        } catch (err) {
          // If failed, could decrement, but for simplicity, ignore
        }
      },
      invalidatesTags: ['Comment'],
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
      query: ({id}) => ({
        url: `/comments/${id}/`,
        method: 'DELETE',
      }),
      async onQueryStarted({id, postId}, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const updatePost = (draft) => {
            if (draft.results) {
              const post = draft.results.find(p => p.id === postId);
              if (post) {
                post.comments_count -= 1;
              }
            } else {
              const post = draft.find(p => p.id === postId);
              if (post) {
                post.comments_count -= 1;
              }
            }
          };
          dispatch(apiSlice.util.updateQueryData('getPosts', undefined, updatePost));
          dispatch(apiSlice.util.updateQueryData('getMyPosts', undefined, updatePost));
        } catch (err) {
          // If failed, could increment back, but ignore
        }
      },
      invalidatesTags: ['Comment'],
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