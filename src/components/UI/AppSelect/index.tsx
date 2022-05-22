import { FC, SelectHTMLAttributes } from 'react';
import { stylesFilter } from '../../../helpers/styles.helper';
import styles from './AppSelect.module.scss';

type TOptionType = {
  option: string;
  special?: string;
};
interface AppSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: TOptionType[];
}

const AppSelect: FC<AppSelectProps> = ({ className, options, ...props }) => {
  const selectStyles = stylesFilter([styles.appselect, className]);

  return (
    <select className={selectStyles} {...props}>
      {options.map((opt) => (
        <option
          value={opt.special ? opt.special : ''}
          key={opt.special ? opt.special : opt.option}
        >
          {opt.option}
        </option>
      ))}
    </select>
  );
};

export default AppSelect;
