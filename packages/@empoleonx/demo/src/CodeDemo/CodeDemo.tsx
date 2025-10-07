import { mergeProps } from 'solid-js';
import { DemoArea, DemoAreaProps } from '../DemoArea';
import { DemoCode, DemoCodeProps } from '../DemoCode';
import { DemoRoot } from '../DemoRoot';

export interface CodeDemoProps extends DemoCodeProps, DemoAreaProps {}

export function CodeDemo(props: CodeDemoProps) {
  const mergedProps = mergeProps({
    ...props,
    defaultExpanded: true,
  });

  return (
    <DemoRoot>
      <DemoArea
        withPadding={mergedProps.withPadding}
        centered={mergedProps.centered}
        maxWidth={mergedProps.maxWidth}
        minHeight={mergedProps.minHeight}
        dimmed={mergedProps.dimmed}
        striped={mergedProps.striped}
        overflow={mergedProps.overflow}
      >
        {mergedProps.children}
      </DemoArea>
      <DemoCode
        code={mergedProps.code}
        defaultExpanded={mergedProps.defaultExpanded}
        maxCollapsedHeight={mergedProps.maxCollapsedHeight}
      />
    </DemoRoot>
  );
}
