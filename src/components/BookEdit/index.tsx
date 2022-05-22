import { FC, HTMLAttributes, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { stylesFilter } from '../../helpers/styles.helper';
import { Book } from '../../interfaces/book.interface';
import {
  useCreateBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from '../../redux/api/books.api';
import { BOOK_CREATE, HOME } from '../../routes';
import { AppButton, AppForm, InputField } from '../UI';
import styles from './BookEdit.module.scss';

interface InputsInterface {
  title: string;
  description: string;
}

const BookEdit: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const bookEditStyles = stylesFilter([styles.bookedit, className]);
  const [createInputs, setCreateInputs] = useState<InputsInterface>({
    description: '',
    title: '',
  });

  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();

  const navigate = useNavigate();
  const location = useLocation();

  let book: Book | undefined = undefined;

  if (location.pathname !== BOOK_CREATE) {
    const { data } = useGetBookByIdQuery(location.pathname.split('/')[3]);
    book = data;
  }

  const [updateInputs, setUpdateInputs] = useState<InputsInterface>({
    description: book?.description || '',
    title: book?.title || '',
  });

  return (
    <div className={bookEditStyles} {...props}>
      {location.pathname === BOOK_CREATE ? (
        <AppForm>
          <InputField
            onChange={(e) =>
              setCreateInputs((prevState) => {
                return {
                  title: e.target.value,
                  description: prevState.description,
                };
              })
            }
            value={createInputs.title}
            placeholder="Название книги"
            name="title"
          />
          <InputField
            placeholder="Описание книги"
            name="description"
            onChange={(e) =>
              setCreateInputs((prevState) => {
                return {
                  title: prevState.title,
                  description: e.target.value,
                };
              })
            }
            value={createInputs.description}
          />
          <AppButton
            className={styles.update}
            buttonType="update"
            onClick={() => {
              createBook(createInputs);
              navigate(HOME);
            }}
          >
            Создать
          </AppButton>
        </AppForm>
      ) : (
        <>
          {book ? (
            <AppForm>
              <InputField
                onChange={(e) =>
                  setUpdateInputs((prevState) => {
                    return {
                      title: e.target.value,
                      description: prevState.description,
                    };
                  })
                }
                value={updateInputs.title}
                placeholder="Название книги"
                name="title"
              />
              <InputField
                placeholder="Описание книги"
                name="description"
                onChange={(e) =>
                  setUpdateInputs((prevState) => {
                    return {
                      title: prevState.title,
                      description: e.target.value,
                    };
                  })
                }
                value={updateInputs.description}
              />
              <AppButton
                className={styles.update}
                buttonType="update"
                onClick={() => {
                  updateBook({
                    description: updateInputs.description,
                    title: updateInputs.title,
                    id: book!.id,
                  });
                  navigate(HOME);
                }}
              >
                Обновить
              </AppButton>
            </AppForm>
          ) : (
            // TODO: implement
            '404'
          )}
        </>
      )}
    </div>
  );
};

export default BookEdit;
