import { FC, HTMLAttributes } from 'react';
import { filter } from '../../helpers/styles.helper';
import styles from './Book.module.scss';

const Book: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const bookStyles = filter([styles.book, className]);

  return <div className={bookStyles} {...props}></div>;
};

export default Book;
