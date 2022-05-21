import { FC, HTMLAttributes } from 'react';
import { filter } from '../../helpers/styles.helper';
import styles from './Home.module.scss';

const Home: FC<HTMLAttributes<HTMLDivElement>> = ({ className }) => {
  const homeStyles = filter([styles.home, className]);

  return <div className={homeStyles}>Ку</div>;
};

export default Home;
