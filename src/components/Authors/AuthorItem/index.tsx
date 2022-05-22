import { FC, HTMLAttributes } from 'react';
import { stylesFilter } from '../../../helpers/styles.helper';
import styles from './AuthorItem.module.scss';
import { Author } from '../../../interfaces/author.interface';
import { AppButton } from '../../UI';
import { Link } from 'react-router-dom';

interface AuthorItemProps extends HTMLAttributes<HTMLDivElement> {
  author: Author;
}

const AuthorItem: FC<AuthorItemProps> = ({ className, author, ...props }) => {
  const authorItemStyles = stylesFilter([styles.authoritem, className]);

  return (
    <div className={authorItemStyles} {...props}>
      <>
        <div>Имя: {author.firstName}</div>
        <div>Фамилия: {author.lastName}</div>
      </>
      <AppButton>
        <Link to={`/author/list/item/${author._id}`}>Страница автора</Link>
      </AppButton>
    </div>
  );
};

export default AuthorItem;
