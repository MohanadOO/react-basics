import { ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import { CommonProps } from 'types';
import Label from 'components/input/Label';
import styles from './TextField.module.css';

export interface TextFieldProps extends CommonProps {
  value: string;
  label?: ReactNode;
  spellCheck?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  onChange: (value: string, e?: Event) => void;
}

export function TextField(props: TextFieldProps): ReactElement {
  const { value, label, spellCheck, readOnly, disabled, placeholder, className, style, onChange } =
    props;
  const handleChange = e => {
    onChange(e.target.value, e);
  };

  return (
    <div className={classNames(styles.textfield, className)}>
      {label && <Label>{label}</Label>}
      <input
        type="text"
        className={classNames(styles.input, className)}
        style={style}
        value={value}
        spellCheck={spellCheck}
        readOnly={readOnly}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
}

export default TextField;
