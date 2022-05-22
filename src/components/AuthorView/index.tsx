import { FC, HTMLAttributes } from 'react';
import { useParams, Link } from 'react-router-dom';
import { stylesFilter } from '../../helpers/styles.helper';
import { Author } from '../../interfaces/author.interface';
import { Book } from '../../interfaces/book.interface';
import { useGetAuthorByIdQuery } from '../../redux/api/authors.api';
import { useGetBooksByAuthorIdQuery } from '../../redux/api/books.api';
import { AppButton } from '../UI';
import styles from './AuthorView.module.scss';
import MiniBookItem from './MiniBookItem';

const getAuthorById = (id: string) => {
  const { data } = useGetAuthorByIdQuery(id);
  return data;
};

const getBooksByAuthorId = (id: string) => {
  const { data } = useGetBooksByAuthorIdQuery(id);
  return data;
};

const AuthorView: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const authorViewStyles = stylesFilter([styles.authorview, className]);

  const { id } = useParams();

  let authorData: Author | undefined = undefined;
  let booksData: Book[] | undefined = undefined;

  if (!id) {
    //FIXME: Implement
    return <div>404</div>;
  }

  authorData = getAuthorById(id);

  booksData = getBooksByAuthorId(id);

  return (
    <div className={authorViewStyles} {...props}>
      {authorData ? (
        <>
          <div className={styles.wrapper}>
            <div>
              <h2 className={styles.firstName}>
                Имя автора: {authorData.firstName}
              </h2>
              <h2 className={styles.lastName}>
                Фамилия: {authorData.lastName}
              </h2>
            </div>
            <AppButton buttonType="update">
              <Link to={`/author/edit/${authorData._id}`}>Редактировать</Link>
            </AppButton>
            <div>Книги: </div>
            <div>
              {booksData && booksData.length
                ? booksData.map((book) => (
                    <MiniBookItem key={book._id} book={book} />
                  ))
                : 'Книг нет'}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* //TODO: implement */}
          <h2>404</h2>
          <h3>Такого автора нет</h3>
        </>
      )}
    </div>
  );
};

export default AuthorView;
