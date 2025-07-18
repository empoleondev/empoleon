import { Ref } from "@solid-primitives/refs";
import type { JSX } from "solid-js";

export function cloneElement<Props extends {}>(
  element: JSX.Element,
  props: { ref?: (el: Element | undefined) => void } & Props
): JSX.Element {
  return (
    <Ref ref={props.ref!}>
      {element}
    </Ref>
  );
}
