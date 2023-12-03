import { useState, useEffect } from 'react';
import classNames from 'classnames';
import TextField, { TextFieldProps } from 'components/input/TextField';
import Icon from 'components/common/Icon';
import useDebounce from 'components/hooks/useDebounce';
import Icons from 'components/icons';
import styles from './SearchField.module.css';

export interface SearchProps extends TextFieldProps {
  delay?: number;
}

export function SearchField(props: SearchProps) {
  const { delay = 0, value, onChange, ...fieldProps } = props;
  const [search, setSearch] = useState(value);
  const searchValue = useDebounce(search, delay);

  const handleChange = e => {
    const { value } = e.target;

    setSearch(value);

    if (delay === 0 || value === '') {
      onChange?.(value);
    }
  };

  const resetSearch = () => {
    setSearch('');
    onChange?.('' as any);
  };

  useEffect(() => {
    if (delay > 0) {
      onChange?.(searchValue);
    }
  }, [searchValue]);

  return (
    <TextField {...fieldProps} value={search} onChange={handleChange}>
      <Icon size="sm" className={classNames(styles.icon, styles.magnifier)}>
        <Icons.Search />
      </Icon>
      <Icon
        size="sm"
        className={classNames(styles.icon, styles.close, { [styles.visible]: search })}
        onClick={resetSearch}
      >
        <Icons.Close />
      </Icon>
    </TextField>
  );
}

export default SearchField;
