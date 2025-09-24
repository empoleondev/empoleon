import { createEffect, createMemo, createSignal, JSX, splitProps } from 'solid-js';
import { useMergedRef, useMove, useUncontrolled } from '@empoleon/hooks';
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
import { getClientPosition } from '../utils/get-client-position/get-client-position';
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

export type RangeSliderValue = [number, number];

export interface RangeSliderProps
  extends BoxProps,
    StylesApiProps<RangeSliderFactory>,
    ElementProps<'div', 'onChange' | 'value' | 'defaultValue'> {
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

  /** Domain of the slider, defines the full range of possible values @default `[min, max]` */
  domain?: [number, number];

  /** Number of significant digits after the decimal point */
  precision?: number;

  /** Controlled component value */
  value?: RangeSliderValue;

  /** Uncontrolled component default value */
  defaultValue?: RangeSliderValue;

  /** Called when value changes */
  onChange?: (value: RangeSliderValue) => void;

  /** Called when user stops dragging slider or changes value with arrows */
  onChangeEnd?: (value: RangeSliderValue) => void;

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

  /** Determines whether the label should be displayed when the slider is hovered, `true` by default */
  showLabelOnHover?: boolean;

  /** Content rendered inside thumb */
  thumbChildren?: JSX.Element | JSX.Element[];

  /** Disables slider */
  disabled?: boolean;

  /** Thumb `width` and `height`, by default value is computed based on `size` prop */
  thumbSize?: number | string;

  /** A transformation function to change the scale of the slider */
  scale?: (value: number) => number;

  /** Determines whether track values representation should be inverted, `false` by default */
  inverted?: boolean;

  /** Minimal range interval, `10` by default */
  minRange?: number;

  /** Maximum range interval, `Infinity` by default */
  maxRange?: number;

  /** First thumb `aria-label` */
  thumbFromLabel?: string;

  /** Second thumb `aria-label` */
  thumbToLabel?: string;

  /** Props passed down to the hidden input */
  hiddenInputProps?: JSX.HTMLAttributes<HTMLInputElement>;

  /** Determines whether the selection should be only allowed from the given marks array, `false` by default */
  restrictToMarks?: boolean;

  /** Props passed down to thumb element based on the thumb index */
  thumbProps?: (index: 0 | 1) => JSX.HTMLAttributes<HTMLDivElement>;

  /** Determines whether the other thumb should be pushed by the current thumb dragging when `minRange`/`maxRange` is reached @default `true` */
  pushOnOverlap?: boolean;
}

export type RangeSliderFactory = Factory<{
  props: RangeSliderProps;
  ref: HTMLDivElement;
  stylesNames: SliderStylesNames;
  vars: SliderCssVariables;
}>;

const varsResolver = createVarsResolver<RangeSliderFactory>(
  (theme, props) => ({
    root: {
      '--slider-size': getSize(props.size, 'slider-size'),
      '--slider-color': props.color ? getThemeColor(props.color, theme) : undefined,
      '--slider-radius': props.radius === undefined ? undefined : getRadius(props.radius),
      '--slider-thumb-size':
        props.thumbSize !== undefined ? rem(props.thumbSize) : 'calc(var(--slider-size) * 2)',
    },
  })
);

const defaultProps = {
  min: 0,
  max: 100,
  minRange: 10,
  step: 1,
  marks: [],
  label: (f) => f,
  labelTransitionProps: { transition: 'fade', duration: 0 },
  labelAlwaysOn: false,
  showLabelOnHover: true,
  disabled: false,
  pushOnOverlap: true,
  scale: (v) => v,
  size: 'md',
  maxRange: Infinity,
} satisfies Partial<RangeSliderProps>;

export const RangeSlider = factory<RangeSliderFactory>(_props => {
  const props = useProps('RangeSlider', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'styles',
    'value',
    'onChange',
    'onChangeEnd',
    'size',
    'color',
    'radius',
    'thumbSize',
    'min',
    'max',
    'domain',
    'minRange',
    'maxRange',
    'step',
    'precision',
    'defaultValue',
    'name',
    'marks',
    'label',
    'labelTransitionProps',
    'labelAlwaysOn',
    'thumbFromLabel',
    'thumbToLabel',
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
    'pushOnOverlap',
    'attributes',
    'ref'
   ]);

  const getStyles = useStyles<RangeSliderFactory>({
    name: 'Slider',
    props,
    classes,
    classNames: local.classNames,
    className: local.className,
    styles: local.styles,
    style: local.style,
    vars: local.vars,
    attributes: local.attributes,
    varsResolver,
    unstyled: local.unstyled,
  });

  const { dir } = useDirection();
  const [focused, setFocused] = createSignal(-1);
  const [hovered, setHovered] = createSignal(false);
  const [_value, setValue] = useUncontrolled<RangeSliderValue>({
    value: () => local.value,
    defaultValue: local.defaultValue ?? [0, 0],
    finalValue: [local.min!, local.max!],
    onChange: local.onChange,
  });
  let valueRef = _value();
  const thumbs = [] as HTMLDivElement[];
  const root = null as HTMLDivElement | null;
  let thumbIndex = undefined as number | undefined;
  const [domainMin, domainMax] = local.domain || [local.min!, local.max!];
  const positions = createMemo(() => {
    const [v0, v1] = _value();
    return [
      getPosition({ value: v0, min: domainMin, max: domainMax }),
      getPosition({ value: v1, min: domainMin, max: domainMax }),
    ];
  });

  const precision = local.precision ?? getPrecision(local.step!);

  const _setValue = (val: RangeSliderValue) => {
    setValue(val);
  };

  createEffect(
    () => {
      if (Array.isArray(local.value)) {
        valueRef = local.value;
      }
    },
    Array.isArray(local.value) ? [local.value[0], local.value[1]] : [null, null]
  );

  // Fix the valueRef synchronization
  createEffect(() => {
    valueRef = _value();
  });

  const setRangedValue = (val: number, index: number, triggerChangeEnd: boolean) => {
    if (index === -1) {
      return;
    }

    const clone: RangeSliderValue = [...valueRef] as [number, number];

    if (local.restrictToMarks && local.marks) {
      const closest = findClosestNumber(
        val,
        local.marks.map((m) => m.value)
      );

      const current = clone[index];
      clone[index] = closest;
      const otherIndex = index === 0 ? 1 : 0;

      const lastMarkValue = getLastMarkValue(local.marks);
      const firstMarkValue = getFirstMarkValue(local.marks);

      if (closest === lastMarkValue && clone[otherIndex] === lastMarkValue) {
        clone[index] = current;
      } else if (closest === firstMarkValue && clone[otherIndex] === firstMarkValue) {
        clone[index] = current;
      } else if (closest === clone[otherIndex]) {
        if (current > clone[otherIndex]) {
          clone[otherIndex] = getPreviousMarkValue(closest, local.marks);
        } else {
          clone[otherIndex] = getNextMarkValue(closest, local.marks);
        }
      }
    } else {
      clone[index] = val;

      if (index === 0) {
        if (val > clone[1] - (local.minRange! - 0.000000001)) {
          const newThumb1 = Math.min(val + local.minRange!, local.max!);
          clone[1] = newThumb1;
        }

        if (val > (local.max! - (local.minRange! - 0.000000001) || local.min!)) {
          clone[index] = valueRef[index];
        }

        if (clone[1] - val > local.maxRange!) {
          clone[1] = val + local.maxRange!;
        }
      }

      if (index === 1) {
        if (val < clone[0] + local.minRange!) {
          const newThumb0 = Math.max(val - local.minRange!, local.min!);
          clone[0] = newThumb0;
        }

        if (val < clone[0] + local.minRange!) {
          clone[index] = valueRef[index];
        }

        if (val - clone[0] > local.maxRange!) {
          clone[0] = val - local.maxRange!;
        }
      }
    }

    clone[0] = getFloatingValue(clone[0], precision);
    clone[1] = getFloatingValue(clone[1], precision);

    if (clone[0] > clone[1]) {
      const temp = clone[0];
      clone[0] = clone[1];
      clone[1] = temp;
    }

    _setValue(clone);

    if (triggerChangeEnd) {
      local.onChangeEnd?.(valueRef);
    }
  };

  const handleChange = (val: number) => {
    if (!local.disabled) {
      const nextValue = getChangeValue({
        value: val,
        min: domainMin,
        max: domainMax,
        step: local.step!,
        precision,
      });
      setRangedValue(nextValue, thumbIndex!, false);
    }
  };

  const { ref: container, active } = useMove(
    ({ x }: any) => handleChange(x),
    { onScrubEnd: () => !local.disabled && local.onChangeEnd?.(valueRef) },
    dir
  );

  let containerRef: HTMLDivElement | null = null;

  function handleThumbMouseDown(index: number) {
    thumbIndex = index;
  }

  const handleTrackMouseDownCapture = (
    event: MouseEvent | TouchEvent
  ) => {
    containerRef?.focus();
    const rect = containerRef?.getBoundingClientRect();
    const changePosition = getClientPosition(event);
    const changeValue = getChangeValue({
      value: changePosition - rect!.left,
      max: local.max!,
      min: local.min!,
      step: local.step!,
      containerWidth: rect!.width,
    });

    const [thumb0Value, thumb1Value] = _value();

    let targetThumbIndex: number;

    if (changeValue <= thumb0Value) {
      targetThumbIndex = 0;
    } else if (changeValue >= thumb1Value) {
      targetThumbIndex = 1;
    } else {
      const distanceToThumb0 = Math.abs(thumb0Value - changeValue);
      const distanceToThumb1 = Math.abs(thumb1Value - changeValue);
      targetThumbIndex = distanceToThumb0 <= distanceToThumb1 ? 0 : 1;
    }

    const _targetThumbIndex = dir === 'ltr' ? targetThumbIndex : targetThumbIndex === 1 ? 0 : 1;
    thumbIndex = _targetThumbIndex;

    setRangedValue(changeValue, _targetThumbIndex, true);
  };

  const getFocusedThumbIndex = () => {
    if (focused() !== 1 && focused() !== 0) {
      setFocused(0);
      return 0;
    }

    return focused();
  };

  const handleTrackKeydownCapture = (event: KeyboardEvent) => {
    if (!local.disabled) {
      switch (event.key) {
        case 'ArrowUp': {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs[focusedIndex].focus();
          const nextValue =
          local.restrictToMarks && local.marks
              ? getNextMarkValue(valueRef[focusedIndex], local.marks)
              : Math.min(Math.max(valueRef[focusedIndex] + local.step!, local.min!), local.max!);
          setRangedValue(getFloatingValue(nextValue, precision), focusedIndex, true);
          break;
        }

        case 'ArrowRight': {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs[focusedIndex].focus();

          const nextValue =
          local.restrictToMarks && local.marks
              ? (dir === 'rtl' ? getPreviousMarkValue : getNextMarkValue)(
                  valueRef[focusedIndex],
                  local.marks
                )
              : Math.min(
                  Math.max(
                    dir === 'rtl'
                      ? valueRef[focusedIndex] - local.step!
                      : valueRef[focusedIndex] + local.step!,
                      local.min!
                  ),
                  local.max!
                );

          setRangedValue(getFloatingValue(nextValue, precision), focusedIndex, true);
          break;
        }

        case 'ArrowDown': {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs[focusedIndex].focus();
          const nextValue =
          local.restrictToMarks && local.marks
              ? getPreviousMarkValue(valueRef[focusedIndex], local.marks)
              : Math.min(Math.max(valueRef[focusedIndex] - local.step!, local.min!), local.max!);
          setRangedValue(getFloatingValue(nextValue, precision), focusedIndex, true);
          break;
        }

        case 'ArrowLeft': {
          event.preventDefault();
          const focusedIndex = getFocusedThumbIndex();
          thumbs[focusedIndex].focus();

          const nextValue =
          local.restrictToMarks && local.marks
              ? (dir === 'rtl' ? getNextMarkValue : getPreviousMarkValue)(
                  valueRef[focusedIndex],
                  local.marks
                )
              : Math.min(
                  Math.max(
                    dir === 'rtl'
                      ? valueRef[focusedIndex] + local.step!
                      : valueRef[focusedIndex] - local.step!,
                      local.min!
                  ),
                  local.max!
                );

          setRangedValue(getFloatingValue(nextValue, precision), focusedIndex, true);
          break;
        }

        default: {
          break;
        }
      }
    }
  };

  const sharedThumbProps = () => ({
    max: local.max!,
    min: local.min!,
    size: local.size,
    labelTransitionProps: local.labelTransitionProps,
    labelAlwaysOn: local.labelAlwaysOn,
    onBlur: () => setFocused(-1),
  });

  const hasArrayThumbChildren = Array.isArray(local.thumbChildren);

  return (
    <SliderProvider value={{ getStyles }}>
      <SliderRoot
        {...others}
        size={local.size!}
        color={local.color}
        radius={local.radius}
        thumbSize={local.thumbSize}
        ref={useMergedRef(local.ref, root)}
        disabled={local.disabled}
        onMouseDownCapture={() => root?.focus()}
        onKeyDownCapture={() => {
          if (thumbs[0]?.parentElement?.contains(document.activeElement)) {
            return;
          }
          thumbs[0]?.focus();
        }}
      >
        <Track
          offset={positions()[0]}
          marksOffset={_value()[0]}
          filled={positions()[1] - positions()[0]}
          marks={local.marks}
          inverted={local.inverted}
          min={domainMin}
          max={domainMax}
          value={_value()[1]}
          disabled={local.disabled}
          containerProps={{
            ref: (el: HTMLDivElement) => {
              container(el);
              containerRef = el;
            },
            onMouseEnter: local.showLabelOnHover ? () => setHovered(true) : undefined,
            onMouseLeave: local.showLabelOnHover ? () => setHovered(false) : undefined,
            onTouchStart: handleTrackMouseDownCapture,
            onTouchEnd: () => {
              thumbIndex = -1;
            },
            onMouseDown: handleTrackMouseDownCapture,
            onMouseUp: () => {
              thumbIndex = -1;
            },
            onKeyDown: handleTrackKeydownCapture,
          }}
        >
          <Thumb
            {...sharedThumbProps()}
            value={local.scale!(_value()[0])}
            position={positions()[0]}
            dragging={active()}
            label={
              typeof local.label === 'function'
                ? local.label(getFloatingValue(local.scale!(_value()[0]), precision))
                : local.label
            }
            ref={(node: any) => {
              thumbs[0] = node!;
            }}
            thumbLabel={local.thumbFromLabel}
            onMouseDown={() => handleThumbMouseDown(0)}
            onFocus={() => setFocused(0)}
            showLabelOnHover={local.showLabelOnHover}
            isHovered={hovered()}
            disabled={local.disabled}
            {...(local.thumbProps as any)?.(0)}
          >
            {hasArrayThumbChildren
              ? Array.isArray(local.thumbChildren) && local.thumbChildren[0]
              : local.thumbChildren}
          </Thumb>

          <Thumb
            {...sharedThumbProps()}
            thumbLabel={local.thumbToLabel}
            value={local.scale!(_value()[1])}
            position={positions()[1]}
            dragging={active()}
            label={
              typeof local.label === 'function'
                ? local.label(getFloatingValue(local.scale!(_value()[1]), precision))
                : local.label
            }
            ref={(node: any) => {
              thumbs[1] = node!;
            }}
            onMouseDown={() => handleThumbMouseDown(1)}
            onFocus={() => setFocused(1)}
            showLabelOnHover={local.showLabelOnHover}
            isHovered={hovered()}
            disabled={local.disabled}
            {...(local.thumbProps as any)?.(1)}
          >
            {hasArrayThumbChildren
              ? Array.isArray(local.thumbChildren) && local.thumbChildren[1]
              : local.thumbChildren}
          </Thumb>
        </Track>

        <input type="hidden" name={`${local.name}_from`} value={_value()[0]} {...local.hiddenInputProps} />
        <input type="hidden" name={`${local.name}_to`} value={_value()[1]} {...local.hiddenInputProps} />
      </SliderRoot>
    </SliderProvider>
  );
});

RangeSlider.classes = classes;
RangeSlider.displayName = '@empoleon/core/RangeSlider';
