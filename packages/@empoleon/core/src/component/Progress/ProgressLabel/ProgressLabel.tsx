import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '../../../core';
import { useProgressContext } from '../Progress.context';
import classes from '../Progress.module.css';

export type ProgressLabelStylesNames = 'label';

export interface ProgressLabelProps
  extends BoxProps,
    CompoundStylesApiProps<ProgressLabelFactory>,
    ElementProps<'div'> {}

export type ProgressLabelFactory = Factory<{
  props: ProgressLabelProps;
  ref: HTMLDivElement;
  stylesNames: ProgressLabelStylesNames;
  compound: true;
}>;

export const ProgressLabel = factory<ProgressLabelFactory>(_props => {
  const props = useProps('ProgressLabel', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'ref'
  ]);

  const ctx = useProgressContext();

  return (
    <Box
      ref={local.ref}
      {...ctx.getStyles('label', { className: local.className, style: local.style, classNames: local.classNames, styles: local.styles })}
      {...others}
    />
  );
});

ProgressLabel.classes = classes;
ProgressLabel.displayName = '@empoleon/core/ProgressLabel';
