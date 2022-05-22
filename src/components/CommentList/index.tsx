import { FC, HTMLAttributes } from 'react';
import { stylesFilter } from '../../helpers/styles.helper';
import { Book } from '../../interfaces/book.interface';
import { useGetCommentsByBookIdQuery } from '../../redux/api/comments.api';
import CommentItem from './CommentItem';
import styles from './CommentList.module.scss';

export interface CommentListProps extends HTMLAttributes<HTMLDivElement> {
  book: Book;
}

const CommentList: FC<CommentListProps> = ({ className, book, ...props }) => {
  const commentListStyles = stylesFilter([styles.commentlist, className]);

  const { data } = useGetCommentsByBookIdQuery(book._id);

  return (
    <div className={commentListStyles} {...props}>
      <h2 className={styles.title}>Список комментариев</h2>
      <div>
        {data && data.length
          ? data.map((comment) => (
              <CommentItem key={comment._id} comment={comment} />
            ))
          : 'Комментариев еще нет...'}
      </div>
    </div>
  );
};

export default CommentList;
