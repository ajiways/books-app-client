import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { stylesFilter } from '../../helpers/styles.helper';
import { Author } from '../../interfaces/author.interface';
import { Book } from '../../interfaces/book.interface';
import { useGetAuthorsByBookIdQuery } from '../../redux/api/authors.api';
import { useGetBookByIdQuery } from '../../redux/api/books.api';
import Authors from '../Authors';
import CommentCreate from '../CommentCreate';
import CommentList from '../CommentList';
import { AppButton } from '../UI';
import styles from './BookView.module.scss';

const BookView: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const bookViewStyles = stylesFilter([styles.bookview, className]);
  const [book, setBook] = useState<Book | undefined>(undefined);

  const { id } = useParams();

  let bookData: Book | undefined = undefined;
  let authorsData: Author[] = [];

  if (id) {
    const { data } = useGetBookByIdQuery(id);
    bookData = data;
  }

  useEffect(() => {
    if (bookData) {
      setBook(bookData);
    }
  }, [bookData]);

  if (id) {
    const { data } = useGetAuthorsByBookIdQuery(id);
    if (data) {
      authorsData = data;
    }
  }

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
              <Link to={`/book/edit/${book._id}`}>Редактировать</Link>
            </AppButton>
          </div>
          <div className={styles.authors}>
            <Authors authors={authorsData} />
          </div>
          <CommentList book={book} />

          <CommentCreate bookId={book._id} />
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
