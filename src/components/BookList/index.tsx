import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { stylesFilter } from '../../helpers/styles.helper';
import styles from './BookList.module.scss';
import BookItem from './BookItem';
import { useGetBooksQuery } from '../../redux/api/books.api';
import { AppButton } from '../UI';

const BookList: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const bookListStyles = stylesFilter([styles.booklist, className]);

  const { data } = useGetBooksQuery(page);

  const perPage = 7;

  useEffect(() => {
    if (data) {
      setPageCount(Math.ceil(data.totalCount / perPage));
    }
  }, [data]);

  const pagesArray = [];

  for (let i = 0; i < pageCount; i++) {
    pagesArray.push(i + 1);
  }

  const changePage = (p: number) => {
    setPage(p);
  };

  return (
    <div className={bookListStyles} {...props}>
      {data && data.books.length ? (
        data.books.map((book) => (
          <BookItem className={styles.bookitem} key={book.id} book={book} />
        ))
      ) : (
        <div> Пусто </div>
      )}
      {pagesArray.map((p) => (
        <AppButton
          key={p}
          onClick={() => changePage(p)}
          className={
            page === p
              ? [styles.active, styles.pageBtn].join(' ')
              : styles.pageBtn
          }
        >
          {p}
        </AppButton>
      ))}
    </div>
  );
};

export default BookList;
