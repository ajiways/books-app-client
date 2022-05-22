import { FC, HTMLAttributes, useState } from 'react';
import { stylesFilter } from '../../helpers/styles.helper';
import { useCreateCommentMutation } from '../../redux/api/comments.api';
import { AppButton, AppForm, InputField } from '../UI';
import styles from './CommentCreate.module.scss';

interface CreateComment {
  author: string;
  content: string;
}

interface CreateCommentProps extends HTMLAttributes<HTMLDivElement> {
  bookId: string;
}

const CommentCreate: FC<CreateCommentProps> = ({
  className,
  bookId,
  ...props
}) => {
  const commentCreateStyles = stylesFilter([styles.commentcreate, className]);
  const [createInputs, setCreateInputs] = useState<CreateComment>({
    author: '',
    content: '',
  });

  const [createComment] = useCreateCommentMutation();

  return (
    <div className={commentCreateStyles} {...props}>
      <h2>Новый комментарий:</h2>
      <AppForm>
        <InputField
          placeholder="Автор"
          onChange={(e) =>
            setCreateInputs((prevState) => {
              return { author: e.target.value, content: prevState.content };
            })
          }
        />
        <InputField
          placeholder="Комментарий"
          onChange={(e) =>
            setCreateInputs((prevState) => {
              return { author: prevState.author, content: e.target.value };
            })
          }
        />
        <AppButton
          className={styles.createCommentBtn}
          buttonType="update"
          onClick={() => createComment({ ...createInputs, bookId: bookId })}
        >
          Отправить
        </AppButton>
      </AppForm>
    </div>
  );
};

export default CommentCreate;
