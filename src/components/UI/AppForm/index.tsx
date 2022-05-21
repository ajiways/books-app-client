import { FC, HTMLAttributes } from 'react';
import { filter } from '../../../helpers/styles.helper';
import styles from './AppForm.module.scss';

const AppForm: FC<HTMLAttributes<HTMLFormElement>> = ({
  className,
  ...props
}) => {
  const appFormStyles = filter([styles.appform, className]);

  return <form className={appFormStyles} {...props}></form>;
};

export default AppForm;
