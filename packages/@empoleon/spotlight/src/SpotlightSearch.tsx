import {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  Input,
  InputProps,
  InputStylesNames,
  useProps,
} from '@empoleon/core';
import { useSpotlightContext } from './Spotlight.context';
import { spotlightActions } from './spotlight.store';
import classes from './Spotlight.module.css';
import { createSignal, splitProps } from 'solid-js';

export type SpotlightSearchStylesNames = InputStylesNames;

// @ts-ignore
export interface SpotlightSearchProps
  extends BoxProps,
    Omit<InputProps, 'classNames' | 'styles' | 'vars' | 'variant'>,
    CompoundStylesApiProps<SpotlightSearchFactory>,
    ElementProps<'input', 'size'> {}

export type SpotlightSearchFactory = Factory<{
  props: SpotlightSearchProps;
  ref: HTMLInputElement;
  stylesNames: SpotlightSearchStylesNames;
  compound: true;
}>;

const defaultProps: Partial<SpotlightSearchProps> = {
  size: 'lg',
};

export const SpotlightSearch = factory<SpotlightSearchFactory>(_props => {
  const props = useProps('SpotlightSearch', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'styles',
    'onKeyDown',
    'onChange',
    'vars',
    'value',
    'ref'
  ]);
  const ctx = useSpotlightContext();
  const inputStyles = ctx.getStyles('search');
  const [isComposing, setIsComposing] = createSignal(false); // IME

  const handleKeyDown = (event: KeyboardEvent & { currentTarget: HTMLInputElement; target: Element; }) => {
    typeof local.onKeyDown === "function" && local.onKeyDown?.(event);
    if (isComposing()) {
      return;
    }

    if (event.code === 'ArrowDown') {
      event.preventDefault();
      spotlightActions.selectNextAction(ctx.store);
    }

    if (event.code === 'ArrowUp') {
      event.preventDefault();
      spotlightActions.selectPreviousAction(ctx.store);
    }

    if (event.code === 'Enter' || event.code === 'NumpadEnter') {
      event.preventDefault();
      spotlightActions.triggerSelectedAction(ctx.store);
    }
  };

  return (
    <Input
      ref={local.ref}
      classNames={[{ input: inputStyles.className }, local.classNames] as any}
      styles={[{ input: inputStyles.style }, local.styles] as any}
      {...others}
      value={local.value ?? ctx.query}
      onChange={(event) => {
        ctx.setQuery(event.currentTarget.value);
        typeof local.onChange === "function" && local.onChange?.(event);
      }}
      onKeyDown={handleKeyDown}
      onCompositionStart={() => setIsComposing(true)}
      onCompositionEnd={() => setIsComposing(false)}
    />
  );
});

SpotlightSearch.classes = classes;
SpotlightSearch.displayName = '@empoleon/spotlight/SpotlightSearch';
