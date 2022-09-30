import { Key, useState } from 'react';
import classNames from 'classnames';
import { CommonProps } from 'types';
import Radio from 'components/input/Radio';
import { cloneChildren, addClassNames } from 'components/utils';
import styles from './RadioGroup.module.css';

export interface RadioGroupProps extends CommonProps {
  name: string;
  items: any[];
  selectedKey?: Key;
  defaultSelectedKey?: Key;
  onSelect?: (key: Key) => void;
  layout?: 'vertical' | 'horizontal' | 'none';
}

export function RadioGroup(props: RadioGroupProps) {
  const {
    items = [],
    name,
    defaultSelectedKey,
    onSelect,
    layout = 'vertical',
    className,
    style,
    children,
  } = props;
  const [selectedKey, setSelectedKey] = useState(defaultSelectedKey);

  const handleChange = key => {
    setSelectedKey(key);
    if (onSelect) {
      onSelect(key);
    }
  };

  return (
    <div
      className={classNames(styles.group, className, {
        ...addClassNames(styles, { layout: { value: layout, map: ['horizontal', 'vertical'] } }),
      })}
      style={style}
    >
      {cloneChildren(
        typeof children === 'function' && items ? items.map(item => children(item)) : children,
        child => {
          const key = child.key ?? child.props.children;
          return {
            name,
            checked: selectedKey === key,
            onChange: key ? handleChange.bind(null, key) : undefined,
          };
        },
        [Radio],
      )}
    </div>
  );
}

export default RadioGroup;
