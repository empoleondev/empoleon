import { splitProps, JSX } from 'solid-js';
import { clamp } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getThemeColor,
  EmpoleonColor,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './SemiCircleProgress.module.css';

export type SemiCircleProgressStylesNames =
  | 'root'
  | 'svg'
  | 'emptySegment'
  | 'filledSegment'
  | 'label';

export type SemiCircleProgressCssVariables = {
  root:
    | '--scp-filled-segment-color'
    | '--scp-empty-segment-color'
    | '--scp-rotation'
    | '--scp-transition-duration'
    | '--scp-thickness';
};

export interface SemiCircleProgressProps
  extends BoxProps,
    StylesApiProps<SemiCircleProgressFactory>,
    ElementProps<'div'> {
  /** Progress value from `0` to `100` */
  value: number;

  /** Diameter of the svg in px, `200` by default */
  size?: number;

  /** Circle thickness in px, `12` by default */
  thickness?: number;

  /** Orientation of the circle, `'up'` by default */
  orientation?: 'up' | 'down';

  /** Direction from which the circle is filled, `'left-to-right'` by default */
  fillDirection?: 'right-to-left' | 'left-to-right';

  /** Key of `theme.colors` or any valid CSS color value, `theme.primaryColor` by default */
  filledSegmentColor?: EmpoleonColor;

  /** Key of `theme.colors` or any valid CSS color value, by default the value is determined based on the color scheme value */
  emptySegmentColor?: EmpoleonColor;

  /** Transition duration of filled section styles changes in ms, `0` by default */
  transitionDuration?: number;

  /** Label rendered inside the circle */
  label?: JSX.Element;

  /** Label position relative to the circle center, `'bottom'` by default */
  labelPosition?: 'center' | 'bottom';
}

export type SemiCircleProgressFactory = Factory<{
  props: SemiCircleProgressProps;
  ref: HTMLDivElement;
  stylesNames: SemiCircleProgressStylesNames;
  vars: SemiCircleProgressCssVariables;
}>;

const defaultProps = {
  size: 200,
  thickness: 12,
  orientation: 'up',
  fillDirection: 'left-to-right',
  labelPosition: 'bottom',
} satisfies Partial<SemiCircleProgressProps>;

function getRotation(props: Pick<SemiCircleProgressProps, 'orientation' | 'fillDirection'>) {
  if (props.orientation === 'down') {
    if (props.fillDirection === 'right-to-left') {
      return 'rotate(180deg) rotateY(180deg)';
    }
    return 'rotate(180deg)';
  }
  if (props.fillDirection === 'left-to-right') {
    return 'rotateY(180deg)';
  }

  return undefined;
}

const varsResolver = createVarsResolver<SemiCircleProgressFactory>(
  (theme, props) => ({
    root: {
      '--scp-filled-segment-color': props.filledSegmentColor
        ? getThemeColor(props.filledSegmentColor, theme)
        : undefined,
      '--scp-empty-segment-color': props.emptySegmentColor
        ? getThemeColor(props.emptySegmentColor, theme)
        : undefined,
      '--scp-rotation': getRotation({ orientation: props.orientation, fillDirection: props.fillDirection }),
      '--scp-transition-duration': props.transitionDuration ? `${props.transitionDuration}ms` : undefined,
      '--scp-thickness': rem(props.thickness),
    },
  })
);

export const SemiCircleProgress = factory<SemiCircleProgressFactory>(_props => {
  const props = useProps('SemiCircleProgress', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'size',
    'thickness',
    'value',
    'orientation',
    'fillDirection',
    'filledSegmentColor',
    'emptySegmentColor',
    'transitionDuration',
    'label',
    'labelPosition',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<SemiCircleProgressFactory>({
    name: 'SemiCircleProgress',
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

  const coordinateForCircle = local.size! / 2;
  const radius = (local.size! - 2 * local.thickness!) / 2;
  const circumference = Math.PI * radius;
  const semiCirclePercentage = clamp(local.value, 0, 100) * (circumference / 100);

  return (
    <Box ref={local.ref} size={local.size} {...getStyles('root')} {...others}>
      {local.label && (
        <Box component='p' {...getStyles('label')} data-position={local.labelPosition} data-orientation={local.orientation}>
          {local.label}
        </Box>
      )}

      <Box component='svg' width={local.size} height={local.size! / 2} {...getStyles('svg')}>
        <Box component='circle'
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke="var(--scp-empty-segment-color)"
          stroke-width={local.thickness}
          stroke-dasharray={`${circumference}`}
          {...getStyles('emptySegment', { style: { 'stroke-dashoffset': `${circumference}` } })}
        />

        <Box component='circle'
          cx={coordinateForCircle}
          cy={coordinateForCircle}
          r={radius}
          fill="none"
          stroke="var(--scp-filled-segment-color)"
          stroke-width={local.thickness}
          stroke-dasharray={`${circumference}`}
          {...getStyles('filledSegment', { style: { 'stroke-dashoffset': `${semiCirclePercentage}` } })}
        />
      </Box>
    </Box>
  );
});

SemiCircleProgress.displayName = '@empoleon/core/SemiCircleProgress';
SemiCircleProgress.classes = classes;
