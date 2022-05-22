import { FC, HTMLAttributes } from 'react';
import { BookList } from '../../components';
import { stylesFilter } from '../../helpers/styles.helper';
import styles from './Home.module.scss';

const Home: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const homeStyles = stylesFilter([styles.home, className]);

  return (
    <div className={homeStyles}>
      <div className="container">
        <BookList />
      </div>
    </div>
  );
};

export default Home;
