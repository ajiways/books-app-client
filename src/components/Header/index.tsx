import { FC, HTMLAttributes } from 'react';
import { stylesFilter } from '../../helpers/styles.helper';
import styles from './Header.module.scss';
import { AppButton } from '../UI';
import { Link, useLocation } from 'react-router-dom';
import { BOOK_CREATE, HOME } from '../../routes';

const Header: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const headerStyles = stylesFilter([styles.header, className]);

  const { pathname } = useLocation();

  return (
    <header className={headerStyles}>
      <div className="container">
        <div className={styles.inner}>
          {pathname === HOME ? (
            <Link to={BOOK_CREATE}>
              <AppButton>Добавить книгу</AppButton>
            </Link>
          ) : (
            <Link to={HOME}>
              <AppButton>Домой</AppButton>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
