import { FC, HTMLAttributes, useEffect, useState } from 'react';
import { stylesFilter } from '../../helpers/styles.helper';
import { useGetAuthorsQuery } from '../../redux/api/authors.api';
import { AppButton } from '../UI';
import AuthorItem from './AuthorItem';
import styles from './AuthorList.module.scss';

const AuthorList: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const authorListStyles = stylesFilter([styles.authorlist, className]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  const { data } = useGetAuthorsQuery(page);

  const perPage = 7;

  useEffect(() => {
    if (data) {
      setPageCount(Math.ceil(data.totalCount / perPage));
    }
  }, [data]);

  const pagesArray = [];

  for (let i = 0; i < pageCount; i++) {
    pagesArray.push(i + 1);
  }

  const changePage = (p: number) => {
    setPage(p);
  };

  return (
    <div className={authorListStyles} {...props}>
      <h1 className="pageTitle">Список авторов</h1>
      {data && data.authors.length ? (
        data.authors.map((author) => (
          <AuthorItem
            className={styles.authoritem}
            key={author._id}
            author={author}
          />
        ))
      ) : (
        <div> Пусто </div>
      )}
      {pagesArray.map((p) => (
        <AppButton
          key={p}
          onClick={() => changePage(p)}
          className={
            page === p
              ? [styles.active, styles.pageBtn].join(' ')
              : styles.pageBtn
          }
        >
          {p}
        </AppButton>
      ))}
    </div>
  );
};

export default AuthorList;
