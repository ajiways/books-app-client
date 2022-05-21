import { ButtonHTMLAttributes, FC } from 'react';
import { filter } from '../../../helpers/styles.helper';
import styles from './Button.module.scss';

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  const buttonStyles = filter([styles.button, className]);

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
