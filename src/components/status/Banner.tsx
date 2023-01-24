import classNames from 'classnames';
import { CommonProps } from 'components/types';
// eslint-disable-next-line css-modules/no-unused-class
import styles from './Banner.module.css';

export interface BannerProps extends CommonProps {
  variant?: 'success' | 'warning' | 'error' | 'none';
  outline?: boolean;
}

export function Banner(props: BannerProps) {
  const { variant = 'none', outline, children, className, ...domProps } = props;

  return (
    <div
      {...domProps}
      className={classNames(styles.banner, className, styles[variant], {
        [styles.outline]: outline,
      })}
    >
      {children}
    </div>
  );
}

export default Banner;
