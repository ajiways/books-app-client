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

  const { data } = useGetCommentsByBookIdQuery(book.id);

  return (
    <div className={commentListStyles} {...props}>
      <h2>Список комментариев</h2>
      <div>
        {data &&
          data.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
};

export default CommentList;
