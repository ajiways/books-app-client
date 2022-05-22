import { FC, HTMLAttributes, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { stylesFilter } from '../../helpers/styles.helper';
import { Author } from '../../interfaces/author.interface';
import {
  useCreateAuthorMutation,
  useGetAuthorByIdQuery,
  useUpdateAuthorMutation,
} from '../../redux/api/authors.api';
import { AUTHOR_CREATE, AUTHOR_LIST } from '../../routes';
import { AppForm, InputField, AppButton } from '../UI';
import styles from './AuthorCreate.module.scss';

interface InputsInterface {
  firstName: string;
  lastName: string;
}

const AuthorEdit: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const authorEditStyles = stylesFilter([styles.authorcreate, className]);
  const [createInputs, setCreateInputs] = useState<InputsInterface>({
    lastName: '',
    firstName: '',
  });

  const [createAuthor] = useCreateAuthorMutation();
  const [updateAuthor] = useUpdateAuthorMutation();

  const navigate = useNavigate();
  const location = useLocation();

  let author: Author | undefined = undefined;
  let pageTitle = '';

  if (location.pathname !== AUTHOR_CREATE) {
    const { data } = useGetAuthorByIdQuery(location.pathname.split('/')[3]);
    author = data;
    pageTitle = 'Обновление данных об авторе';
  } else {
    pageTitle = 'Создание автора';
  }

  const [updateInputs, setUpdateInputs] = useState<InputsInterface>({
    lastName: author?.firstName || '',
    firstName: author?.lastName || '',
  });

  return (
    <div className={authorEditStyles} {...props}>
      <h1 className="pageTitle">{pageTitle}</h1>
      {location.pathname === AUTHOR_CREATE ? (
        <AppForm>
          <InputField
            onChange={(e) =>
              setCreateInputs((prevState) => {
                return {
                  firstName: e.target.value,
                  lastName: prevState.lastName,
                };
              })
            }
            value={createInputs.firstName}
            placeholder="Имя автора"
            name="firstName"
          />
          <InputField
            placeholder="Фамилия автора"
            name="lastName"
            onChange={(e) =>
              setCreateInputs((prevState) => {
                return {
                  firstName: prevState.firstName,
                  lastName: e.target.value,
                };
              })
            }
            value={createInputs.lastName}
          />
          <AppButton
            className={styles.update}
            buttonType="update"
            onClick={() => {
              createAuthor(createInputs);
              navigate(AUTHOR_LIST);
            }}
          >
            Создать
          </AppButton>
        </AppForm>
      ) : (
        <>
          {author ? (
            <AppForm>
              <InputField
                onChange={(e) =>
                  setUpdateInputs((prevState) => {
                    return {
                      firstName: e.target.value,
                      lastName: prevState.lastName,
                    };
                  })
                }
                value={updateInputs.firstName}
                placeholder="Название книги"
                name="title"
              />
              <InputField
                placeholder="Описание книги"
                name="description"
                onChange={(e) =>
                  setUpdateInputs((prevState) => {
                    return {
                      firstName: prevState.firstName,
                      lastName: e.target.value,
                    };
                  })
                }
                value={updateInputs.lastName}
              />
              <AppButton
                className={styles.update}
                buttonType="update"
                onClick={() => {
                  updateAuthor({
                    lastName: updateInputs.lastName,
                    firstName: updateInputs.firstName,
                    _id: author!._id,
                  });
                  navigate(AUTHOR_LIST);
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
export default AuthorEdit;
