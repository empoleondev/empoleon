import { createMemo, createSignal, JSX, splitProps } from 'solid-js';
import { Box } from '../../../core';
import { Transition, TransitionOverride } from '../../Transition';
import { useSliderContext } from '../Slider.context';

export interface ThumbProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, 'value'> {
  max: number;
  min: number;
  value: number;
  position: number;
  dragging: boolean;
  label: JSX.Element;
  onKeyDownCapture?: JSX.EventHandlerUnion<HTMLDivElement, KeyboardEvent>;
  onMouseDown?: JSX.EventHandlerUnion<HTMLDivElement, MouseEvent>;
  onTouchStart?: JSX.EventHandlerUnion<HTMLDivElement, TouchEvent>;
  labelTransitionProps: TransitionOverride | undefined;
  labelAlwaysOn: boolean | undefined;
  thumbLabel: string | undefined;
  showLabelOnHover: boolean | undefined;
  isHovered?: boolean;
  children?: JSX.Element;
  disabled: boolean | undefined;
  className?: string;
  style?: JSX.CSSProperties;
  ref?: any;
}

export function Thumb(props: ThumbProps) {
  const [local, _] = splitProps(props, [
    'max',
    'min',
    'value',
    'position',
    'label',
    'dragging',
    'onMouseDown',
    'onTouchStart',
    'onKeyDownCapture',
    'labelTransitionProps',
    'labelAlwaysOn',
    'thumbLabel',
    'onFocus',
    'onBlur',
    'showLabelOnHover',
    'isHovered',
    'children',
    'disabled',
    'ref'
   ]);

  const { getStyles } = useSliderContext();

  const [focused, setFocused] = createSignal(false);

  const isVisible = createMemo(() =>
    local.labelAlwaysOn || local.dragging || focused() || (local.showLabelOnHover && local.isHovered)
  );

  return (
    <Box<'div'>
      tabIndex={0}
      role="slider"
      aria-label={local.thumbLabel}
      aria-valuemax={local.max}
      aria-valuemin={local.min}
      aria-valuenow={local.value}
      ref={local.ref}
      __vars={{ '--slider-thumb-offset': `${local.position}%` }}
      {...getStyles('thumb', { focusable: true })}
      mod={{ dragging: local.dragging, disabled: local.disabled }}
      onFocus={(event) => {
        setFocused(true);
        typeof local.onFocus === 'function' && local.onFocus(event as any);
      }}
      onBlur={(event) => {
        setFocused(false);
        typeof local.onBlur === 'function' && local.onBlur(event as any);
      }}
      onTouchStart={local.onTouchStart}
      onMouseDown={local.onMouseDown}
      {...{ onKeyDownCapture: local.onKeyDownCapture }}
      onClick={(event) => event.stopPropagation()}
    >
      {local.children}
      <Transition
        mounted={local.label != null && !!isVisible()}
        transition="fade"
        duration={0}
        {...local.labelTransitionProps}
      >
        {(transitionStyles) => (
          <Box component='div' {...getStyles('label', { style: transitionStyles })}>{local.label}</Box>
        )}
      </Transition>
    </Box>
  );
}

Thumb.displayName = '@empoleon/core/SliderThumb';
