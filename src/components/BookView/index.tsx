import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { stylesFilter } from '../../helpers/styles.helper';
import { Book } from '../../interfaces/book.interface';
import { useGetBookByIdQuery } from '../../redux/api/books.api';
import CommentCreate from '../CommentCreate';
import CommentList from '../CommentList';
import { AppButton } from '../UI';
// import Authors from '../Authors';
import styles from './BookView.module.scss';

const BookView: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const bookViewStyles = stylesFilter([styles.bookview, className]);
  const [book, setBook] = useState<Book | undefined>(undefined);

  const { id } = useParams();

  let bookData: Book | undefined = undefined;

  if (id) {
    const { data } = useGetBookByIdQuery(id);
    bookData = data;
  }

  useEffect(() => {
    if (bookData) {
      setBook(bookData);
    }
  }, [bookData]);

  return (
    <div className={bookViewStyles} {...props}>
      {book ? (
        <>
          <div className={styles.wrapper}>
            <div>
              <h2 className={styles.title}>Название книги: {book.title}</h2>
              <p className={styles.description}>Описание: {book.description}</p>
            </div>
            <AppButton buttonType="update">
              <Link to={`/book/edit/${book.id}`}>Редактировать</Link>
            </AppButton>
          </div>
          {/* //TODO: implement */}
          {/* <Authors authors={book.authors} /> */}
          <CommentList book={book} />

          <CommentCreate bookId={book.id} />
        </>
      ) : (
        <>
          {/* //TODO: implement */}
          <h2>404</h2>
          <h3>Такой книги нет</h3>
        </>
      )}
    </div>
  );
};

export default BookView;
