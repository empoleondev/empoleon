import { JSX } from "solid-js";

interface NativeScrollAreaProps {
  children: JSX.Element;
}

export function NativeScrollArea({ children }: NativeScrollAreaProps) {
  return <>{children}</>;
}
