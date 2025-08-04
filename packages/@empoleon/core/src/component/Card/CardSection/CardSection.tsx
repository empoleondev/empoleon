import { createSignal, onMount, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  polymorphicFactory,
  PolymorphicFactory,
  useProps,
} from '../../../core';
import classes from '../Card.module.css';
import { useCardContext } from '../Card.context';

export type CardSectionStylesNames = 'section';

export interface CardSectionProps extends BoxProps, CompoundStylesApiProps<CardSectionFactory> {
  /** Determines whether the section should have a border, `false` by default */
  withBorder?: boolean;

  /** Determines whether the section should inherit padding from the parent `Card`, `false` by default */
  inheritPadding?: boolean;
}

export type CardSectionFactory = PolymorphicFactory<{
  props: CardSectionProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: CardSectionStylesNames;
  compound: true;
}>;

const defaultProps: Partial<CardSectionProps> = {};

export const CardSection = polymorphicFactory<CardSectionFactory>(_props => {
  const props = useProps('CardSection', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'withBorder',
    'inheritPadding',
    'mod',
    'ref'
  ]);

  const ctx = useCardContext();

  const [idx, setIdx] = createSignal<number>(-1);
  onMount(() => {
    setIdx(ctx.registerItem());
  });

  const isFirst = () => idx() === 0;
  const isLast = () => idx() === ctx.totalItems() - 1;

  return (
    <Box
      ref={local.ref}
      mod={[{
        'with-border': local.withBorder,
        'inherit-padding': local.inheritPadding,
        'first-section': isFirst(),
        'last-section': isLast()
      }, local.mod]}
      {...ctx.getStyles('section', {  className: local.className, style: local.style, styles: local.styles, classNames: local.classNames })}
      {...others}
    />
  );
});

CardSection.classes = classes;
CardSection.displayName = '@empoleon/core/CardSection';
