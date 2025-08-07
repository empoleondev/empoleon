import { JSX } from "solid-js";

interface NativeScrollAreaProps {
  children: JSX.Element;
}

export function NativeScrollArea(props: NativeScrollAreaProps) {
  return <>{props.children}</>;
}
