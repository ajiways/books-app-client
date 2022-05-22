import { FC, HTMLAttributes } from 'react';
import { Outlet } from 'react-router-dom';
import { stylesFilter } from '../../helpers/styles.helper';
import styles from './Book.module.scss';

const Book: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => {
  const bookStyles = stylesFilter([styles.book, className]);

  return (
    <div className={bookStyles} {...props}>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Book;
