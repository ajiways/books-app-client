import { FC, InputHTMLAttributes } from 'react';
import { filter } from '../../../helpers/styles.helper';
import styles from './InputField.module.scss';

const InputField: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  const inputStyles = filter([styles.inputfield, className]);

  return <input className={inputStyles} {...props} />;
};

export default InputField;
