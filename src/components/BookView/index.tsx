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
          <h2>{book.title}</h2>
          <p>{book.description}</p>
          <AppButton>
            <Link to={`/book/edit/${book.id}`}>Редактировать</Link>
          </AppButton>
          {/* //TODO: implement */}
          {/* <Authors authors={book.authors} /> */}
          <h4>Комментарии</h4>
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
