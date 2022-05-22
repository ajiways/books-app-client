import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { Book } from '../../../interfaces/book.interface';
import styles from './BookItem.module.scss';
import { stylesFilter } from '../../../helpers/styles.helper';
import { useDeleteBookMutation } from '../../../redux/api/books.api';
import { AppButton } from '../../UI';
import { Link, useNavigate } from 'react-router-dom';
import { useGetAuthorsByBookIdQuery } from '../../../redux/api/authors.api';
import { Author } from '../../../interfaces/author.interface';

export interface BookItemProps extends HTMLAttributes<HTMLDivElement> {
  book: Book;
}

const BookItem: FC<BookItemProps> = ({ className, book, ...props }) => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const bookItemStyles = stylesFilter([styles.bookitem, className]);
  const [deleteBook] = useDeleteBookMutation();
  const navigation = useNavigate();

  const { data } = useGetAuthorsByBookIdQuery(book._id);

  useEffect(() => {
    if (data) {
      setAuthors(data);
    }
  }, [data]);

  return (
    <div className={bookItemStyles} {...props}>
      <div>
        <h2
          onClick={() => navigation(`item/${book._id}`)}
          className={styles.title}
        >
          {book.title}
        </h2>
        <p className={styles.descriptions}>{book.description}</p>
      </div>
      <div className={styles.leftSide}>
        <div className={styles.authorsTitle}>Авторы: </div>
        <div className={styles.authors}>
          {authors.length
            ? authors.map((i) => i.lastName).join(', ')
            : 'Авторов нет'}
        </div>
        <AppButton
          className={styles.delete}
          buttonType="delete"
          onClick={() => deleteBook(book._id)}
        >
          Удалить
        </AppButton>
        <AppButton className={styles.update} buttonType="update">
          <Link to={`item/${book._id}`}>Открыть</Link>
        </AppButton>
      </div>
    </div>
  );
};

export default BookItem;
