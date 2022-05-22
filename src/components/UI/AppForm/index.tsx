import { FC, HTMLAttributes } from 'react';
import { stylesFilter } from '../../../helpers/styles.helper';
import styles from './AppForm.module.scss';

const AppForm: FC<HTMLAttributes<HTMLFormElement>> = ({
  className,
  ...props
}) => {
  const appFormStyles = stylesFilter([styles.appform, className]);

  return <form className={appFormStyles} {...props}></form>;
};

export default AppForm;
