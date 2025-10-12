import { createSignal, onMount, JSX, Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import { TransitionGroupContext } from "./TransitionGroupContext";

export interface TransitionGroupProps {
  component?: keyof JSX.IntrinsicElements | Component<any> | null;
  appear?: boolean;
  enter?: boolean;
  exit?: boolean;
  childFactory?: (child: any) => any;
  children?: JSX.Element;
  [key: string]: any;
}

export const TransitionGroup: Component<TransitionGroupProps> = (props) => {
  const [isMounting, setIsMounting] = createSignal(true);
  const ComponentToRender = props.component ?? "div";

  onMount(() => setTimeout(() => setIsMounting(false), 0));

  const contextValue = { get isMounting() { return isMounting(); } };

  const { component, appear, enter, exit, childFactory, children, ...otherProps } = props;

  return (
    <TransitionGroupContext.Provider value={contextValue}>
      {ComponentToRender === null ? (
        children
      ) : typeof ComponentToRender === "string" ? (
        <Dynamic component={ComponentToRender} {...otherProps}>
          {children}
        </Dynamic>
      ) : (
        <ComponentToRender {...otherProps}>{children}</ComponentToRender>
      )}
    </TransitionGroupContext.Provider>
  );
};
