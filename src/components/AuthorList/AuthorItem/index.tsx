import { FC, HTMLAttributes } from 'react';
import styles from './AuthorItem.module.scss';
import { stylesFilter } from '../../../helpers/styles.helper';
import { AppButton } from '../../UI';
import { Link, useNavigate } from 'react-router-dom';
import { useDeleteAuthorMutation } from '../../../redux/api/authors.api';
import { Author } from '../../../interfaces/author.interface';

export interface AuthorItemProps extends HTMLAttributes<HTMLDivElement> {
  author: Author;
}

const AuthorItem: FC<AuthorItemProps> = ({ className, author, ...props }) => {
  const authorItemStyles = stylesFilter([styles.authoritem, className]);
  const [deleteAuthor] = useDeleteAuthorMutation();
  const navigation = useNavigate();

  return (
    <div className={authorItemStyles} {...props}>
      <div>
        <h2
          onClick={() => navigation(`item/${author._id}`)}
          className={styles.firstName}
        >
          {author.firstName}
        </h2>
        <p className={styles.lastName}>{author.lastName}</p>
      </div>
      <div>
        <AppButton
          className={styles.delete}
          buttonType="delete"
          onClick={() => deleteAuthor(author._id)}
        >
          Удалить
        </AppButton>
        <AppButton className={styles.update} buttonType="update">
          <Link to={`item/${author._id}`}>Открыть</Link>
        </AppButton>
      </div>
    </div>
  );
};

export default AuthorItem;
