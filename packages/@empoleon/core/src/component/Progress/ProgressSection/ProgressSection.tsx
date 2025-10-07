import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  EmpoleonColor,
  factory,
  Factory,
  getAutoContrastValue,
  getContrastColor,
  getThemeColor,
  useEmpoleonTheme,
  useProps,
} from '../../../core';
import { useProgressContext } from '../Progress.context';
import classes from '../Progress.module.css';

export type ProgressSectionStylesNames = 'section';

export interface ProgressSectionProps
  extends BoxProps,
    CompoundStylesApiProps<ProgressSectionFactory>,
    ElementProps<'div'> {
  /** Value of the section in 0–100 range  */
  value: number;

  /** Determines whether `aria-*` props should be added to the root element, `true` by default */
  withAria?: boolean;

  /** Key of `theme.colors` or any valid CSS value, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Determines whether the section should have stripes, `false` by default */
  striped?: boolean;

  /** Determines whether the sections stripes should be animated, if set, `striped` prop is ignored, `false` by default */
  animated?: boolean;
}

export type ProgressSectionFactory = Factory<{
  props: ProgressSectionProps;
  ref: HTMLDivElement;
  stylesNames: ProgressSectionStylesNames;
  compound: true;
}>;

const defaultProps: Partial<ProgressSectionProps> = {
  withAria: true,
};

export const ProgressSection = factory<ProgressSectionFactory>((_props) => {
  const props = useProps('ProgressSection', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'value',
    'withAria',
    'color',
    'striped',
    'animated',
    'mod',
    'ref',
  ]);

  const ctx = useProgressContext();
  const theme = useEmpoleonTheme();

  const ariaAttributes = local.withAria
    ? {
        role: 'progressbar' as const,
        'aria-valuemax': 100,
        'aria-valuemin': 0,
        'aria-valuenow': local.value,
        'aria-valuetext': `${local.value}%`,
      }
    : {};

  return (
    <Box
      ref={local.ref}
      {...ctx.getStyles('section', {
        className: local.className,
        classNames: local.classNames,
        styles: local.styles,
        style: local.style,
      })}
      {...others}
      {...ariaAttributes}
      mod={[{ striped: local.striped || local.animated, animated: local.animated }, local.mod]}
      __vars={{
        '--progress-section-width': `${local.value}%`,
        '--progress-section-color': getThemeColor(local.color, theme),
        '--progress-label-color': getAutoContrastValue(ctx.autoContrast, theme)
          ? getContrastColor({ color: local.color, theme, autoContrast: ctx.autoContrast })
          : undefined,
      }}
    />
  );
});

ProgressSection.classes = classes;
ProgressSection.displayName = '@empoleon/core/ProgressSection';
