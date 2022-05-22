import { Author } from './author.interface';

export interface Book {
  id: string;
  title: string;
  description: string;
  authors: Author[];
}
