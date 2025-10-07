import cx from 'clsx';
import { JSX, splitProps } from 'solid-js';
import classes from './DemoRoot.module.css';

export interface DemoRootProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function DemoRoot(props: DemoRootProps) {
  const [local, others] = splitProps(props, ['class']);

  return <div class={cx(classes.root, local.class)} {...others} />;
}
