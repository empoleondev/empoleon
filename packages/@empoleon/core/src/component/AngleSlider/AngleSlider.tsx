import { For, JSX, splitProps } from 'solid-js';
import { normalizeRadialValue, useMergedRef, useRadialMove, useUncontrolled } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  findClosestNumber,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './AngleSlider.module.css';

export type AngleSliderStylesNames = 'root' | 'thumb' | 'label' | 'marks' | 'mark';
export type AngleSliderCssVariables = {
  root: '--slider-size' | '--thumb-size';
};

export interface AngleSliderProps
  extends BoxProps,
    StylesApiProps<AngleSliderFactory>,
    ElementProps<'div', 'onChange'> {
  /** Step between values, used when the component is controlled with keyboard, `1` by default */
  step?: number;

  /** Value of the controlled component */
  value?: number;

  /** Default value for uncontrolled component */
  defaultValue?: number;

  /** Called on value change */
  onChange?: (value: number) => void;

  /** Called after the selection is finished */
  onChangeEnd?: (value: number) => void;

  /** Called in `onMouseDown` and `onTouchStart` events */
  onScrubStart?: () => void;

  /** Called in `onMouseUp` and `onTouchEnd` events */
  onScrubEnd?: () => void;

  /** Determines whether the label should be displayed inside the slider, `true` by default */
  withLabel?: boolean;

  /** Array of marks that are displayed on the slider */
  marks?: { value: number; label?: string }[];

  /** Slider size in px, `60px` */
  size?: number;

  /** Size of the thumb in px, by default is calculated based on the `size` value */
  thumbSize?: number;

  /** Formats label based on the current value */
  formatLabel?: (value: number) => JSX.Element;

  /** Disables interactions */
  disabled?: boolean;

  /** Determines whether the selection should be only allowed from the given marks array, `false` by default */
  restrictToMarks?: boolean;

  /** Props passed down to the hidden input */
  hiddenInputProps?: JSX.HTMLAttributes<HTMLInputElement>;

  /** Hidden input name, use with uncontrolled component */
  name?: string;
}

export type AngleSliderFactory = Factory<{
  props: AngleSliderProps;
  ref: HTMLDivElement;
  stylesNames: AngleSliderStylesNames;
  vars: AngleSliderCssVariables;
}>;

const defaultProps: Partial<AngleSliderProps> = {
  step: 1,
  withLabel: true,
};

const varsResolver = createVarsResolver<AngleSliderFactory>((_, { size, thumbSize }) => ({
  root: {
    '--slider-size': rem(size),
    '--thumb-size': rem(thumbSize),
  },
}));

export const AngleSlider = factory<AngleSliderFactory>(_props => {
  const props = useProps('AngleSlider', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'step',
    'value',
    'defaultValue',
    'onChange',
    'onMouseDown',
    'withLabel',
    'marks',
    'thumbSize',
    'restrictToMarks',
    'formatLabel',
    'onChangeEnd',
    'disabled',
    'onTouchStart',
    'name',
    'hiddenInputProps',
    'aria-label',
    'tabIndex',
    'onScrubStart',
    'onScrubEnd',
    'ref'
  ]);

  const [_value, setValue] = useUncontrolled({
    value: () => local.value,
    defaultValue: local.defaultValue ?? 0,
    finalValue: 0,
    onChange: local.onChange,
  });

  const update = (val: number) => {
    const newValue =
      local.restrictToMarks && Array.isArray(local.marks)
        ? findClosestNumber(
            val,
            local.marks.map((mark) => mark.value)
          )
        : val;

    setValue(newValue);
  };

  const { ref: rootRef } = useRadialMove(update, {
    step: local.step,
    onChangeEnd: local.onChangeEnd,
    onScrubStart: local.onScrubStart,
    onScrubEnd: local.onScrubEnd,
  });

  const getStyles = useStyles<AngleSliderFactory>({
    name: 'AngleSlider',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  const handleKeyDown = (event: KeyboardEvent) => {
    if (local.disabled) {
      return;
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
      const normalized = normalizeRadialValue(_value() - local.step!, local.step!);
      setValue(normalized);
      local.onChangeEnd?.(normalized);
    }

    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
      const normalized = normalizeRadialValue(_value() + local.step!, local.step!);
      setValue(normalized);
      local.onChangeEnd?.(normalized);
    }

    if (event.key === 'Home') {
      setValue(0);
      local.onChangeEnd?.(0);
    }

    if (event.key === 'End') {
      setValue(359);
      local.onChangeEnd?.(359);
    }
  };

  return (
    <Box ref={useMergedRef(local.ref, rootRef)} {...getStyles('root', { focusable: true })} {...others}>
      {local.marks && local.marks.length > 0 && (
        <div {...getStyles('marks')}>
          <For each={local.marks}>{(mark) => (
            <div
              {...getStyles('mark', { style: { '--angle': `${mark.value}deg` } })}
              data-label={mark.label || undefined}
            />
          )}
          </For>
        </div>
      )}

      {local.withLabel && (
        <div {...getStyles('label')}>
          {typeof local.formatLabel === 'function' ? local.formatLabel(_value()) : _value()}
        </div>
      )}
      <div
        tabIndex={local.tabIndex ?? (local.disabled ? -1 : 0)}
        role="slider"
        aria-valuemax={360}
        aria-valuemin={0}
        aria-valuenow={_value()}
        onKeyDown={handleKeyDown}
        aria-label={local['aria-label']}
        {...getStyles('thumb', { style: { transform: `rotate(${_value()}deg)` } })}
      />
      <input type="hidden" name={local.name} value={_value()} {...local.hiddenInputProps} />
    </Box>
  );
});

AngleSlider.displayName = '@empoleon/core/AngleSlider';
AngleSlider.classes = classes;
