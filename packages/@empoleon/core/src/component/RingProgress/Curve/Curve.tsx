import { splitProps, JSX } from 'solid-js';
import { Box, GetStylesApi, getThemeColor, EmpoleonColor, useEmpoleonTheme } from '../../../core';
import { Tooltip } from '../../Tooltip';
import type { RingProgressFactory } from '../RingProgress';
import { getCurveProps } from './get-curve-props';

interface CurveProps extends JSX.HTMLAttributes<SVGCircleElement> {
  value?: number;
  size: number;
  offset: number;
  sum: number;
  thickness: number;
  lineRoundCaps: boolean | undefined;
  root?: boolean;
  color?: EmpoleonColor;
  tooltip?: JSX.Element;
  getStyles: GetStylesApi<RingProgressFactory>;
}

export function Curve(props: CurveProps) {
  const [local, others] = splitProps(props, [
    'size',
    'value',
    'offset',
    'sum',
    'thickness',
    'root',
    'color',
    'lineRoundCaps',
    'tooltip',
    'getStyles',
  ]);
  const theme = useEmpoleonTheme();

  return (
    <Tooltip.Floating disabled={!local.tooltip} label={local.tooltip}>
      <Box
        component="circle"
        {...others}
        {...local.getStyles('curve')}
        __vars={{ '--curve-color': local.color ? getThemeColor(local.color, theme) : undefined }}
        fill="none"
        stroke-linecap={local.lineRoundCaps ? 'round' : 'butt'}
        {...getCurveProps({ sum: local.sum, size: local.size, thickness: local.thickness, value: local.value, offset: local.offset, root: local.root })}
      />
    </Tooltip.Floating>
  );
}

Curve.displayName = '@empoleon/core/Curve';
