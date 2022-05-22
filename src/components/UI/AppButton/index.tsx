import { ButtonHTMLAttributes, FC } from 'react';
import { stylesFilter } from '../../../helpers/styles.helper';
import styles from './AppButton.module.scss';

export type TButtonTypes = 'primary' | 'delete' | 'update';

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  buttonType?: TButtonTypes;
}

const AppButton: FC<AppButtonProps> = ({
  children,
  className,
  buttonType = 'primary',
  onClick,
  ...props
}) => {
  const buttonStyles = stylesFilter([
    styles.appbutton,
    className,
    styles[buttonType],
  ]);

  return (
    <button
      className={buttonStyles}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default AppButton;
