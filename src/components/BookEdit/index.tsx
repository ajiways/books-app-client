import { FC, HTMLAttributes, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { stylesFilter } from '../../helpers/styles.helper';
import { Author } from '../../interfaces/author.interface';
import { Book } from '../../interfaces/book.interface';
import { useGetAllAuthorsQuery } from '../../redux/api/authors.api';
import {
  useCreateBookMutation,
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from '../../redux/api/books.api';
import { BOOK_CREATE, BOOK_LIST } from '../../routes';
import { AppButton, AppForm, AppSelect, InputField } from '../UI';
import styles from './BookEdit.module.scss';

interface InputsInterface {
  title: string;
  description: string;
  authorIds: string[];
}

const BookEdit: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const bookEditStyles = stylesFilter([styles.bookedit, className]);
  const [createInputs, setCreateInputs] = useState<InputsInterface>({
    description: '',
    title: '',
    authorIds: [],
  });
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);

  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const { data } = useGetAllAuthorsQuery('');

  const navigate = useNavigate();
  const location = useLocation();

  let book: Book | undefined = undefined;
  let pageTitle = '';

  if (location.pathname !== BOOK_CREATE) {
    const { data } = useGetBookByIdQuery(location.pathname.split('/')[3]);
    book = data;
    pageTitle = 'Обновление данных о книге';
  } else {
    pageTitle = 'Создание книги';
  }

  const [updateInputs, setUpdateInputs] = useState<InputsInterface>({
    description: book?.description || '',
    title: book?.title || '',
    authorIds: [],
  });

  return (
    <div className={bookEditStyles} {...props}>
      <h1 className="pageTitle">{pageTitle}</h1>
      {location.pathname === BOOK_CREATE ? (
        <AppForm>
          <InputField
            onChange={(e) =>
              setCreateInputs((prevState) => {
                return {
                  title: e.target.value,
                  description: prevState.description,
                  authorIds: prevState.authorIds,
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
                  authorIds: prevState.authorIds,
                };
              })
            }
            value={createInputs.description}
          />
          Авторы:
          {data && (
            <AppSelect
              onChange={(e) =>
                setCreateInputs((prevState) => {
                  if (prevState.authorIds.find((i) => i === e.target.value)) {
                    return {
                      authorIds: prevState.authorIds,
                      description: prevState.description,
                      title: prevState.title,
                    };
                  }
                  setSelectedAuthors((prevState) => {
                    const selectedAuthor = data.find(
                      (author) => author._id === e.target.value,
                    );

                    if (!selectedAuthor) {
                      return prevState;
                    }

                    return [...prevState, selectedAuthor];
                  });
                  return {
                    authorIds: [...prevState.authorIds, e.target.value],
                    description: prevState.description,
                    title: prevState.title,
                  };
                })
              }
              options={data.map((author) => {
                return {
                  option: `${author.firstName} ${author.lastName}`,
                  special: author._id,
                };
              })}
            />
          )}
          {
            <div>
              Выбранные авторы:{' '}
              {selectedAuthors.map((author) => (
                <div key={author._id}>{author.firstName}</div>
              ))}
            </div>
          }
          <AppButton
            className={styles.update}
            buttonType="update"
            onClick={() => {
              createBook(createInputs);
              navigate(BOOK_LIST);
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
                      authorIds: prevState.authorIds,
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
                      authorIds: prevState.authorIds,
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
                    _id: book!._id,
                  });
                  navigate(BOOK_LIST);
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
