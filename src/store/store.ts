import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { authorsApi } from '../redux/api/authors.api';
import { booksApi } from '../redux/api/books.api';
import { commentsApi } from '../redux/api/comments.api';

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [authorsApi.reducerPath]: authorsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      booksApi.middleware,
      commentsApi.middleware,
      authorsApi.middleware,
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
