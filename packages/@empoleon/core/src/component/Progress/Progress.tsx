import {
  factory,
  Factory,
  EmpoleonColor,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
} from '../../core';
import { ProgressLabel } from './ProgressLabel/ProgressLabel';
import {
  __ProgressRootProps,
  ProgressRoot,
  ProgressRootCssVariables,
  ProgressRootStylesNames,
} from './ProgressRoot/ProgressRoot';
import { ProgressSection } from './ProgressSection/ProgressSection';
import classes from './Progress.module.css';
import { splitProps } from 'solid-js';

export type ProgressStylesNames = ProgressRootStylesNames;

export interface ProgressProps extends __ProgressRootProps, StylesApiProps<ProgressFactory> {
  /** Value of the progress */
  value: number;

  /** Key of `theme.colors` or any valid CSS value, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Determines whether the section should have stripes, `false` by default */
  striped?: boolean;

  /** Determines whether the sections stripes should be animated, if set, `striped` prop is ignored, `false` by default */
  animated?: boolean;
}

export type ProgressFactory = Factory<{
  props: ProgressProps;
  ref: HTMLDivElement;
  stylesNames: ProgressStylesNames;
  vars: ProgressRootCssVariables;
  staticComponents: {
    Section: typeof ProgressSection;
    Root: typeof ProgressRoot;
    Label: typeof ProgressLabel;
  };
}>;

const defaultProps: Partial<ProgressProps> = {};

export const Progress = factory<ProgressFactory>(_props => {
  const props = useProps('Progress', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'value',
    'classNames',
    'styles',
    'vars',
    'color',
    'striped',
    'animated',
    'aria-label',
    'ref'
  ]);

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<ProgressFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  return (
    <ProgressRoot
      ref={local.ref}
      classNames={resolvedClassNames}
      styles={resolvedStyles}
      vars={local.vars as any}
      {...others}
    >
      <ProgressSection
        value={local.value}
        color={local.color}
        striped={local.striped}
        animated={local.animated}
        aria-label={local['aria-label']}
      />
    </ProgressRoot>
  );
});

Progress.classes = classes;
Progress.displayName = '@empoleon/core/Progress';
Progress.Section = ProgressSection;
Progress.Root = ProgressRoot;
Progress.Label = ProgressLabel;
