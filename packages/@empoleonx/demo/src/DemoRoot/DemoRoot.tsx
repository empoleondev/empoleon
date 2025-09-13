import cx from 'clsx';
import classes from './DemoRoot.module.css';
import { JSX, splitProps } from 'solid-js';

export interface DemoRootProps extends JSX.HTMLAttributes<HTMLDivElement> {}

export function DemoRoot(props: DemoRootProps) {
  const [local, others] = splitProps(props, ['class'])

  return <div class={cx(classes.root, local.class)} {...others} />;
}
