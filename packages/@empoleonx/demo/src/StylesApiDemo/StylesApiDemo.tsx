import { createSignal, JSX, mergeProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { Text, UnstyledButton } from '@empoleon/core';
import { DemoAreaProps } from '../DemoArea';
import { DemoCode } from '../DemoCode';
import { DemoColumns } from '../DemoColumns';
import { DemoRoot } from '../DemoRoot';
import classes from './StylesApiDemo.module.css';

export interface StylesApiDemoProps extends DemoAreaProps {
  data: { selectors: Record<string, string> };
  code: string;
  component: any;
}

function getCss(hovered: string | null) {
  return hovered
    ? `.${hovered} {\n  outline: 2px solid #fe0d45;\n  outline-offset: -2px; \n}\n`
    : '/*\n * Hover over selectors to apply outline styles\n *\n */';
}

export function StylesApiDemo(props: StylesApiDemoProps) {
  const [hovered, setHovered] = createSignal<string | null>(null);

  const selectors = Object.keys(props.data.selectors);
  const controls = selectors.map((selector) => (
    <UnstyledButton
      className={classes.selector}
      onMouseEnter={() => setHovered(selector)}
      onMouseLeave={() => setHovered(null)}
    >
      <Text mb={2}>{selector}</Text>
      <Text fz={11} c="dimmed">
        {props.data.selectors[selector]}
      </Text>
    </UnstyledButton>
  ));

  const classNamesProp = hovered ? ` classNames={{ ${hovered}: classes.${hovered} }}` : '';

  return (
    <>
      <style innerHTML={getCss(hovered())} />
      <DemoRoot>
        <DemoColumns
          withPadding={props.withPadding}
          maxWidth={props.maxWidth}
          centered={props.centered}
          controls={controls}
          dimmed={props.dimmed}
          striped={props.striped}
          title="Component Styles API"
          description="Hover over selectors to highlight corresponding elements"
        >
          <Dynamic
            component={props.component}
            classNames={selectors.reduce<Record<string, string>>((acc, item) => {
              acc[item] = item;
              return acc;
            }, {})}
          />
        </DemoColumns>

        <DemoCode
          code={[
            { fileName: 'Demo.module.css', language: 'scss', code: getCss(hovered()) },
            {
              fileName: 'Demo.tsx',
              language: 'tsx',
              code: props.code.replace('{{props}}', classNamesProp),
            },
          ]}
        />
      </DemoRoot>
    </>
  );
}
