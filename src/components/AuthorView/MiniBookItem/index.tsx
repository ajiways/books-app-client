import { FC, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { stylesFilter } from '../../../helpers/styles.helper';
import { Book } from '../../../interfaces/book.interface';
import { AppButton } from '../../UI';
import styles from './MiniBookItem.module.scss';

export interface MiniBookItemProps extends HTMLAttributes<HTMLDivElement> {
  book: Book;
}

const MiniBookItem: FC<MiniBookItemProps> = ({ className, book, ...props }) => {
  const bookItemStyles = stylesFilter([styles.minibookitem, className]);

  return (
    <div className={bookItemStyles} {...props}>
      <h3>{book.title}</h3>
      <h5>{book.description}</h5>
      <AppButton>
        <Link to={`/book/list/item/${book._id}`}>К странице книги</Link>
      </AppButton>
    </div>
  );
};

export default MiniBookItem;
