import { splitProps } from 'solid-js';
import {
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getRadius,
  EmpoleonRadius,
  StylesApiProps,
  useDirection,
  useProps,
  useStyles,
} from '../../../core';
import { UnstyledButton } from '../../UnstyledButton';
import { useRadioGroupContext } from '../RadioGroup.context';
import { RadioCardProvider } from './RadioCard.context';
import classes from './RadioCard.module.css';

export type RadioCardStylesNames = 'card';
export type RadioCardCssVariables = {
  card: '--card-radius';
};

export interface RadioCardProps
  extends BoxProps,
    StylesApiProps<RadioCardFactory>,
    ElementProps<'button', 'onChange'> {
  /** Checked state */
  checked?: boolean;

  /** Determines whether the card should have border, `true` by default */
  withBorder?: boolean;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Value of the checkbox, used with `Radio.Group` */
  value?: string;

  /** Value used to associate all related radio cards, required for accessibility if used outside of `Radio.Group` */
  name?: string;
}

export type RadioCardFactory = Factory<{
  props: RadioCardProps;
  ref: HTMLButtonElement;
  stylesNames: RadioCardStylesNames;
  vars: RadioCardCssVariables;
}>;

const defaultProps = {
  withBorder: true,
} satisfies Partial<RadioCardProps>;

const varsResolver = createVarsResolver<RadioCardFactory>((_, props) => ({
  card: {
    '--card-radius': getRadius(props.radius),
  },
}));

export const RadioCard = factory<RadioCardFactory>(_props => {
  const props = useProps('RadioCard', defaultProps, _props);
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
    'name',
    'onKeyDown',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<RadioCardFactory>({
    name: 'RadioCard',
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

  const { dir } = useDirection();
  const ctx = useRadioGroupContext();
  const _checked = () => typeof local.checked === 'boolean' ? local.checked : ctx?.value() === local.value || false;
  const _name = local.name || ctx?.name;

  const handleKeyDown = (event: KeyboardEvent & { currentTarget: HTMLButtonElement; target: Element }) => {
    typeof local.onKeyDown === "function" && local.onKeyDown?.(event);

    if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.code)) {
      event.preventDefault();

      const siblings = Array.from(
        document.querySelectorAll<HTMLButtonElement>(
          `[role="radio"][name="${_name || '__empoleon'}"]`
        )
      );

      const currentIndex = siblings.findIndex((element) => element === event.target);
      const nextIndex = currentIndex + 1 >= siblings.length ? 0 : currentIndex + 1;
      const prevIndex = currentIndex - 1 < 0 ? siblings.length - 1 : currentIndex - 1;

      if (event.code === 'ArrowDown') {
        siblings[nextIndex].focus();
        siblings[nextIndex].click();
      }

      if (event.code === 'ArrowUp') {
        siblings[prevIndex].focus();
        siblings[prevIndex].click();
      }

      if (event.code === 'ArrowLeft') {
        siblings[dir === 'ltr' ? prevIndex : nextIndex].focus();
        siblings[dir === 'ltr' ? prevIndex : nextIndex].click();
      }

      if (event.code === 'ArrowRight') {
        siblings[dir === 'ltr' ? nextIndex : prevIndex].focus();
        siblings[dir === 'ltr' ? nextIndex : prevIndex].click();
      }
    }
  };

  return (
    <RadioCardProvider value={{ checked: _checked }}>
      {/* @ts-ignore */}
      <UnstyledButton
        ref={local.ref}
        mod={[{ 'with-border': local.withBorder, checked: _checked() }, local.mod]}
        {...getStyles('card')}
        {...others}
        role="radio"
        aria-checked={_checked()}
        name={_name}
        onClick={(event: MouseEvent & {
          currentTarget: HTMLButtonElement;
          target: Element;
        }) => {
          typeof local.onClick === "function" &&  local.onClick?.(event);
          ctx?.onChange(local.value || '');
        }}
        onKeyDown={handleKeyDown}
      />
    </RadioCardProvider>
  );
});

RadioCard.displayName = '@empoleon/core/RadioCard';
RadioCard.classes = classes;
