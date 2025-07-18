import { JSX, splitProps } from 'solid-js';
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

export type SpotlightActionsGroupStylesNames = 'actionsGroup';

export interface SpotlightActionsGroupProps
  extends BoxProps,
    CompoundStylesApiProps<SpotlightActionsGroupFactory>,
    ElementProps<'div'> {
  /** `Spotlight.Action` components */
  children?: JSX.Element;

  /** Group label */
  label?: JSX.Element;
}

export type SpotlightActionsGroupFactory = Factory<{
  props: SpotlightActionsGroupProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightActionsGroupStylesNames;
  compound: true;
}>;

const defaultProps: Partial<SpotlightActionsGroupProps> = {};

export const SpotlightActionsGroup = factory<SpotlightActionsGroupFactory>(_props => {
  const props = useProps('SpotlightActionsGroup', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'className',
    'style',
    'styles',
    'classNames',
    'label',
    'children',
    'ref'
  ]);
  const ctx = useSpotlightContext();

  return (
    <Box
      {...ctx.getStyles('actionsGroup', { className: local.className, style: local.style, classNames: local.classNames, styles: local.styles })}
      ref={local.ref}
      {...others}
      __vars={{ '--spotlight-label': `'${local.label}'` }}
    >
      {local.children}
    </Box>
  );
});

SpotlightActionsGroup.classes = classes;
SpotlightActionsGroup.displayName = '@empoleon/core/SpotlightActionsGroup';
