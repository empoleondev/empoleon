import { Component, JSX, splitProps } from 'solid-js';

export interface StepperCompletedProps {
  /** Label content */
  children: JSX.Element;
}

export const StepperCompleted: Component<StepperCompletedProps> = (props) => {
  const [local] = splitProps(props, ['children']);

  return <div data-type="completed">{local.children}</div>;
};

(StepperCompleted as any).displayName = '@empoleon/core/StepperCompleted';
