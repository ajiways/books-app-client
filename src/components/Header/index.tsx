import { FC, HTMLAttributes } from 'react';
import { stylesFilter } from '../../helpers/styles.helper';
import styles from './Header.module.scss';
import { AppButton } from '../UI';
import { Link, useLocation } from 'react-router-dom';
import {
  AUTHOR_CREATE,
  AUTHOR_LIST,
  BOOK_CREATE,
  BOOK_LIST,
  HOME,
} from '../../routes';

const Header: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const headerStyles = stylesFilter([styles.header, className]);

  const { pathname } = useLocation();

  return (
    <header className={headerStyles}>
      <div className="container">
        <div className={styles.inner}>
          {pathname === HOME ? (
            <>
              <AppButton className={styles.primary}>
                <Link to={BOOK_LIST}>Список книг</Link>
              </AppButton>
              <AppButton className={styles.primary}>
                <Link to={BOOK_CREATE}>Добавить книгу</Link>
              </AppButton>
              <AppButton className={styles.primary}>
                <Link to={AUTHOR_LIST}>Список авторов</Link>
              </AppButton>
              <AppButton className={styles.primary}>
                <Link to={AUTHOR_CREATE}>Добавить автора</Link>
              </AppButton>
            </>
          ) : pathname === AUTHOR_CREATE ? (
            <>
              <AppButton className={styles.primary}>
                <Link to={HOME}>Домой</Link>
              </AppButton>
              <AppButton className={styles.primary}>
                <Link to={AUTHOR_LIST}>Список авторов</Link>
              </AppButton>
              <AppButton className={styles.primary}>
                <Link to={BOOK_LIST}>Список книг</Link>
              </AppButton>
            </>
          ) : pathname === BOOK_CREATE ? (
            <>
              <AppButton className={styles.primary}>
                <Link to={HOME}>Домой</Link>
              </AppButton>
              <AppButton className={styles.primary}>
                <Link to={BOOK_LIST}>Список книг</Link>
              </AppButton>
              <AppButton className={styles.primary}>
                <Link to={AUTHOR_LIST}>Список авторов</Link>
              </AppButton>
            </>
          ) : pathname === AUTHOR_LIST ? (
            <>
              <AppButton className={styles.primary}>
                <Link to={HOME}>Домой</Link>
              </AppButton>
              <AppButton className={styles.primary}>
                <Link to={AUTHOR_CREATE}>Добавить автора</Link>
              </AppButton>
              <AppButton className={styles.primary}>
                <Link to={BOOK_LIST}>Список книг</Link>
              </AppButton>
            </>
          ) : pathname === BOOK_LIST ? (
            <>
              <AppButton className={styles.primary}>
                <Link to={HOME}>Домой</Link>
              </AppButton>
              <AppButton className={styles.primary}>
                <Link to={BOOK_CREATE}>Добавить книгу</Link>
              </AppButton>
              <AppButton className={styles.primary}>
                <Link to={AUTHOR_LIST}>Список авторов</Link>
              </AppButton>
            </>
          ) : (
            <AppButton className={styles.primary}>
              <Link to={HOME}>Домой</Link>
            </AppButton>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
