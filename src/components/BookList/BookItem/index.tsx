import { FC, HTMLAttributes } from 'react';
import { Book } from '../../../interfaces/book.interface';
import styles from './BookItem.module.scss';
import { stylesFilter } from '../../../helpers/styles.helper';
import Authors from '../../Authors';

export interface BookItemProps extends HTMLAttributes<HTMLDivElement> {
  book: Book;
}

const BookItem: FC<BookItemProps> = ({ className, book, ...props }) => {
  const bookItemStyles = stylesFilter([styles.bookitem, className]);

  return (
    <div className={bookItemStyles} {...props}>
      <h2 className={styles.title}>{book.title}</h2>
      <p className={styles.descriptions}>{book.description}</p>
      <div className={styles.authors}>
        <Authors authors={book.authors} />
      </div>
    </div>
  );
};

export default BookItem;
