import { useState } from 'react';
import classNames from 'classnames';
import Button from './Button';
import styles from './ButtonGroup.module.css';
import { CommonProps, ListItem } from 'types';

export interface ButtonGroupProps extends CommonProps {
  items: ListItem[];
  selected?: string[];
  onClick: (value: string) => void;
  multiSelect?: boolean;
}

export function ButtonGroup(props: ButtonGroupProps) {
  const { items = [], selected = [], multiSelect = false, className, style, onClick } = props;
  const [selectedItems, setSelectedItems] = useState(selected);

  const handleClick = value => {
    if (multiSelect) {
      setSelectedItems(state =>
        state.includes(value) ? state.filter(n => n !== value) : state.concat(value),
      );
    } else {
      setSelectedItems([value]);
    }
    onClick(value);
  };

  return (
    <div className={classNames(styles.group, className)} style={style}>
      {items.map(item => {
        const { label, value } = item;
        return (
          <Button
            key={value}
            className={classNames(styles.button, {
              [styles.selected]: selectedItems.includes(value),
            })}
            onClick={handleClick.bind(null, value)}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}

export default ButtonGroup;
