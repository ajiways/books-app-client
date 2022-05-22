import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IComment } from '../../interfaces/comment.interface';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  tagTypes: ['Comments'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
  }),
  endpoints: (builder) => ({
    getCommentsByBookId: builder.query<IComment[], string>({
      query: (bookId: string) => ({
        url: `comments/${bookId}`,
        method: 'GET',
      }),
      providesTags: ['Comments'],
    }),
    createComment: builder.mutation<string, Omit<IComment, 'id'>>({
      query: (comment: Omit<IComment, 'id'>) => ({
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
