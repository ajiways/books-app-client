import { FC, HTMLAttributes } from 'react';
import { Outlet } from 'react-router-dom';
import { stylesFilter } from '../../helpers/styles.helper';
import styles from './Home.module.scss';

const Home: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const homeStyles = stylesFilter([styles.home, className]);

  return (
    <div className={homeStyles}>
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
