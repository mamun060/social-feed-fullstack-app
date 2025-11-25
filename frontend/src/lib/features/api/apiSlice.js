import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { updateTag } from 'next/cache';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1',
  credentials: 'include',
  prepareHeaders: (headers) => {
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const requestUrl = typeof args === 'string' ? args : args.url;
  if (requestUrl.includes('auth/login')) {
    return result;
  }

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: 'auth/refresh/', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      result = await baseQuery(args, api, extraOptions);
    } 
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Post' , 'Comment'],
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

    logout: builder.mutation({
      query: () => ({
        url: 'auth/logout/',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(apiSlice.util.resetApiState());
        } catch (err) {
          console.error("Logout failed", err);
        }
      },
    }),
   
  }),
});

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useGetUserQuery,
  useLogoutMutation, 
} = apiSlice;

