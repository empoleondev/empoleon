import { splitProps, JSX, createSignal, onMount, onCleanup, createEffect } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  getSpacing,
  EmpoleonRadius,
  EmpoleonShadow,
  EmpoleonSpacing,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
  CompoundStylesApiProps,
} from '../../core';
import { Paper } from '../Paper';
import classes from './Card.module.css';
import { CardProvider, useCardContext } from './Card.context';

export type CardStylesNames = 'root' | 'section';
export type CardSectionStylesNames = 'section';
export type CardCssVariables = {
  root: '--card-padding';
};

export interface CardProps extends BoxProps, StylesApiProps<CardFactory> {
  shadow?: EmpoleonShadow;
  radius?: EmpoleonRadius;
  withBorder?: boolean;
  padding?: EmpoleonSpacing;
  children?: JSX.Element | (() => JSX.Element);
}

export interface CardSectionProps extends BoxProps, CompoundStylesApiProps<CardSectionFactory> {
  withBorder?: boolean;
  inheritPadding?: boolean;
}

export type CardFactory = PolymorphicFactory<{
  props: CardProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: CardStylesNames;
  vars: CardCssVariables;
  staticComponents: {
    Section: typeof CardSection;
  };
}>;

export type CardSectionFactory = PolymorphicFactory<{
  props: CardSectionProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: CardSectionStylesNames;
  compound: true;
}>;

const defaultProps: Partial<CardProps> = {};
const defaultSectionProps: Partial<CardSectionProps> = {};

const varsResolver = createVarsResolver<CardFactory>((_, { padding }) => ({
  root: {
    '--card-padding': getSpacing(padding),
  },
}));

// CardSection component
export const CardSection = polymorphicFactory<CardSectionFactory>(_props => {
  const props = useProps('CardSection', defaultSectionProps, _props);
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
  if (!ctx) return <div>CardSection must be used within Card</div>;

  const [sectionIndex, setSectionIndex] = createSignal(-1);
  const [isFirst, setIsFirst] = createSignal(false);
  const [isLast, setIsLast] = createSignal(false);

  onMount(() => {
    const index = ctx.registerSection();
    setSectionIndex(index);
  });

  // Use createEffect to reactively update position based on context changes
  createEffect(() => {
    const index = sectionIndex();
    if (index >= 0) {
      const total = ctx.getTotalSections();
      setIsFirst(index === 0);
      setIsLast(index === total - 1);
    }
  });

  const sectionStyles = ctx.getStyles('section', {
    className: local.className,
    style: local.style,
    styles: local.styles,
    classNames: local.classNames
  });

  return (
    <Box
      ref={local.ref}
      mod={[{
        'with-border': local.withBorder,
        'inherit-padding': local.inheritPadding,
        'first-section': isFirst(),
        'last-section': isLast()
      }, local.mod]}
      {...sectionStyles}
      data-first-section={isFirst() ? true : undefined}
      data-last-section={isLast() ? true : undefined}
      {...others}
    />
  );
});

// Card component
export const Card = polymorphicFactory<CardFactory>(_props => {
  const props = useProps('Card', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'children',
    'padding',
    'ref'
  ]);

  const getStyles = useStyles<CardFactory>({
    name: 'Card',
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  const [sectionCount, setSectionCount] = createSignal(0);

  const registerSection = () => {
    const index = sectionCount();
    setSectionCount(c => c + 1);
    return index;
  };

  const getTotalSections = () => sectionCount();

  // Remove the callback system since we're using createEffect in sections
  const onSectionsChange = () => {
    return () => {}; // no-op
  };

  return (
    <CardProvider value={{
      getStyles,
      registerSection,
      getTotalSections,
      onSectionsChange
    }}>
      <Paper ref={local.ref} unstyled={local.unstyled} {...getStyles('root')} {...others}>
        {local.children as JSX.Element}
      </Paper>
    </CardProvider>
  );
});

Card.classes = classes;
Card.displayName = '@empoleon/core/Card';
Card.Section = CardSection;
CardSection.classes = classes;
CardSection.displayName = '@empoleon/core/CardSection';
