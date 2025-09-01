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
import { splitProps } from 'solid-js';

export type SpotlightFooterStylesNames = 'footer';

export interface SpotlightFooterProps
  extends BoxProps,
    CompoundStylesApiProps<SpotlightFooterFactory>,
    ElementProps<'div'> {}

export type SpotlightFooterFactory = Factory<{
  props: SpotlightFooterProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightFooterStylesNames;
  compound: true;
}>;

export const SpotlightFooter = factory<SpotlightFooterFactory>(_props => {
  const props = useProps('SpotlightFooter', null, _props);
  const [local, others] = splitProps(props, [
    'className',
    'style',
    'classNames',
    'styles',
    'ref'
  ]);

  const ctx = useSpotlightContext();
  return (
    <Box
      ref={local.ref}
      {...ctx.getStyles('footer', { className: local.className, classNames: local.classNames, style: local.style, styles: local.styles })}
      {...others}
    />
  );
});

SpotlightFooter.classes = classes;
SpotlightFooter.displayName = '@empoleon/spotlight/SpotlightFooter';
