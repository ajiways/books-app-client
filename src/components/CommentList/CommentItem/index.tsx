import { FC, HTMLAttributes } from 'react';
import { stylesFilter } from '../../../helpers/styles.helper';
import { IComment } from '../../../interfaces/comment.interface';
import styles from './CommentItem.module.scss';

export interface CommentItemProps extends HTMLAttributes<HTMLDivElement> {
  comment: IComment;
}

const CommentItem: FC<CommentItemProps> = ({
  className,
  comment,
  ...props
}) => {
  const commentItemStyles = stylesFilter([styles.commentitem, className]);

  return (
    <div className={commentItemStyles} {...props}>
      <div className={styles.author}>Автор: {comment.author}</div>
      <div className={styles.content}>Сообщение: {comment.content}</div>
    </div>
  );
};

export default CommentItem;
