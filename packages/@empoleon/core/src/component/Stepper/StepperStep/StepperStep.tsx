import { createEffect, createMemo, createSignal, JSX, Match, onMount, splitProps, Switch } from 'solid-js';
import {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  getThemeColor,
  EmpoleonColor,
  useEmpoleonTheme,
  useProps,
} from '../../../core';
import { CheckIcon } from '../../Checkbox';
import { Loader } from '../../Loader';
import { Transition } from '../../Transition';
import { UnstyledButton } from '../../UnstyledButton';
import type { StepFragmentComponent } from '../Stepper';
import { useStepperContext } from '../Stepper.context';
import classes from '../Stepper.module.css';

const getStepFragment = (
  Fragment: StepFragmentComponent | JSX.Element,
  step: number | undefined
) => {
  if (typeof Fragment === 'function') {
    return <Fragment step={step || 0} />;
  }

  return Fragment;
};

export type StepperStepStylesNames =
  | 'step'
  | 'stepLoader'
  | 'verticalSeparator'
  | 'stepWrapper'
  | 'stepIcon'
  | 'stepCompletedIcon'
  | 'stepBody'
  | 'stepLabel'
  | 'stepDescription';

export interface StepperStepProps
  extends BoxProps,
    CompoundStylesApiProps<StepperStepFactory>,
    ElementProps<'button'> {
  /** Step index, controlled by Stepper component **/
  step?: number;

  /** Step state, controlled by Stepper component */
  state?: 'stepInactive' | 'stepProgress' | 'stepCompleted';

  /** Key of `theme.colors`, by default controlled by Stepper component */
  color?: EmpoleonColor;

  /** Determines whether the icon should be displayed */
  withIcon?: boolean;

  /** Step icon, defaults to step index + 1 when rendered within Stepper */
  icon?: JSX.Element | StepFragmentComponent;

  /** Step icon displayed when step is completed */
  completedIcon?: JSX.Element | StepFragmentComponent;

  /** Step icon displayed when step is in progress */
  progressIcon?: JSX.Element | StepFragmentComponent;

  /** Step label, render after icon */
  label?: JSX.Element | StepFragmentComponent;

  /** Step description */
  description?: JSX.Element | StepFragmentComponent;

  /** Icon wrapper size */
  iconSize?: string | number;

  /** Icon position relative to step body, controlled by Stepper component */
  iconPosition?: 'right' | 'left';

  /** Indicates loading state of the step */
  loading?: boolean;

  /** Set to false to disable clicks on step */
  allowStepClick?: boolean;

  /** Should step selection be allowed */
  allowStepSelect?: boolean;

  /** Static selector base */
  __staticSelector?: string;

  /** Component orientation */
  orientation?: 'vertical' | 'horizontal';
}

export type StepperStepFactory = Factory<{
  props: StepperStepProps;
  ref: HTMLButtonElement;
  stylesNames: StepperStepStylesNames;
  compound: true;
}>;

const defaultProps = {
  withIcon: true,
  allowStepClick: true,
  iconPosition: 'left',
} satisfies Partial<StepperStepProps>;

export const StepperStep = factory<StepperStepFactory>(_props => {
  const props = useProps('StepperStep', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'step',
    'state',
    'color',
    'icon',
    'completedIcon',
    'progressIcon',
    'label',
    'description',
    'withIcon',
    'iconSize',
    'loading',
    'allowStepClick',
    'allowStepSelect',
    'iconPosition',
    'orientation',
    'mod',
    'ref'
  ]);

  const ctx = useStepperContext();
  const theme = useEmpoleonTheme();

  const stylesApi = { classNames: local.classNames, styles: local.styles };

  const [idx, setIdx] = createSignal<number>(-1);
  const [mounted, setMounted] = createSignal(false);
  onMount(() => {
    setIdx(ctx.registerStep());
    ctx.registerStepContent?.(idx(), <>{props.children}</>);
    setMounted(true);
  });

  const state = createMemo<'stepInactive' | 'stepProgress' | 'stepCompleted'>(() => {
    const active = ctx.activeIndex();
    if (active === idx()) return 'stepProgress';
    if (active > idx()) return 'stepCompleted';
    return 'stepInactive';
  });

  const dataAttributes = createMemo(() => ({
    'data-progress': state() === 'stepProgress' || undefined,
    'data-completed': state() === 'stepCompleted' || undefined,
  }));

  const shouldAllowSelect = createMemo<boolean>(() => {
    if (typeof ctx.onStepClick !== 'function') return false;
    if (typeof local.allowStepSelect === 'boolean') {
      return local.allowStepSelect;
    }
    return state() === 'stepCompleted' || ctx.allowNextStepsSelect();
  });

  const _icon = createMemo<JSX.Element | string>(() => {
    const currentState = state();

    if (currentState === 'stepProgress') {
      if (local.progressIcon) {
        return getStepFragment(local.progressIcon, idx());
      }
      if (ctx.progressIcon) {
        return getStepFragment(ctx.progressIcon as any, idx());
      }
      return (idx() + 1).toString();
    }

    if (currentState === 'stepCompleted') {
      return undefined as any;
    }

    if (local.icon) {
      return getStepFragment(local.icon, idx());
    }
    if (ctx.icon) {
      return getStepFragment(ctx.icon as any, idx());
    }
    return (idx() + 1).toString();
  });

  const isLoading = createMemo(() => !!local.loading);

  return (
    <UnstyledButton
      {...ctx.getStyles('step', {
        className: local.className,
        style: local.style,
        variant: ctx.orientation,
        ...stylesApi
      })}
      mod={[
        { 'icon-position': local.iconPosition || ctx.iconPosition, 'allow-click': local.allowStepClick, 'type': 'step' },
        local.mod,
      ]}
      ref={local.ref}
      {...dataAttributes()}
      {...others}
      onClick={() => {
        if (shouldAllowSelect()) {
          ctx.onStepClick?.(idx());
        }
      }}
      __vars={{
        '--step-color': local.color
          ? getThemeColor(local.color, theme)
          : ctx.color
          ? getThemeColor(ctx.color, theme)
          : undefined,
      }}
      tabIndex={local.allowStepClick ? 0 : -1}
    >
      {local.withIcon && (
        <span {...ctx.getStyles('stepWrapper', stylesApi)}>
          <span {...ctx.getStyles('stepIcon', stylesApi)} {...dataAttributes()}>
            <Transition mounted={mounted() && state() === 'stepCompleted'} transition="pop" duration={200}>
              {(transitionStyles) => (
                <span
                  {...ctx.getStyles('stepCompletedIcon', { style: transitionStyles, ...stylesApi })}
                >
                  {isLoading() ? (
                    <Loader
                      color="var(--empoleon-color-white)"
                      size="calc(var(--stepper-icon-size) / 2)"
                      {...ctx.getStyles('stepLoader', stylesApi)}
                    />
                  ) : (
                    local.completedIcon
                      ? getStepFragment(local.completedIcon, idx())
                      : ctx.completedIcon
                      ? getStepFragment(ctx.completedIcon as any, idx())
                      : <CheckIcon size="60%" />
                  )}
                </span>
              )}
            </Transition>

            {state() !== 'stepCompleted' ? (
              isLoading() ? (
                <Loader
                  {...ctx.getStyles('stepLoader', stylesApi)}
                  size="calc(var(--stepper-icon-size) / 2)"
                  color={local.color ?? ctx.color}
                />
              ) : (
                _icon()
              )
            ) : null}
          </span>
          {ctx.orientation === 'vertical' && (
            <span
              {...ctx.getStyles('verticalSeparator', stylesApi)}
              data-active={state() === 'stepCompleted' || undefined}
            />
          )}
        </span>
      )}

      {(local.label || local.description) && (
        <span
          {...ctx.getStyles('stepBody', stylesApi)}
          data-orientation={ctx.orientation}
          data-icon-position={local.iconPosition || ctx.iconPosition}
        >
          {local.label && (
            <span {...ctx.getStyles('stepLabel', stylesApi)}>{getStepFragment(local.label, idx())}</span>
          )}
          {local.description && (
            <span {...ctx.getStyles('stepDescription', stylesApi)}>
              {getStepFragment(local.description, idx())}
            </span>
          )}
        </span>
      )}
    </UnstyledButton>
  );
});

StepperStep.classes = classes;
StepperStep.displayName = '@empoleon/core/StepperStep';
