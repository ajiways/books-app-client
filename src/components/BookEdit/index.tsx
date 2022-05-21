import { FC, HTMLAttributes } from 'react';
import { stylesFilter } from '../../helpers/styles.helper';
import styles from './BookEdit.module.scss';

const BookEdit: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const bookEditStyles = stylesFilter([styles.bookedit, className]);

  return (
    <div className={bookEditStyles} {...props}>
      Привет
    </div>
  );
};

export default BookEdit;
