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
      providesTags: ['Books'],
    }),
    createBook: builder.mutation<string, Omit<Book, 'authors' | 'id'>>({
      query: (book: Omit<Book, 'authors' | 'id'>) => ({
        url: `books`,
        method: 'POST',
        body: { ...book },
      }),
      invalidatesTags: ['Books'],
    }),
    deleteBook: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `books`,
        body: { id },
        method: 'DELETE',
      }),
      invalidatesTags: ['Books'],
    }),
    updateBook: builder.mutation<string, Omit<Book, 'authors'>>({
      query: (book: Omit<Book, 'authors'>) => ({
        url: 'books',
        method: 'PATCH',
        body: { ...book },
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
} = booksApi;
