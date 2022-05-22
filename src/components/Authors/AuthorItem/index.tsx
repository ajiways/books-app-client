import { FC, HTMLAttributes } from 'react';
import { stylesFilter } from '../../../helpers/styles.helper';
import styles from './AuthorItem.module.scss';
import { Author } from '../../../interfaces/author.interface';

interface AuthorItemProps extends HTMLAttributes<HTMLDivElement> {
  author: Author;
}

const AuthorItem: FC<AuthorItemProps> = ({ className, author, ...props }) => {
  const authorItemStyles = stylesFilter([styles.authoritem, className]);

  return (
    <div className={authorItemStyles} {...props}>
      <>
        <div>{author.firstName}</div>
        <div>{author.lastName}</div>
      </>
    </div>
  );
};

export default AuthorItem;
