import { JSX } from 'solid-js';

interface NativeScrollAreaProps {
  children: JSX.Element;
  style?: JSX.CSSProperties;
}

export function NativeScrollArea(props: NativeScrollAreaProps) {
  return <>{props.children}</>;
}
