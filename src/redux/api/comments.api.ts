import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../constants/constants';
import { IComment } from '../../interfaces/comment.interface';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  tagTypes: ['Comments'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getCommentsByBookId: builder.query<IComment[], string>({
      query: (bookId: string) => ({
        url: `comments/${bookId}`,
        method: 'GET',
      }),
      providesTags: ['Comments'],
    }),
    createComment: builder.mutation<string, Omit<IComment, '_id'>>({
      query: (comment: Omit<IComment, '_id'>) => ({
        url: `comments`,
        method: 'POST',
        body: { ...comment },
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const { useCreateCommentMutation, useGetCommentsByBookIdQuery } =
  commentsApi;
