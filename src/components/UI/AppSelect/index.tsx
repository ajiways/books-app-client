import { FC, SelectHTMLAttributes } from 'react';
import { stylesFilter } from '../../../helpers/styles.helper';
import styles from './AppSelect.module.scss';

interface AppSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

const AppSelect: FC<AppSelectProps> = ({ className, options, ...props }) => {
  const selectStyles = stylesFilter([styles.appselect, className]);

  return (
    <select className={selectStyles} {...props}>
      {options.map((opt) => (
        <option>{opt}</option>
      ))}
    </select>
  );
};

export default AppSelect;
