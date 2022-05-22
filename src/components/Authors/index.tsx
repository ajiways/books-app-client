import { FC, HTMLAttributes } from 'react';
import { Author } from '../../interfaces/author.interface';
import styles from './Authors.module.scss';
import { stylesFilter } from '../../helpers/styles.helper';
import AuthorItem from './AuthorItem';

export interface AuthorItemProps extends HTMLAttributes<HTMLDivElement> {
  authors: Author[];
}

const Authors: FC<AuthorItemProps> = ({ className, authors, ...props }) => {
  const authorStyles = stylesFilter([styles.author, className]);

  return (
    <div className={authorStyles} {...props}>
      <h3 className={styles.title}>Авторы:</h3>
      {authors.length ? (
        authors.map((author) => <AuthorItem key={author._id} author={author} />)
      ) : (
        <span>Авторов нет</span>
      )}
    </div>
  );
};

export default Authors;
