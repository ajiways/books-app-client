import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { booksApi } from '../redux/api/books.api';

export const store = configureStore({
  reducer: { [booksApi.reducerPath]: booksApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
