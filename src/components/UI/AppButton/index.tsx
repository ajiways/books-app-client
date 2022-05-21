import { ButtonHTMLAttributes, FC } from 'react';
import { stylesFilter } from '../../../helpers/styles.helper';
import styles from './AppButton.module.scss';

const AppButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  const buttonStyles = stylesFilter([styles.appbutton, className]);

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default AppButton;
