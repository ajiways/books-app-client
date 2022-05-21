import { Author } from './author.interface';

export interface Book {
  _id: string;
  title: string;
  description: string;
  logoSrc: string;
  authors: Author[];
}
