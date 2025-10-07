import { JSX } from 'solid-js';
import type { EmpoleonColor } from '../../../core';

interface CurveData extends JSX.HTMLAttributes<SVGCircleElement> {
  value: number;
  color: EmpoleonColor;
  tooltip?: JSX.Element;
}

interface RootCurveData extends JSX.HTMLAttributes<SVGCircleElement> {
  color?: EmpoleonColor;
}

interface GetCurves {
  sections: CurveData[];
  size: number;
  thickness: number;
  renderRoundedLineCaps: boolean | undefined;
  rootColor?: EmpoleonColor;
}

interface Curve {
  sum: number;
  offset: number;
  root: boolean;
  data: CurveData | RootCurveData;
  lineRoundCaps?: boolean;
}

export function getCurves(props: GetCurves) {
  const sum = props.sections.reduce((acc, current) => acc + current.value, 0);
  const accumulated = Math.PI * ((props.size * 0.9 - props.thickness * 2) / 2) * 2;
  let offset = accumulated;
  const curves: Curve[] = [];
  const curvesInOrder: Curve[] = [];

  for (let i = 0; i < props.sections.length; i += 1) {
    curves.push({ sum, offset, data: props.sections[i], root: false });
    offset -= (props.sections[i].value / 100) * accumulated;
  }

  curves.push({ sum, offset, data: { color: props.rootColor }, root: true });

  // Reorder curves to layer appropriately and selectively set caps to round

  curvesInOrder.push({ ...curves[curves.length - 1], lineRoundCaps: false });
  if (curves.length > 2) {
    curvesInOrder.push({ ...curves[0], lineRoundCaps: props.renderRoundedLineCaps });
    curvesInOrder.push({
      ...curves[curves.length - 2],
      lineRoundCaps: props.renderRoundedLineCaps,
    });
    for (let i = 1; i <= curves.length - 3; i += 1) {
      curvesInOrder.push({ ...curves[i], lineRoundCaps: false });
    }
  } else {
    curvesInOrder.push({ ...curves[0], lineRoundCaps: props.renderRoundedLineCaps });
  }

  return curvesInOrder;
}
