import { FC, HTMLAttributes } from 'react';
import { Book } from '../../../interfaces/book.interface';
import styles from './BookItem.module.scss';
import { stylesFilter } from '../../../helpers/styles.helper';
import { useDeleteBookMutation } from '../../../redux/api/books.api';
import { AppButton } from '../../UI';
import { Link, useNavigate } from 'react-router-dom';
// import Authors from '../../Authors';

export interface BookItemProps extends HTMLAttributes<HTMLDivElement> {
  book: Book;
}

const BookItem: FC<BookItemProps> = ({ className, book, ...props }) => {
  const bookItemStyles = stylesFilter([styles.bookitem, className]);
  const [deleteBook] = useDeleteBookMutation();
  const navigation = useNavigate();

  return (
    <div className={bookItemStyles} {...props}>
      <div>
        <h2
          onClick={() => navigation(`book/view/${book.id}`)}
          className={styles.title}
        >
          {book.title}
        </h2>
        <p className={styles.descriptions}>{book.description}</p>
      </div>
      {/*TODO: implement*/}
      {/* <div className={styles.authors}>
        <Authors authors={book.authors} />
      </div> */}
      <div>
        <AppButton
          className={styles.delete}
          buttonType="delete"
          onClick={() => deleteBook(book.id)}
        >
          Удалить
        </AppButton>
        <AppButton className={styles.update} buttonType="update">
          <Link to={`book/view/${book.id}`}>Открыть</Link>
        </AppButton>
      </div>
    </div>
  );
};

export default BookItem;
