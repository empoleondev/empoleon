import { createEffect, createMemo, createSignal, For, JSX } from 'solid-js';
import { DemoAreaProps } from '../DemoArea';
import { DemoCode } from '../DemoCode';
import { DemoColumns } from '../DemoColumns';
import { DemoRoot } from '../DemoRoot';
import {
  ConfiguratorBooleanControl,
  ConfiguratorBooleanControlOptions,
  ConfiguratorColorControl,
  ConfiguratorColorControlOptions,
  ConfiguratorNumberControl,
  ConfiguratorNumberControlOptions,
  ConfiguratorSegmentedControl,
  ConfiguratorSegmentedControlOptions,
  ConfiguratorSelectControl,
  ConfiguratorSelectControlOptions,
  ConfiguratorSizeControl,
  ConfiguratorSizeControlOptions,
  ConfiguratorStringControl,
  ConfiguratorStringControlOptions,
} from './controls';
import { Code, getCodeArray } from './get-code-array';
import { Dynamic } from 'solid-js/web';

const ControlComponents = {
  boolean: ConfiguratorBooleanControl,
  segmented: ConfiguratorSegmentedControl,
  color: ConfiguratorColorControl,
  string: ConfiguratorStringControl,
  select: ConfiguratorSelectControl,
  size: ConfiguratorSizeControl,
  number: ConfiguratorNumberControl,
};

export type ConfiguratorControlOptions =
  | ConfiguratorBooleanControlOptions
  | ConfiguratorSegmentedControlOptions
  | ConfiguratorColorControlOptions
  | ConfiguratorStringControlOptions
  | ConfiguratorSelectControlOptions
  | ConfiguratorSizeControlOptions
  | ConfiguratorNumberControlOptions;

export interface ConfiguratorDemoProps extends DemoAreaProps {
  code: Code;
  controls: ConfiguratorControlOptions[];
  component: any;
}

export function ConfiguratorDemo(props: ConfiguratorDemoProps) {
  const initialState = props.controls.reduce<Record<string, any>>((acc, control) => {
    acc[control.prop] = control.initialValue;
    return acc;
  }, {});

  const [state, setState] = createSignal(initialState);

  const setStateField = (field: string, value: any) =>
    setState((current) => ({ ...current, [field]: value }));

  const code = createMemo(() => getCodeArray({ code: props.code, controls: props.controls, state: state() }));

  return (
    <DemoRoot>
      <DemoColumns
        controls={
          <For each={props.controls}>
            {(control) => {
              const ControlComponent = ControlComponents[control.type] as any;
              const { initialValue, libraryValue, ...rest } = control;
              return (
                <ControlComponent
                  value={state()[control.prop]}
                  onChange={(value: any) => setStateField(control.prop, value)}
                  {...rest}
                />
              );
            }}
          </For>
        }
        centered={props.centered}
        withPadding={props.withPadding}
        maxWidth={props.maxWidth}
        minHeight={props.minHeight}
        dimmed={props.dimmed}
        striped={props.striped}
        overflow={props.overflow}
        withGrid
      >
        <Dynamic component={props.component} {...state()} />
      </DemoColumns>
      <DemoCode code={code} />
    </DemoRoot>
  );
}
