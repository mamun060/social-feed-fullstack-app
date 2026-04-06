import { apiSlice } from "../api/apiSlice";

const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getPosts: builder.query({
      query: (page = 1) => `/posts/?page=${page}`,
      
      // Keep the same cache key so pages merge together
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      
      // Merge the new page's data into the existing data
      merge: (currentCache, newItems) => {
        if (currentCache.results) {
          // PROPER FIX: Create a Set of existing IDs for fast checking
          const existingIds = new Set(currentCache.results.map((post) => post.id));
        
          // Filter out any new posts that are already in the cache
          const uniqueNewPosts = newItems.results.filter(
            (post) => !existingIds.has(post.id)
          );

          // Append only the strictly unique posts
          currentCache.results.push(...uniqueNewPosts);
          
          // Update pagination trackers
          currentCache.next = newItems.next;
          currentCache.previous = newItems.previous;
          currentCache.count = newItems.count;
        } else {
          return newItems;
        }
      },
      
      // Only refetch if the page number actually changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
      
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