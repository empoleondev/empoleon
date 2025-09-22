import { splitProps, JSX } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  EmpoleonColor,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { Curve } from './Curve/Curve';
import { getCurves } from './get-curves/get-curves';
import classes from './RingProgress.module.css';

function getClampedThickness(thickness: number, size: number) {
  return Math.min(thickness || 12, (size || 120) / 4);
}

interface RingProgressSection extends JSX.HTMLAttributes<SVGCircleElement> {
  value: number;
  color: EmpoleonColor;
  tooltip?: JSX.Element;
}

export type RingProgressStylesNames = 'root' | 'svg' | 'label' | 'curve';
export type RingProgressCssVariables = {
  root: '--rp-size' | '--rp-label-offset' | '--rp-transition-duration';
};

export interface RingProgressProps
  extends BoxProps,
    StylesApiProps<RingProgressFactory>,
    ElementProps<'div'> {
  /** Label displayed in the center of the ring */
  label?: JSX.Element;

  /** Ring thickness */
  thickness?: number;

  /** Width and height of the progress ring */
  size?: number;

  /** Sets whether the edges of the progress circle are rounded */
  roundCaps?: boolean;

  /** Ring sections */
  sections: RingProgressSection[];

  /** Color of the root section, key of theme.colors or CSS color value */
  rootColor?: EmpoleonColor;

  /** Transition duration of filled section styles changes in ms, `0` by default */
  transitionDuration?: number;
}

export type RingProgressFactory = Factory<{
  props: RingProgressProps;
  ref: HTMLDivElement;
  stylesNames: RingProgressStylesNames;
  vars: RingProgressCssVariables;
}>;

const defaultProps = {
  size: 120,
  thickness: 12,
} satisfies Partial<RingProgressProps>;

const varsResolver = createVarsResolver<RingProgressFactory>(
  (_, props) => ({
    root: {
      '--rp-size': rem(props.size),
      '--rp-label-offset': rem(props.thickness! * 2),
      '--rp-transition-duration': props.transitionDuration ? `${props.transitionDuration}ms` : undefined,
    },
  })
);

export const RingProgress = factory<RingProgressFactory>(_props => {
  const props = useProps('RingProgress', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'label',
    'sections',
    'size',
    'thickness',
    'roundCaps',
    'rootColor',
    'transitionDuration',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<RingProgressFactory>({
    name: 'RingProgress',
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
  });

  const clampedThickness = getClampedThickness(local.thickness!, local.size!);

  const curves = getCurves({
    size: local.size!,
    thickness: clampedThickness,
    sections: local.sections,
    renderRoundedLineCaps: local.roundCaps,
    rootColor: local.rootColor,
  }).map(({ data, sum, root, lineRoundCaps, offset }, index) => (
    <Curve
      {...data}
      size={local.size!}
      thickness={clampedThickness}
      sum={sum}
      offset={offset}
      color={data?.color}
      root={root}
      lineRoundCaps={lineRoundCaps}
      getStyles={getStyles}
    />
  ));

  return (
    <Box {...getStyles('root')} size={local.size} ref={local.ref} {...others}>
      <Box component='svg' {...getStyles('svg')}>{curves}</Box>
      {local.label && <Box component='div' {...getStyles('label')}>{local.label}</Box>}
    </Box>
  );
});

RingProgress.classes = classes;
RingProgress.displayName = '@empoleon/core/RingProgress';
