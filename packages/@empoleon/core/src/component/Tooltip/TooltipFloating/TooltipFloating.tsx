import { createMemo, createSignal, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { useMergedRef } from '@empoleon/hooks';
import {
  Box,
  createVarsResolver,
  factory,
  Factory,
  getDefaultZIndex,
  getRadius,
  getRefProp,
  getStyleObject,
  getThemeColor,
  isElement,
  StylesApiProps,
  useEmpoleonTheme,
  useProps,
  useStyles,
} from '../../../core';
import { OptionalPortal } from '../../Portal';
import { TooltipBaseProps, TooltipCssVariables, TooltipStylesNames } from '../Tooltip.types';
import { useFloatingTooltip } from './use-floating-tooltip';
import classes from '../Tooltip.module.css';

export interface TooltipFloatingProps
  extends Omit<TooltipBaseProps, 'styles' | 'classNames' | 'vars' | 'unstyled'>,
    StylesApiProps<TooltipFloatingFactory> {
  /** Offset from mouse in px, `10` by default */
  offset?: number;
  /** Uncontrolled tooltip initial opened state */
  defaultOpened?: boolean;
}

export type TooltipFloatingFactory = Factory<{
  props: TooltipFloatingProps;
  ref: HTMLDivElement;
  stylesNames: TooltipStylesNames;
  vars: TooltipCssVariables;
}>;

const defaultProps: Partial<TooltipFloatingProps> = {
  refProp: 'ref',
  withinPortal: true,
  offset: 10,
  defaultOpened: false,
  position: 'right',
  zIndex: getDefaultZIndex('popover'),
};

const varsResolver = createVarsResolver<TooltipFloatingFactory>((theme, props) => ({
  tooltip: {
    '--tooltip-radius': props.radius === undefined ? undefined : getRadius(props.radius),
    '--tooltip-bg': props.color ? getThemeColor(props.color, theme) : undefined,
    '--tooltip-color': props.color ? 'var(--empoleon-color-white)' : undefined,
  },
}));

export const TooltipFloating = factory<TooltipFloatingFactory>((_props) => {
  const props = useProps('TooltipFloating', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'children',
    'refProp',
    'withinPortal',
    'style',
    'className',
    'classNames',
    'styles',
    'unstyled',
    'radius',
    'color',
    'label',
    'offset',
    'position',
    'multiline',
    'zIndex',
    'disabled',
    'defaultOpened',
    'variant',
    'vars',
    'portalProps',
    'ref',
  ]);

  const theme = useEmpoleonTheme();
  const getStyles = useStyles<TooltipFloatingFactory>({
    name: 'TooltipFloating',
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    rootSelector: 'tooltip',
    vars: local.vars,
    varsResolver,
  });

  const floating = useFloatingTooltip({
    offset: local.offset!,
    position: local.position!,
    defaultOpened: local.defaultOpened!,
  });

  if (!isElement(local.children)) {
    throw new Error(
      '[@empoleon/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported'
    );
  }

  const [wrapperElement, setWrapperElement] = createSignal<HTMLElement | null>(null);
  const childRef = typeof local.children === 'function' ? undefined : getRefProp(local.children);
  const targetRef = useMergedRef(setWrapperElement, floating.boundaryRef, childRef, local.ref);

  const componentType = createMemo(() => {
    const parent = wrapperElement()?.parentElement;
    return parent?.tagName.toLowerCase() === 'svg' ? 'g' : 'span';
  });

  const onMouseEnter = (event: MouseEvent) => {
    floating.handleMouseMove(event);
    floating.setOpened(true);
  };

  const onMouseLeave = (event: MouseEvent) => {
    floating.setOpened(false);
  };

  const coords = createMemo(() => ({
    top: `${(floating.y && Math.round(floating.y)) ?? ''}px`,
    left: `${(floating.x && Math.round(floating.x)) ?? ''}px`,
  }));

  return (
    <>
      <OptionalPortal {...local.portalProps} withinPortal={local.withinPortal}>
        <Box
          {...others}
          {...getStyles('tooltip', {
            style: {
              ...getStyleObject(local.style, theme),
              zIndex: local.zIndex as JSX.CSSProperties['z-index'],
              display: !local.disabled && floating.opened() ? 'block' : 'none',
              ...coords(),
            },
          })}
          variant={local.variant}
          ref={(el) => floating.floating(el)}
          mod={{ multiline: local.multiline }}
        >
          {local.label}
        </Box>
      </OptionalPortal>

      {typeof local.children === 'function' ? (
        local.children({
          [local.refProp!]: targetRef,
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave,
        })
      ) : (
        <Dynamic
          component={componentType()}
          ref={targetRef!}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {local.children}
        </Dynamic>
      )}
    </>
  );
});

TooltipFloating.classes = classes;
TooltipFloating.displayName = '@empoleon/core/TooltipFloating';
