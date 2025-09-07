import { PossibleRef, useMergedRef } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import { useInputWrapperContext } from '../../Input';
import { usePillsInputContext } from '../PillsInput.context';
import classes from '../PillsInput.module.css';
import { splitProps } from 'solid-js';

export type PillsInputFieldStylesNames = 'field';

export interface PillsInputFieldProps
  extends BoxProps,
    StylesApiProps<PillsInputFieldFactory>,
    ElementProps<'input', 'type'> {
  /** Controls input styles when focused. If `auto` the input is hidden when not focused. If `visible` the input will always remain visible. `'visible'` by default  */
  type?: 'auto' | 'visible' | 'hidden';

  /** If set, cursor is changed to pointer */
  pointer?: boolean;
}

export type PillsInputFieldFactory = Factory<{
  props: PillsInputFieldProps;
  ref: HTMLInputElement;
  stylesNames: PillsInputFieldStylesNames;
}>;

const defaultProps = {
  type: 'visible',
} satisfies Partial<PillsInputFieldProps>;

export const PillsInputField = factory<PillsInputFieldFactory>(_props => {
  const props = useProps('PillsInputField', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'type',
    'disabled',
    'id',
    'pointer',
    'mod',
    'attributes',
    'ref'
  ]);

  const ctx = usePillsInputContext();
  const inputWrapperCtx = useInputWrapperContext();

  const getStyles = useStyles<PillsInputFieldFactory>({
    name: 'PillsInputField',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    rootSelector: 'field',
  });

  const _disabled = local.disabled || ctx?.disabled;

  return (
    <Box
      component="input"
      ref={
        useMergedRef(local.ref, ctx?.fieldRef ? (el: HTMLInputElement) => {
          if (typeof ctx.fieldRef === 'function') {
            ctx.fieldRef(el);
          } else if (ctx.fieldRef && 'current' in ctx.fieldRef) {
            ctx.fieldRef.current = el;
          }
        } : undefined)
      }
      data-type={local.type}
      disabled={_disabled}
      mod={[{ disabled: _disabled, pointer: local.pointer }, local.mod]}
      {...getStyles('field')}
      {...others}
      id={inputWrapperCtx?.inputId || local.id}
      aria-invalid={ctx?.hasError}
      aria-describedby={inputWrapperCtx?.describedBy}
      type="text"
      onMouseDown={(event) => !local.pointer && event.stopPropagation()}
    />
  );
});

PillsInputField.classes = classes;
PillsInputField.displayName = '@empoleon/core/PillsInputField';
