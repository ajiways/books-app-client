import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book } from '../../interfaces/book.interface';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  tagTypes: ['Books'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    getBooks: builder.query<Book[], string>({
      query: () => 'books',
      providesTags: ['Books'],
    }),
    getBookById: builder.query<Book, string>({
      query: (id: string) => `books/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = booksApi;
