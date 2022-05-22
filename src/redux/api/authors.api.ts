import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Author } from '../../interfaces/author.interface';

interface AuthorsResponseInteface {
  authors: Author[];
  totalCount: number;
}

export const authorsApi = createApi({
  reducerPath: 'authorsApi',
  tagTypes: ['Authors'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/',
  }),
  endpoints: (builder) => ({
    getAuthors: builder.query<AuthorsResponseInteface, number>({
      query: (p: number) => `/authors?page=${p}`,
      providesTags: (result) =>
        result
          ? [
              ...result.authors.map(({ _id: id }) => ({
                type: 'Authors' as const,
                id,
              })),
              { type: 'Authors', id: 'PARTIAL-LIST' },
            ]
          : [{ type: 'Authors', id: 'PARTIAL-LIST' }],
    }),
    createAuthor: builder.mutation<string, Omit<Author, '_id'>>({
      query: (author: Omit<Author, '_id'>) => ({
        url: `authors`,
        method: 'POST',
        body: { ...author },
      }),
      invalidatesTags: ['Authors'],
    }),
    getAuthorById: builder.query<Author, string>({
      query: (id: string) => `authors/${id}`,
      providesTags: ['Authors'],
    }),
    updateAuthor: builder.mutation<Author, Author>({
      query: (author: Author) => ({
        url: '/authors',
        method: 'PATCH',
        body: { ...author },
      }),
      invalidatesTags: ['Authors'],
    }),
    deleteAuthor: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `authors`,
        body: { id },
        method: 'DELETE',
      }),
      invalidatesTags: ['Authors'],
    }),
    getAuthorsByBookId: builder.query<Author[], string>({
      query: (id: string) => `authors/book/${id}`,
      providesTags: ['Authors'],
    }),
    getAllAuthors: builder.query<Author[], string>({
      query: () => 'authors/all',
      providesTags: ['Authors'],
    }),
  }),
});

export const {
  useCreateAuthorMutation,
  useGetAuthorByIdQuery,
  useUpdateAuthorMutation,
  useDeleteAuthorMutation,
  useGetAuthorsQuery,
  useGetAuthorsByBookIdQuery,
  useGetAllAuthorsQuery,
} = authorsApi;
