import { splitProps, JSX } from "solid-js";
import { useMergedRef } from "@empoleon/hooks";
import { Box, BoxProps } from "../../../core";
import { useScrollAreaContext } from "../ScrollArea.context";

export interface ScrollAreaViewportProps
  extends BoxProps,
    Omit<JSX.HTMLAttributes<HTMLDivElement>, "style"> {}

export function ScrollAreaViewport(props: ScrollAreaViewportProps) {
  const ctx = useScrollAreaContext();
  const [local, others] = splitProps(props, ["style", "children", "ref"]);

  return (
    <Box
      {...others}
      ref={useMergedRef(local.ref, ctx.onViewportChange)}
      style={{
        'overflow-x': ctx.scrollbarXEnabled ? "scroll" : "hidden",
        'overflow-y': ctx.scrollbarYEnabled ? "scroll" : "hidden",
        ...local.style,
      }}
    >
      <div {...ctx.getStyles("content")} ref={ctx.onContentChange}>
        {local.children}
      </div>
    </Box>
  );
}
