import { Component, Match, Switch } from 'solid-js';
import { CodeDemo, CodeDemoProps } from '../CodeDemo/CodeDemo';
import { ConfiguratorDemo, ConfiguratorDemoProps } from '../ConfiguratorDemo/ConfiguratorDemo';
import { StylesApiDemo, StylesApiDemoProps } from '../StylesApiDemo/StylesApiDemo';

interface DemoComponent {
  component: Component<any>;
}

export type EmpoleonDemo =
  | ({ type: 'code' } & DemoComponent & CodeDemoProps)
  | ({ type: 'configurator' } & DemoComponent & ConfiguratorDemoProps)
  | ({ type: 'styles-api' } & DemoComponent & StylesApiDemoProps);

interface DemoProps {
  data: EmpoleonDemo;
  demoProps?: {
    defaultExpanded?: boolean;
    maxCollapsedHeight?: number;
  };
}

export function Demo(props: DemoProps) {
  return (
    <Switch>
      <Match when={props.data.type === 'code'}>
        <CodeDemo {...(props.data as any)} {...props.demoProps}>
          <props.data.component />
        </CodeDemo>
      </Match>
      <Match when={props.data.type === 'configurator'}>
        <ConfiguratorDemo {...(props.data as any)} {...props.demoProps}>
          <props.data.component />
        </ConfiguratorDemo>
      </Match>
      <Match when={props.data.type === 'styles-api'}>
        <StylesApiDemo {...(props.data as any)} {...props.demoProps}>
          <props.data.component />
        </StylesApiDemo>
      </Match>
    </Switch>
  );
}
