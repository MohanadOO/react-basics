import {
  Children,
  cloneElement,
  FC,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

export function getFragmentChildren(children: ReactNode) {
  return (children as ReactElement)?.type === Fragment
    ? (children as ReactElement).props.children
    : children;
}

export function isValidChild(child: ReactElement, types: FC | FC[]) {
  if (!isValidElement(child)) {
    return false;
  }
  return (Array.isArray(types) ? types : [types]).find(type => type === child.type);
}

export function mapChildren(
  children: ReactNode,
  handler: (child: ReactElement, index: number) => any,
) {
  return Children.map(getFragmentChildren(children) as ReactElement[], (child, index) => {
    if (!child?.props) {
      return null;
    }
    return handler(child, index);
  });
}

export function cloneChildren(
  children: ReactNode,
  handler: (child: ReactElement, index: number) => any,
  options?: { validChildren?: any[]; onlyRenderValid?: boolean },
): ReactNode {
  if (!children) {
    return null;
  }

  const { validChildren, onlyRenderValid = false } = options || {};

  return mapChildren(children, (child, index) => {
    const invalid = validChildren && !isValidChild(child as ReactElement, validChildren);

    if (onlyRenderValid && invalid) {
      return null;
    }

    if (!invalid && isValidElement(child)) {
      return cloneElement(child, handler(child, index));
    }

    return child;
  });
}

export function renderChildren(
  children: ReactNode | ((item: any, index: number, array: any) => ReactNode),
  items: any[],
  handler: (child: ReactElement, index: number) => object | undefined,
  options?: { validChildren?: any[]; onlyRenderValid?: boolean },
): ReactNode {
  if (typeof children === 'function' && items) {
    return cloneChildren(items.map(children), handler, options);
  }

  return cloneChildren(getFragmentChildren(children as ReactNode), handler, options);
}

export function countChildren(children: ReactNode): number {
  return Children.count(getFragmentChildren(children));
}

export function ensureArray(arr?: any): any[] {
  if (arr === undefined || arr === null) return [];
  if (Array.isArray(arr)) return arr;
  return [arr];
}

export function filterDOMProps(props: { [key: string]: any }) {
  const filteredProps = {};

  for (const prop in props) {
    if (Object.prototype.hasOwnProperty.call(props, prop) && /^(data-.*|aria-.*)$/.test(prop)) {
      filteredProps[prop] = props[prop];
    }
  }

  return filteredProps;
}

export function chunkArray(arr: any[], size: number) {
  const chunks: any[] = [];

  let index = 0;
  while (index < arr.length) {
    chunks.push(arr.slice(index, size + index));
    index += size;
  }

  return chunks;
}

export function getRandomChars(
  n,
  chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
) {
  const arr = chars.split('');
  let s = '';
  for (let i = 0; i < n; i++) {
    s += arr[Math.floor(Math.random() * arr.length)];
  }
  return s;
}
