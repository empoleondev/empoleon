import { children, Component, createMemo, createSignal, JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getAutoContrastValue,
  getContrastColor,
  getFontSize,
  getRadius,
  getSize,
  getSpacing,
  getThemeColor,
  EmpoleonColor,
  EmpoleonRadius,
  EmpoleonSize,
  EmpoleonSpacing,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { StepperProvider, useStepperContext } from './Stepper.context';
import { StepperCompleted } from './StepperCompleted/StepperCompleted';
import { StepperStep } from './StepperStep/StepperStep';
import classes from './Stepper.module.css';

export type StepFragmentComponent = Component<{ step: number }>;

export type StepperStylesNames =
  | 'root'
  | 'separator'
  | 'steps'
  | 'content'
  | 'step'
  | 'stepLoader'
  | 'verticalSeparator'
  | 'stepWrapper'
  | 'stepIcon'
  | 'stepCompletedIcon'
  | 'stepBody'
  | 'stepLabel'
  | 'stepDescription';

export type StepperCssVariables = {
  root:
    | '--stepper-color'
    | '--stepper-icon-color'
    | '--stepper-icon-size'
    | '--stepper-content-padding'
    | '--stepper-radius'
    | '--stepper-fz'
    | '--stepper-spacing';
};

export interface StepperProps
  extends BoxProps,
    StylesApiProps<StepperFactory>,
    ElementProps<'div'> {
  /** <Stepper.Step /> components */
  children: JSX.Element;

  /** Called when step is clicked */
  onStepClick?: (stepIndex: number) => void;

  /** Index of the active step */
  active: number;

  /** Step icon, default value is step index + 1 */
  icon?: JSX.Element | StepFragmentComponent;

  /** Step icon displayed when step is completed, check icon by default */
  completedIcon?: JSX.Element | StepFragmentComponent;

  /** Step icon displayed when step is in progress, default value is step index + 1 */
  progressIcon?: JSX.Element | StepFragmentComponent;

  /** Key of `theme.colors` or any valid CSS color, controls colors of active and progress steps, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Controls size of the step icon, by default icon size is inferred from `size` prop */
  iconSize?: number | string;

  /** Key of `theme.spacing` or any valid CSS value to set `padding-top` of the content */
  contentPadding?: EmpoleonSpacing;

  /** Stepper orientation, `'horizontal'` by default */
  orientation?: 'vertical' | 'horizontal';

  /** Icon position relative to the step body, `'left'` by default */
  iconPosition?: 'right' | 'left';

  /** Controls size of various Stepper elements */
  size?: EmpoleonSize;

  /** Key of `theme.radius` or any valid CSS value to set steps border-radius, `"xl"` by default */
  radius?: EmpoleonRadius;

  /** Determines whether next steps can be selected, `true` by default **/
  allowNextStepsSelect?: boolean;

  /** Determines whether steps should wrap to the next line if no space is available, `true` by default */
  wrap?: boolean;

  /** Determines whether icon color with filled variant should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;
}

export type StepperFactory = Factory<{
  props: StepperProps;
  ref: HTMLDivElement;
  stylesNames: StepperStylesNames;
  vars: StepperCssVariables;
  staticComponents: {
    Step: typeof StepperStep;
    Completed: typeof StepperCompleted;
  };
}>;

const defaultProps = {
  orientation: 'horizontal',
  iconPosition: 'left',
  allowNextStepsSelect: true,
  wrap: true,
} satisfies Partial<StepperProps>;

const varsResolver = createVarsResolver<StepperFactory>(
  (theme, { color, iconSize, size, contentPadding, radius, autoContrast }) => ({
    root: {
      '--stepper-color': color ? getThemeColor(color, theme) : undefined,
      '--stepper-icon-color': getAutoContrastValue(autoContrast, theme)
        ? getContrastColor({ color, theme, autoContrast })
        : undefined,
      '--stepper-icon-size':
        iconSize === undefined ? getSize(size, 'stepper-icon-size') : rem(iconSize),
      '--stepper-content-padding': getSpacing(contentPadding),
      '--stepper-radius': radius === undefined ? undefined : getRadius(radius),
      '--stepper-fz': getFontSize(size),
      '--stepper-spacing': getSpacing(size),
    },
  })
);

export const Stepper = factory<StepperFactory>(_props => {
  const props = useProps('Stepper', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'children',
    'onStepClick',
    'active',
    'icon',
    'completedIcon',
    'progressIcon',
    'color',
    'iconSize',
    'contentPadding',
    'orientation',
    'iconPosition',
    'size',
    'radius',
    'allowNextStepsSelect',
    'wrap',
    'autoContrast',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<StepperFactory>({
    name: 'Stepper',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  const [count, setCount] = createSignal(0);

  const registerStep = () => {
    const idx = count();
    setCount(idx + 1);
    return idx;
  };

  const [stepContents, setStepContents] = createSignal<JSX.Element[]>([]);

  const registerStepContent = (idx: number, content: JSX.Element) => {
    setStepContents(prev => {
      const arr = [...prev];
      arr[idx] = content;
      return arr;
    });
  };

  return (
    <StepperProvider value={{
      getStyles,
      orientation: local.orientation,
      iconPosition: local.iconPosition,
      registerStep,
      activeIndex: () => local.active,
      onStepClick: local.onStepClick,
      allowNextStepsSelect: () => !!local.allowNextStepsSelect,
      icon: local.icon,
      completedIcon: local.completedIcon,
      progressIcon: local.progressIcon,
      color: local.color,
      iconSize: local.iconSize,
      wrap: () => !!local.wrap,
      stepChildren: stepContents,
      registerStepContent,
    }}>
      <Box {...getStyles('root')} ref={local.ref} size={local.size} {...others}>
        <Box
          {...getStyles('steps')}
          mod={{
            orientation: local.orientation,
            'icon-position': local.iconPosition,
            wrap: local.wrap && local.orientation !== 'vertical',
          }}
        >
          <StepNodes {...getStyles('separator') as any} active={local.active} orientation={local.orientation} children={local.children} getStyles={getStyles} />
        </Box>
        <CompletedNode {...getStyles('content') as any} active={local.active} children={local.children} />
      </Box>
    </StepperProvider>
  );
});

interface StepNodeProps {
  active: number;
  orientation?: 'vertical' | 'horizontal';
  children: JSX.Element;
  className: string;
  style: JSX.CSSProperties;
  getStyles: any;
}

function StepNodes(props: StepNodeProps) {
  const steps = createMemo(() => {
    const _children = children(() => props.children)
      .toArray()
      .filter((item) => {
        if (!item) return false;

        // Check both JSX props and DOM dataset for type
        const itemType = (item as any).props?.['data-type'] || (item as any).dataset?.type;
        if (itemType === 'completed') return false;

        // Check class names for separator components
        const className = (item as any).className || (item as any).props?.className || '';
        if (className.includes('separator')) return false;

        return true;
      });

    const acc: any[] = [];

    _children.forEach((step, index) => {
      acc.push(step);

      if (props.orientation === 'horizontal' && index !== _children.length - 1) {
        acc.push(
          <div
            style={props.style}
            class={props.className}
            data-active={index < props.active || undefined}
            data-orientation={props.orientation}
          />
        );
      }
    });

    return acc;
  });

  return steps()
}

interface CompletedProps {
  active: number;
  children: JSX.Element;
  className: string;
  style: JSX.CSSProperties;
}

function CompletedNode(props: CompletedProps) {
  const ctx = useStepperContext();
  const steps = createMemo(() => children(() => props.children).toArray().filter((item) => item !== undefined && (item as any).dataset?.type === "step"));
  const completed = createMemo(() => children(() => props.children).toArray().filter((item) => item !== undefined && (item as any).dataset?.type === "completed"));

  const lastIndex = createMemo(() => steps().length - 1);
  const stepContentsSignal = ctx.stepChildren ?? (() => []);

  const completedContent = createMemo(() => {
    const completedItems = completed();
    if (completedItems.length === 0) return null;

    const item = completedItems[0] as any;

    if (item.children !== undefined && typeof item.children !== 'object') {
      return <>{item.children}</>;
    }

    if (item.childNodes != null && item.childNodes.length > 0) {
      const clones: Node[] = Array.from(item.childNodes).map((node: any) =>
        node.cloneNode(true)
      );
      return <>{clones}</>;
    }

    if (typeof item.innerHTML === "string") {
      return <>{item.innerHTML}</>;
    }

    return <>{item}</>;
  });

  const content = createMemo<JSX.Element | null>(() => {
    const current = props.active;
    if (current > lastIndex()) {
      return completedContent();
    } else {
      return stepContentsSignal()[current] ?? null;
    }
  });

  return <div style={props.style} class={props.className}>{content()}</div>
}

Stepper.classes = classes;
Stepper.displayName = '@empoleon/core/Stepper';
Stepper.Completed = StepperCompleted;
Stepper.Step = StepperStep;
