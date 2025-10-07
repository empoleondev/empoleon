import { splitProps } from 'solid-js';
import { useUncontrolled } from '@empoleon/hooks';
import {
  BoxProps,
  createVarsResolver,
  ElementProps,
  EmpoleonRadius,
  factory,
  Factory,
  getRadius,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import { UnstyledButton } from '../../UnstyledButton';
import { useCheckboxGroupContext } from '../CheckboxGroup.context';
import { CheckboxCardProvider } from './CheckboxCard.context';
import classes from './CheckboxCard.module.css';

export type CheckboxCardStylesNames = 'card';
export type CheckboxCardCssVariables = {
  card: '--card-radius';
};

export interface CheckboxCardProps
  extends BoxProps,
    StylesApiProps<CheckboxCardFactory>,
    ElementProps<'button', 'onChange'> {
  /** Controlled component value */
  checked?: boolean;

  /** Uncontrolled component default value */
  defaultChecked?: boolean;

  /** Called when value changes */
  onChange?: (checked: boolean) => void;

  /** Determines whether the card should have border, `true` by default */
  withBorder?: boolean;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Value of the checkbox, used with `Checkbox.Group` */
  value?: string;
}

export type CheckboxCardFactory = Factory<{
  props: CheckboxCardProps;
  ref: HTMLButtonElement;
  stylesNames: CheckboxCardStylesNames;
  vars: CheckboxCardCssVariables;
}>;

const defaultProps = {
  withBorder: true,
} satisfies Partial<CheckboxCardProps>;

const varsResolver = createVarsResolver<CheckboxCardFactory>((_, props) => ({
  card: {
    '--card-radius': getRadius(props.radius),
  },
}));

export const CheckboxCard = factory<CheckboxCardFactory>((_props) => {
  const props = useProps('CheckboxCard', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'checked',
    'mod',
    'withBorder',
    'value',
    'onClick',
    'defaultChecked',
    'onChange',
    'attributes',
    'ref',
  ]);

  const getStyles = useStyles<CheckboxCardFactory>({
    name: 'CheckboxCard',
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
    rootSelector: 'card',
  });

  const ctx = useCheckboxGroupContext();
  const checked = () => local.checked;
  const groupStoreValue = () => (ctx ? ctx.value().includes(local.value || '') : undefined);
  const _checked = () => (typeof local.checked === 'boolean' ? checked() : groupStoreValue());

  const defaultChecked = () => local.defaultChecked;

  const [_value, setValue] = useUncontrolled({
    value: _checked,
    defaultValue: defaultChecked() || false,
    finalValue: false,
    onChange: local.onChange,
  });

  return (
    <CheckboxCardProvider value={{ checked: _value }}>
      {/* @ts-ignore */}
      <UnstyledButton
        ref={local.ref}
        mod={[{ 'with-border': local.withBorder, checked: _value() }, local.mod]}
        {...getStyles('card')}
        {...others}
        role="checkbox"
        aria-checked={_value()}
        onClick={(event) => {
          typeof local.onClick === 'function' && local.onClick?.(event);
          typeof local.onClick !== 'function' && ctx && ctx.onChange(local.value || '');
          setValue(!_value());
        }}
      />
    </CheckboxCardProvider>
  );
});

CheckboxCard.displayName = '@empoleon/core/CheckboxCard';
CheckboxCard.classes = classes;
