import { FC, HTMLAttributes } from 'react';
import { stylesFilter } from '../../helpers/styles.helper';
import styles from './BookList.module.scss';
import BookItem from './BookItem';
import { useGetBooksQuery } from '../../redux/api/books.api';

const BookList: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const bookListStyles = stylesFilter([styles.booklist, className]);

  const { data } = useGetBooksQuery('');

  return (
    <div className={bookListStyles} {...props}>
      {data && data.length ? (
        data.map((book) => (
          <BookItem className={styles.bookitem} key={book.id} book={book} />
        ))
      ) : (
        <div> Пусто </div>
      )}
    </div>
  );
};

export default BookList;
