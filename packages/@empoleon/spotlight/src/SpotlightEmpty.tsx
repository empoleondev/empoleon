import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '@empoleon/core';
import { useSpotlightContext } from './Spotlight.context';
import classes from './Spotlight.module.css';

export type SpotlightEmptyStylesNames = 'empty';

export interface SpotlightEmptyProps
  extends BoxProps,
    CompoundStylesApiProps<SpotlightEmptyFactory>,
    ElementProps<'div'> {}

export type SpotlightEmptyFactory = Factory<{
  props: SpotlightEmptyProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightEmptyStylesNames;
  compound: true;
}>;

const defaultProps: Partial<SpotlightEmptyProps> = {};

export const SpotlightEmpty = factory<SpotlightEmptyFactory>((_props) => {
  const props = useProps('SpotlightEmpty', defaultProps, _props);
  const [local, others] = splitProps(props, ['className', 'style', 'classNames', 'styles', 'ref']);

  const ctx = useSpotlightContext();

  return (
    <Box
      ref={local.ref}
      {...ctx.getStyles('empty', {
        classNames: local.classNames,
        styles: local.styles,
        className: local.className,
        style: local.style,
      })}
      {...others}
    />
  );
});

SpotlightEmpty.classes = classes;
SpotlightEmpty.displayName = '@empoleon/spotlight/SpotlightEmpty';
