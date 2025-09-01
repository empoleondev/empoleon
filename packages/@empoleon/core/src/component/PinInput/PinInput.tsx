import { createSignal, createEffect, JSX, For, splitProps } from "solid-js";
import { useId, useUncontrolled } from '@empoleon/hooks';
import {
  BoxProps,
  createVarsResolver,
  ElementProps,
  Factory,
  factory,
  getSize,
  EmpoleonRadius,
  EmpoleonSize,
  EmpoleonSpacing,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '../../core';
import { Group } from '../Group';
import { Input, InputProps } from '../Input';
import { InputBase } from '../InputBase';
import { createPinArray } from './create-pin-array/create-pin-array';
import classes from './PinInput.module.css';
import { mergeRefs, Ref } from "@solid-primitives/refs";

const regex = {
  number: /^[0-9]+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/i,
};

export type PinInputStylesNames = 'root' | 'pinInput' | 'input';

export type PinInputCssVariables = {
  root: '--pin-input-size';
};

export interface PinInputProps
  extends BoxProps,
    StylesApiProps<PinInputFactory>,
    ElementProps<'div', 'onChange'> {
  /** Hidden input `name` attribute */
  name?: string;

  /** Hidden input `form` attribute */
  form?: string;

  /** Key of `theme.spacing` or any valid CSS value to set `gap` between inputs, numbers are converted to rem, `'md'` by default */
  gap?: EmpoleonSpacing;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Controls inputs `width` and `height`, `'sm'` by default */
  size?: EmpoleonSize;

  /** If set, the first input is focused when component is mounted, `false` by default */
  autoFocus?: boolean;

  /** Controlled component value */
  value?: string;

  /** Uncontrolled component default value */
  defaultValue?: string;

  /** Called when value changes */
  onChange?: (value: string) => void;

  /** Called when all inputs have value */
  onComplete?: (value: string) => void;

  /** Inputs placeholder, `'○'` by default */
  placeholder?: string;

  /** Determines whether focus should be moved automatically to the next input once filled, `true` by default */
  manageFocus?: boolean;

  /** Determines whether `autocomplete="one-time-code"` attribute should be set on all inputs, `true` by default */
  oneTimeCode?: boolean;

  /** Base id used for all inputs. By default, inputs' ids are generated randomly. */
  id?: string;

  /** If set, `disabled` attribute is added to all inputs */
  disabled?: boolean;

  /** If set, adds error styles and `aria-invalid` attribute to all inputs */
  error?: boolean;

  /** Determines which values can be entered, `'alphanumeric'` by default */
  type?: 'alphanumeric' | 'number' | RegExp;

  /** Changes input type to `"password"`, `false` by default */
  mask?: boolean;

  /** Number of inputs, `4` by default */
  length?: number;

  /** If set, the user cannot edit the value */
  readOnly?: boolean;

  /** Inputs `type` attribute, inferred from the `type` prop if not specified */
  inputType?: JSX.HTMLAttributes<HTMLInputElement['type']>;

  /** `inputmode` attribute, inferred from the `type` prop if not specified */
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined;

  /** `aria-label` for the inputs */
  ariaLabel?: string;

  /** Props passed down to the hidden input */
  hiddenInputProps?: JSX.HTMLAttributes<HTMLInputElement>;

  /** Assigns ref of the root element */
  rootRef?: Ref<HTMLDivElement>;

  /** Props added to the input element depending on its index */
  getInputProps?: (index: number) => InputProps & ElementProps<'input', 'size'>;
}

export type PinInputFactory = Factory<{
  props: PinInputProps;
  ref: HTMLInputElement;
  stylesNames: PinInputStylesNames;
  vars: PinInputCssVariables;
}>;

const defaultProps = {
  gap: 'sm',
  length: 4,
  manageFocus: true,
  oneTimeCode: true,
  placeholder: '○',
  type: 'alphanumeric',
  ariaLabel: 'PinInput',
  size: 'sm',
} satisfies Partial<PinInputProps>;

const varsResolver = createVarsResolver<PinInputFactory>((_, { size }) => ({
  root: {
    '--pin-input-size': getSize(size ?? defaultProps.size, 'pin-input-size'),
  },
}));

export const PinInput = factory<PinInputFactory>(_props => {
  const props = useProps('PinInput', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'name',
    'form',
    'className',
    'value',
    'defaultValue',
    'variant',
    'gap',
    'style',
    'size',
    'classNames',
    'styles',
    'unstyled',
    'length',
    'onChange',
    'onComplete',
    'manageFocus',
    'autoFocus',
    'error',
    'radius',
    'disabled',
    'oneTimeCode',
    'placeholder',
    'type',
    'mask',
    'readOnly',
    'inputType',
    'inputMode',
    'ariaLabel',
    'vars',
    'id',
    'hiddenInputProps',
    'rootRef',
    'getInputProps',
    'attributes',
    'ref'
  ]);

  const uuid = useId(local.id);

  const getStyles = useStyles<PinInputFactory>({
    name: 'PinInput',
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

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<PinInputFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  const [focusedIndex, setFocusedIndex] = createSignal(-1);

  const [_value, setValues] = useUncontrolled<string[]>({
    value: () => local.value ? createPinArray(local.length ?? 0, local.value) : undefined,
    defaultValue: local.defaultValue?.split('').slice(0, local.length ?? 0)!,
    finalValue: createPinArray(local.length ?? 0, ''),
    onChange:
      typeof local.onChange === 'function'
        ? (val: string[]) => {
            local.onChange && local.onChange(val.join('').trim());
          }
        : undefined,
  });
  const _valueToString = _value().join('').trim();

  const [inputsRef, setInputsRef] = createSignal<Array<HTMLInputElement | null>>(
    Array(local.length || 0).fill(null)
  );

  const validate = (code: string) => {
    const re = local.type instanceof RegExp ? local.type : local.type && local.type in regex ? regex[local.type] : null;

    return re?.test(code);
  };

  const focusInputField = (
    dir: 'next' | 'prev',
    index: number,
    event?: Event
  ) => {
    if (!local.manageFocus) {
      event?.preventDefault();
      return;
    }

    if (dir === 'next') {
      const nextIndex = index + 1;
      const canFocusNext = nextIndex < (local.length ?? 0);
      const refs = inputsRef();

      if (canFocusNext && refs[nextIndex]) {
        event?.preventDefault();
        refs[nextIndex].focus();
      }
    }

    if (dir === 'prev') {
      const nextIndex = index - 1;
      const canFocusNext = nextIndex > -1;
      const refs = inputsRef();

      if (canFocusNext && refs[nextIndex]) {
        event?.preventDefault();
        refs[nextIndex].focus();
      }
    }
  };

  const setFieldValue = (val: string, index: number) => {
    const values = [..._value()];
    values[index] = val;
    setValues(values);
  };

  const handleChange = (event: Event, index: number) => {
    const inputValue = (event.currentTarget as HTMLInputElement).value;
    const nextCharOrValue =
      inputValue.length === 2 ? inputValue.split('')[inputValue.length - 1] : inputValue;

    const isValid = validate(nextCharOrValue);

    if (nextCharOrValue.length < 2) {
      if (isValid) {
        setFieldValue(nextCharOrValue, index);
        focusInputField('next', index);
      } else {
        setFieldValue('', index);
      }
    } else if (isValid) {
      setValues(createPinArray(local.length ?? 0, inputValue));
    }
  };

  function handleKeyDown(event: KeyboardEvent, index: number) {
    const { ctrlKey, metaKey, key, shiftKey, target } = event;
    const inputValue = (target as HTMLInputElement).value;

    if (local.inputMode === 'numeric') {
      const canTypeSign =
        key === 'Backspace' ||
        key === 'Tab' ||
        key === 'Control' ||
        key === 'Delete' ||
        (ctrlKey && key === 'v') ||
        (metaKey && key === 'v')
          ? true
          : !Number.isNaN(Number(key));

      if (!canTypeSign) {
        event.preventDefault();
      }
    }

    if (key === 'ArrowLeft' || (shiftKey && key === 'Tab')) {
      focusInputField('prev', index, event);
    } else if (key === 'ArrowRight' || key === 'Tab' || key === ' ') {
      focusInputField('next', index, event);
    } else if (key === 'Delete') {
      setFieldValue('', index);
    } else if (key === 'Backspace') {
      if (index !== 0) {
        setFieldValue('', index);
        if (local.length === index + 1) {
          if ((event.target as HTMLInputElement).value === '') {
            focusInputField('prev', index, event);
          }
        } else {
          focusInputField('prev', index, event);
        }
      }
    } else if (inputValue.length > 0 && key === _value()[index]) {
      focusInputField('next', index, event);
    }
  };

  const handleFocus = (event: Event, index: number) => {
    (event.target as HTMLInputElement)?.select();
    setFocusedIndex(index);
  };

  const handleBlur = () => {
    setFocusedIndex(-1);
  };

  const handlePaste = (event: ClipboardEvent) => {
    event.preventDefault();
    const copyValue = event.clipboardData?.getData('text/plain').replace(/[\n\r\s]+/g, '');
    if (copyValue){
      const isValid = validate(copyValue.trim());

      if (isValid) {
        const copyValueToPinArray = createPinArray(local.length ?? 0, copyValue);
        setValues(copyValueToPinArray);
        focusInputField('next', copyValueToPinArray.length - 2);
      }
    }
  };

  createEffect(() => {
    const valueString = _value().join('').trim();
    if (valueString.length !== local.length) {
      return;
    }
    local.onComplete?.(valueString);
  });

  createEffect(() => {
    if (local.length !== _value().length) {
      setValues(createPinArray(local.length ?? 0, _value().join('')));
    }
  });

  createEffect(() => {
    if (local.value === '') {
      setValues(createPinArray(local.length ?? 0, local.value));
    }
  });

  createEffect(() => {
    if (local.disabled) {
      setFocusedIndex(-1);
    }
  });

  return (
    <>
      <Group
        {...others}
        {...getStyles('root')}
        ref={local.rootRef}
        role="group"
        id={uuid}
        gap={local.gap}
        unstyled={local.unstyled}
        wrap="nowrap"
        variant={local.variant}
        __size={local.size}
        dir="ltr"
      >
        <For each={_value()}>
          {(char, index) => (
            <Input
              component="input"
              {...getStyles('pinInput', {
                style: {
                  '--input-padding': '0',
                  '--input-text-align': 'center',
                } as JSX.CSSProperties,
              })}
              classNames={resolvedClassNames}
              styles={resolvedStyles}
              size={local.size}
              __staticSelector="PinInput"
              id={`${uuid}-${index() + 1}`}
              inputMode={local.inputMode || (local.type === 'number' ? 'numeric' : 'text')}
              onInput={(event: Event) => handleChange(event, index())}
              onKeyDown={(event: KeyboardEvent) => handleKeyDown(event, index())}
              onFocus={(event: Event) => handleFocus(event, index())}
              onBlur={handleBlur}
              onPaste={handlePaste}
              type={typeof local.inputType === "string" ? local.inputType : (local.mask?"password": local.type==="number"?"tel":"text")}
              radius={local.radius}
              error={local.error}
              variant={local.variant}
              disabled={local.disabled}
              ref={(el: HTMLInputElement) => {
                if (typeof local.ref === 'function') local.ref(el);

                setInputsRef(prev => {
                  const next = [...prev];
                  next[index()] = el;
                  return next;
                });
              }}
              auto-complete={local.oneTimeCode ? 'one-time-code' : 'off'}
              placeholder={focusedIndex === index ? '' : local.placeholder}
              value={char}
              auto-focus={local.autoFocus && index() === 0}
              unstyled={local.unstyled}
              aria-label={local.ariaLabel}
              read-only={local.readOnly}
              {...local.getInputProps?.(index())}
            />
          )}
        </For>
      </Group>

      <input type="hidden" name={local.name} form={local.form} value={_valueToString} {...local.hiddenInputProps} />
    </>
  );
});

PinInput.classes = { ...classes, ...InputBase.classes };
PinInput.displayName = '@empoleon/core/PinInput';
