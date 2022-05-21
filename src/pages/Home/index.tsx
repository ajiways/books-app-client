import { FC, HTMLAttributes } from 'react';
import { stylesFilter } from '../../helpers/styles.helper';
import styles from './Home.module.scss';

const Home: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const homeStyles = stylesFilter([styles.home, className]);

  return (
    <div className={homeStyles}>
      <div className="container">Ку</div>
    </div>
  );
};

export default Home;
