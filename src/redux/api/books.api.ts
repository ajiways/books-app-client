import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Book } from '../../interfaces/book.interface';

interface BooksResponseInterface {
  books: Book[];
  totalCount: number;
}

export const booksApi = createApi({
  reducerPath: 'booksApi',
  tagTypes: ['Books'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
  }),
  endpoints: (builder) => ({
    getBooks: builder.query<BooksResponseInterface, number>({
      query: (page: number) => ({
        url: `/books?page=${page}`,
      }),
      //FIXME: Оно просто не работает, любой хедер - null
      // transformResponse(response: Book[], meta: FetchBaseQueryMeta) {
      //   return {
      //     books: response,
      //     totalCount: Number(meta?.response?.headers.get('X-Total-Count')),
      //   };
      // },
      providesTags: (result) =>
        result
          ? [
              ...result.books.map(({ id }) => ({ type: 'Books' as const, id })),
              { type: 'Books', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Books', id: 'PARTIAL-LIST' }],
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
