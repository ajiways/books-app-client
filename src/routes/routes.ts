import { FC } from 'react';
import {
  AUTHOR_CREATE,
  AUTHOR_EDIT,
  AUTHOR_LIST,
  AUTHOR_VIEW,
  BOOK_CREATE,
  BOOK_EDIT,
  BOOK_LIST,
  BOOK_VIEW,
  HOME,
} from '.';
import {
  AuthorEdit,
  AuthorList,
  AuthorView,
  BookEdit,
  BookList,
  BookView,
} from '../components';
import { Home } from '../pages';

interface RouteInterface {
  path: string;
  Component: FC;
  childrens?: RouteInterface[];
}

export const publicRoutes: RouteInterface[] = [
  {
    path: HOME,
    Component: Home,
    childrens: [
      {
        path: BOOK_EDIT,
        Component: BookEdit,
      },
      {
        path: BOOK_CREATE,
        Component: BookEdit,
      },
      {
        path: BOOK_VIEW,
        Component: BookView,
      },
      {
        path: BOOK_LIST,
        Component: BookList,
      },
      { path: AUTHOR_CREATE, Component: AuthorEdit },
      { path: AUTHOR_EDIT, Component: AuthorEdit },
      { path: AUTHOR_VIEW, Component: AuthorView },
      { path: AUTHOR_LIST, Component: AuthorList },
    ],
  },
];
