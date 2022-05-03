import classNames from 'classnames';
import { CommonProps } from 'types';
import styles from './Spinner.module.css';

export interface SpinnerProps extends CommonProps {
  size?: number;
  variant?: string;
}

export function Spinner(props: SpinnerProps) {
  const { size = 64, className, style } = props;
  return (
    <div
      className={classNames(styles.spinner, className)}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...style,
      }}
    >
      <svg className={styles.track} viewBox="25 25 50 50">
        <circle className={styles.track} cx="50" cy="50" r="20" />
        <circle className={styles.fill} cx="50" cy="50" r="20" />
      </svg>
    </div>
  );
}