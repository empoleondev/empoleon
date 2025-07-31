import { createEffect, createMemo, createSignal, JSX, splitProps } from 'solid-js';
import { clamp, useMergedRef, useMove, useUncontrolled } from '@empoleon/hooks';
import {
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  findClosestNumber,
  getRadius,
  getSize,
  getThemeColor,
  EmpoleonColor,
  EmpoleonRadius,
  EmpoleonSize,
  rem,
  StylesApiProps,
  useDirection,
  useProps,
  useStyles,
} from '../../../core';
import { TransitionOverride } from '../../Transition';
import { SliderCssVariables, SliderProvider, SliderStylesNames } from '../Slider.context';
import { SliderRoot } from '../SliderRoot/SliderRoot';
import { Thumb } from '../Thumb/Thumb';
import { Track } from '../Track/Track';
import { getChangeValue } from '../utils/get-change-value/get-change-value';
import { getFloatingValue } from '../utils/get-floating-value/get-gloating-value';
import { getPosition } from '../utils/get-position/get-position';
import { getPrecision } from '../utils/get-precision/get-precision';
import {
  getFirstMarkValue,
  getLastMarkValue,
  getNextMarkValue,
  getPreviousMarkValue,
} from '../utils/get-step-mark-value/get-step-mark-value';
import classes from '../Slider.module.css';

export interface SliderProps
  extends BoxProps,
    StylesApiProps<SliderFactory>,
    ElementProps<'div', 'onChange'> {
  /** Key of `theme.colors` or any valid CSS color, controls color of track and thumb, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem, `'xl'` by default */
  radius?: EmpoleonRadius;

  /** Controls size of the track, `'md'` by default */
  size?: EmpoleonSize | (string & {}) | number;

  /** Minimal possible value, `0` by default */
  min?: number;

  /** Maximum possible value, `100` by default */
  max?: number;

  /** Number by which value will be incremented/decremented with thumb drag and arrows, `1` by default */
  step?: number;

  /** Number of significant digits after the decimal point */
  precision?: number;

  /** Controlled component value */
  value?: number;

  /** Uncontrolled component default value */
  defaultValue?: number;

  /** Called when value changes */
  onChange?: (value: number) => void;

  /** Called when user stops dragging slider or changes value with arrows */
  onChangeEnd?: (value: number) => void;

  /** Hidden input name, use with uncontrolled component */
  name?: string;

  /** Marks displayed on the track */
  marks?: { value: number; label?: JSX.Element }[];

  /** Function to generate label or any react node to render instead, set to null to disable label */
  label?: JSX.Element | ((value: number) => JSX.Element);

  /** Props passed down to the `Transition` component, `{ transition: 'fade', duration: 0 }` by default */
  labelTransitionProps?: TransitionOverride;

  /** Determines whether the label should be visible when the slider is not being dragged or hovered, `false` by default */
  labelAlwaysOn?: boolean;

  /** Thumb `aria-label` */
  thumbLabel?: string;

  /** Determines whether the label should be displayed when the slider is hovered, `true` by default */
  showLabelOnHover?: boolean;

  /** Content rendered inside thumb */
  thumbChildren?: JSX.Element;

  /** Disables slider */
  disabled?: boolean;

  /** Thumb `width` and `height`, by default value is computed based on `size` prop */
  thumbSize?: number | string;

  /** A transformation function to change the scale of the slider */
  scale?: (value: number) => number;

  /** Determines whether track value representation should be inverted, `false` by default */
  inverted?: boolean;

  /** Props passed down to the hidden input */
  hiddenInputProps?: JSX.HTMLAttributes<HTMLInputElement>;

  /** Determines whether the selection should be only allowed from the given marks array, `false` by default */
  restrictToMarks?: boolean;

  /** Props passed down to thumb element */
  thumbProps?: JSX.HTMLAttributes<HTMLDivElement>;
}

export type SliderFactory = Factory<{
  props: SliderProps;
  ref: HTMLDivElement;
  stylesNames: SliderStylesNames;
  vars: SliderCssVariables;
}>;

const defaultProps: Partial<SliderProps> = {
  radius: 'xl',
  min: 0,
  max: 100,
  step: 1,
  marks: [],
  label: (f) => f,
  labelTransitionProps: { transition: 'fade', duration: 0 },
  labelAlwaysOn: false,
  thumbLabel: '',
  showLabelOnHover: true,
  disabled: false,
  scale: (v) => v,
};

const varsResolver = createVarsResolver<SliderFactory>(
  (theme, { size, color, thumbSize, radius }) => ({
    root: {
      '--slider-size': getSize(size, 'slider-size'),
      '--slider-color': color ? getThemeColor(color, theme) : undefined,
      '--slider-radius': radius === undefined ? undefined : getRadius(radius),
      '--slider-thumb-size':
        thumbSize !== undefined ? rem(thumbSize) : 'calc(var(--slider-size) * 2)',
    },
  })
);

export const Slider = factory<SliderFactory>(_props => {
  const props = useProps('Slider', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'styles',
    'value',
    'onChange',
    'onChangeEnd',
    'size',
    'min',
    'max',
    'step',
    'precision',
    'defaultValue',
    'name',
    'marks',
    'label',
    'labelTransitionProps',
    'labelAlwaysOn',
    'thumbLabel',
    'showLabelOnHover',
    'thumbChildren',
    'disabled',
    'unstyled',
    'scale',
    'inverted',
    'className',
    'style',
    'vars',
    'hiddenInputProps',
    'restrictToMarks',
    'thumbProps',
    'ref'
   ]);

   const { style: thumbStyle, ...restThumbProps } = local.thumbProps || {};

  const getStyles = useStyles<SliderFactory>({
    name: 'Slider',
    props,
    classes,
    classNames: local.classNames,
    className: local.className,
    styles: local.styles,
    style: local.style,
    vars: local.vars,
    varsResolver,
    unstyled: local.unstyled,
  });

  const { dir } = useDirection();
  const [hovered, setHovered] = createSignal(false);
  const [_value, setValue] = useUncontrolled({
    value: () => typeof local.value === 'number' ? clamp(local.value, local.min!, local.max!) : local.value,
    defaultValue: typeof local.defaultValue === 'number' ? clamp(local.defaultValue, local.min!, local.max!) : local.defaultValue!,
    finalValue: clamp(0, local.min!, local.max!),
    onChange: local.onChange,
  });

  let valueRef = _value();

  createEffect(() => {
    valueRef = _value();
  });

  const root = null as HTMLDivElement | null;
  const thumb = null as HTMLDivElement | null;
  const position = createMemo(() => {
  const pos = getPosition({ value: _value(), min: local.min!, max: local.max! });
  return pos;
});
  const scaledValue = createMemo(() => local.scale!(_value()));
  const _label = createMemo(() => typeof local.label === 'function' ? local.label(scaledValue()) : local.label);
  const precision = local.precision ?? getPrecision(local.step!);

  const handleChange = ({ x }: { x: number }) => {
    if (!local.disabled) {
      const nextValue = getChangeValue({
        value: x,
        min: local.min!,
        max: local.max!,
        step: local.step!,
        precision,
      });
      const finalValue = local.restrictToMarks && local.marks?.length
      ? findClosestNumber(
          nextValue,
          local.marks.map((mark: any) => mark.value)
        )
      : nextValue;
      setValue(finalValue);
      valueRef = nextValue;

      local.onChange?.(finalValue);
    }
  };

  const handleScrubEnd = () => {
    if (!local.disabled && local.onChangeEnd) {
      const finalValue =
        local.restrictToMarks && local.marks?.length
          ? findClosestNumber(
              valueRef,
              local.marks.map((mark) => mark.value)
            )
          : valueRef;
      local.onChangeEnd(finalValue);
    }
  };

  let containerRef: HTMLDivElement;
  const { ref: container, active } = useMove(handleChange, { onScrubEnd: handleScrubEnd }, dir);

  const callOnChangeEnd = (value: number) => {
    if (!local.disabled && local.onChangeEnd) {
      local.onChangeEnd(value);
    }
  };

  const handleTrackKeydownCapture = (event: KeyboardEvent) => {
    if (!local.disabled) {
      switch (event.key) {
        case 'ArrowUp': {
          event.preventDefault();
          thumb?.focus();

          if (local.restrictToMarks && local.marks) {
            const nextValue = getNextMarkValue(_value(), local.marks);
            setValue(nextValue);
            callOnChangeEnd(nextValue);
            break;
          }

          const nextValue = getFloatingValue(
            Math.min(Math.max(_value() + local.step!, local.min!), local.max!),
            precision
          );
          setValue(nextValue);
          callOnChangeEnd(nextValue);
          break;
        }

        case 'ArrowRight': {
          event.preventDefault();
          thumb?.focus();

          if (local.restrictToMarks && local.marks) {
            const nextValue =
              dir === 'rtl' ? getPreviousMarkValue(_value(), local.marks) : getNextMarkValue(_value(), local.marks);
            setValue(nextValue);
            callOnChangeEnd(nextValue);
            break;
          }

          const nextValue = getFloatingValue(
            Math.min(Math.max(dir === 'rtl' ? _value() - local.step! : _value() + local.step!, local.min!), local.max!),
            precision
          );

          setValue(nextValue);
          callOnChangeEnd(nextValue);
          break;
        }

        case 'ArrowDown': {
          event.preventDefault();
          thumb?.focus();

          if (local.restrictToMarks && local.marks) {
            const nextValue = getPreviousMarkValue(_value(), local.marks);
            setValue(nextValue);
            callOnChangeEnd(nextValue);
            break;
          }

          const nextValue = getFloatingValue(
            Math.min(Math.max(_value() - local.step!, local.min!), local.max!),
            precision
          );
          setValue(nextValue);
          callOnChangeEnd(nextValue);
          break;
        }

        case 'ArrowLeft': {
          event.preventDefault();
          thumb?.focus();

          if (local.restrictToMarks && local.marks) {
            const nextValue =
              dir === 'rtl' ? getNextMarkValue(_value(), local.marks) : getPreviousMarkValue(_value(), local.marks);
            setValue(nextValue);
            callOnChangeEnd(nextValue);
            break;
          }

          const nextValue = getFloatingValue(
            Math.min(Math.max(dir === 'rtl' ? _value() + local.step! : _value() - local.step!, local.min!), local.max!),
            precision
          );
          setValue(nextValue);
          callOnChangeEnd(nextValue);
          break;
        }

        case 'Home': {
          event.preventDefault();
          thumb?.focus();

          if (local.restrictToMarks && local.marks) {
            setValue(getFirstMarkValue(local.marks));
            callOnChangeEnd(getFirstMarkValue(local.marks));
            break;
          }

          setValue(local.min!);
          callOnChangeEnd(local.min!);
          break;
        }

        case 'End': {
          event.preventDefault();
          thumb?.focus();

          if (local.restrictToMarks && local.marks) {
            setValue(getLastMarkValue(local.marks));
            callOnChangeEnd(getLastMarkValue(local.marks));
            break;
          }

          setValue(local.max!);
          callOnChangeEnd(local.max!);
          break;
        }

        default: {
          break;
        }
      }
    }
  };

  return (
    <SliderProvider value={{ getStyles }}>
      <SliderRoot
        {...others}
        ref={useMergedRef(local.ref, root)}
        onKeyDown={handleTrackKeydownCapture}
        onMouseDown={() => root?.focus()}
        size={local.size!}
        disabled={local.disabled}
      >
        <Track
          inverted={local.inverted}
          offset={0}
          filled={position()}
          marks={local.marks}
          min={local.min!}
          max={local.max!}
          value={scaledValue()}
          disabled={local.disabled}
          containerProps={{
            ref: (el: any) => {
              containerRef = el;
              container(el);
            },
            onMouseEnter: local.showLabelOnHover ? () => setHovered(true) : undefined,
            onMouseLeave: local.showLabelOnHover ? () => setHovered(false) : undefined,
          }}
        >
          <Thumb
            max={local.max!}
            min={local.min!}
            value={scaledValue()}
            position={position()}
            dragging={active()}
            label={_label()}
            ref={thumb as any}
            labelTransitionProps={local.labelTransitionProps}
            labelAlwaysOn={local.labelAlwaysOn}
            thumbLabel={local.thumbLabel}
            showLabelOnHover={local.showLabelOnHover}
            isHovered={hovered()}
            disabled={local.disabled}
            {...restThumbProps}
          >
            {local.thumbChildren}
          </Thumb>
        </Track>

        <input type="hidden" name={local.name} value={scaledValue()} {...local.hiddenInputProps} />
      </SliderRoot>
    </SliderProvider>
  );
});

Slider.classes = classes;
Slider.displayName = '@empoleon/core/Slider';
