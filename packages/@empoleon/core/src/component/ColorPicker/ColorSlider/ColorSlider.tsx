import { createEffect, createSignal, splitProps, JSX, Index } from 'solid-js';
import {
  clampUseMovePosition,
  useMergedRef,
  useMove,
  UseMovePosition,
} from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  EmpoleonSize,
  rem,
  StylesApiProps,
  useEmpoleonTheme,
  useProps,
  useStyles,
} from '../../../core';
import { useColorPickerContext } from '../ColorPicker.context';
import { Thumb } from '../Thumb/Thumb';
import classes from '../ColorPicker.module.css';

export type ColorSliderStylesNames = 'slider' | 'sliderOverlay' | 'thumb';

export interface __ColorSliderProps extends ElementProps<'div', 'onChange'> {
  value: number;
  onChange?: (value: number) => void;
  onChangeEnd?: (value: number) => void;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
  size?: EmpoleonSize | (string & {});
  focusable?: boolean;
}

export interface ColorSliderProps
  extends BoxProps,
    StylesApiProps<ColorSliderFactory>,
    __ColorSliderProps,
    ElementProps<'div', 'onChange'> {
  __staticSelector?: string;
  maxValue: number;
  overlays: JSX.CSSProperties[];
  round: boolean;
  thumbColor?: string;
}

export type ColorSliderFactory = Factory<{
  props: ColorSliderProps;
  ref: HTMLDivElement;
  stylesNames: ColorSliderStylesNames;
}>;

const defaultProps: Partial<ColorSliderProps> = {};

export const ColorSlider = factory<ColorSliderFactory>(_props => {
  const props = useProps('ColorSlider', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'onChange',
    'onChangeEnd',
    'maxValue',
    'round',
    'size',
    'focusable',
    'value',
    'overlays',
    'thumbColor',
    'onScrubStart',
    'onScrubEnd',
    '__staticSelector',
    'ref'
  ]);

  const size = local.size ?? 'md';
  const focusable = local.focusable ?? true;
  const thumbColor = () => local.thumbColor ?? 'transparent';
  const __staticSelector = local.__staticSelector ?? 'ColorPicker';

  const _getStyles = useStyles<ColorSliderFactory>({
    name: __staticSelector,
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
  });

  const ctxGetStyles = useColorPickerContext()?.getStyles;
  const getStyles = ctxGetStyles || _getStyles;

  const theme = useEmpoleonTheme();
  const [position, setPosition] = createSignal({ y: 0, x: local.value / local.maxValue });
  let positionRef: { x: number; y: number } = position();
  const getChangeValue = (val: number) => (local.round ? Math.round(val * local.maxValue) : val * local.maxValue);
  const { ref: sliderRef } = useMove(
    ({ x, y }: UseMovePosition) => {
      positionRef = { x, y };
      local.onChange?.(getChangeValue(x));
    },
    {
      onScrubEnd: () => {
        const { x } = positionRef;
        local.onChangeEnd?.(getChangeValue(x));
        local.onScrubEnd?.();
      },
      onScrubStart: local.onScrubStart,
    }
  );

  createEffect(() => {
    setPosition({ y: 0, x: local.value / local.maxValue });
  });

  const handleArrow = (event: KeyboardEvent, pos: UseMovePosition) => {
    event.preventDefault();
    const _position = clampUseMovePosition(pos);
    local.onChange?.(getChangeValue(_position.x));
    local.onChangeEnd?.(getChangeValue(_position.x));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight': {
        handleArrow(event, { x: position().x + 0.05, y: position().y });
        break;
      }

      case 'ArrowLeft': {
        handleArrow(event, { x: position().x - 0.05, y: position().y });
        break;
      }
    }
  };

  const layers = <Index each={local.overlays}>
    {(overlay) => (
      <div {...getStyles('sliderOverlay')} style={overlay()} />
    )}
  </Index>

  return (
    <Box
      {...others}
      ref={useMergedRef(sliderRef, local.ref)}
      {...getStyles('slider')}
      role="slider"
      aria-valuenow={local.value}
      aria-valuemax={local.maxValue}
      aria-valuemin={0}
      tabIndex={focusable ? 0 : -1}
      onKeyDown={handleKeyDown}
      data-focus-ring={theme.focusRing}
      __vars={{
        '--cp-thumb-size': `var(--cp-thumb-size-${size})`,
      }}
    >
      {layers}

      <Thumb
        position={position()}
        {...getStyles('thumb', { style: { top: rem(1), background: thumbColor() } })}
      />
    </Box>
  );
});

ColorSlider.displayName = '@empoleon/core/ColorSlider';
