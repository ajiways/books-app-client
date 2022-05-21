import { FC } from 'react';
import { BOOK, BOOK_CREATE, BOOK_EDIT, BOOK_LIST, BOOK_VIEW, HOME } from '.';
import { Book, Home } from '../pages';

interface RouteInterface {
  path: string;
  Component: FC;
  childrens?: RouteInterface[];
}

export const publicRoutes: RouteInterface[] = [
  {
    path: HOME,
    Component: Home,
  },
  {
    path: BOOK,
    Component: Book,
    childrens: [
      {
        path: BOOK_EDIT,
        Component: Book,
      },
      {
        path: BOOK_CREATE,
        Component: Book,
      },
      {
        path: BOOK_LIST,
        Component: Book,
      },
      {
        path: BOOK_VIEW,
        Component: Book,
      },
    ],
  },
];
