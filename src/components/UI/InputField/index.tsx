import { FC, InputHTMLAttributes } from 'react';
import { stylesFilter } from '../../../helpers/styles.helper';
import styles from './InputField.module.scss';

const InputField: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  const inputStyles = stylesFilter([styles.inputfield, className]);

  return <input className={inputStyles} {...props} />;
};

export default InputField;
