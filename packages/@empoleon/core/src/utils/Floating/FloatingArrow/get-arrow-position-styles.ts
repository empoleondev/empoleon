import { JSX } from 'solid-js';
import type { ArrowPosition, FloatingPlacement, FloatingPosition, FloatingSide } from '../types';

function horizontalSide(
  placement: FloatingPlacement | 'center',
  arrowY: number | undefined,
  arrowOffset: number,
  arrowPosition: ArrowPosition
) {
  if (placement === 'center' || arrowPosition === 'center') {
    return { top: `${arrowY}px` };
  }

  if (placement === 'end') {
    return { bottom: `${arrowOffset}px` };
  }

  if (placement === 'start') {
    return { top: `${arrowOffset}px` };
  }

  return {};
}

function verticalSide(
  placement: FloatingPlacement | 'center',
  arrowX: number | undefined,
  arrowOffset: number,
  arrowPosition: ArrowPosition,
  dir: 'rtl' | 'ltr'
) {
  if (placement === 'center' || arrowPosition === 'center') {
    return { left: arrowX };
  }

  if (placement === 'end') {
    return { [dir === 'ltr' ? 'right' : 'left']: arrowOffset };
  }

  if (placement === 'start') {
    return { [dir === 'ltr' ? 'left' : 'right']: arrowOffset };
  }

  return {};
}

const radiusByFloatingSide: Record<
  FloatingSide,
  keyof Pick<
    JSX.CSSProperties,
    | 'border-bottom-left-radius'
    | 'border-bottom-right-radius'
    | 'border-top-left-radius'
    | 'border-top-right-radius'
  >
> = {
  bottom: 'border-top-left-radius',
  left: 'border-top-right-radius',
  right: 'border-bottom-left-radius',
  top: 'border-bottom-right-radius',
};

export function getArrowPositionStyles(props: {
  position: FloatingPosition;
  arrowSize: number;
  arrowOffset: number;
  arrowRadius: number;
  arrowPosition: ArrowPosition;
  arrowX: number | undefined;
  arrowY: number | undefined;
  dir: 'rtl' | 'ltr';
}) {
  const [side, placement = 'center'] = props.position.split('-') as [FloatingSide, FloatingPlacement];
  const baseStyles = {
    width: `${props.arrowSize}px`,
    height: `${props.arrowSize}px`,
    transform: 'rotate(45deg)',
    position: 'absolute',
    [radiusByFloatingSide[side]]: props.arrowRadius,
  };

  const arrowPlacement = -props.arrowSize / 2;

  if (side === 'left') {
    return {
      ...baseStyles,
      ...horizontalSide(placement, props.arrowY, props.arrowOffset, props.arrowPosition),
      right: `${arrowPlacement}px`,
      'border-left-color': 'transparent',
      'border-bottom-color': 'transparent',
      'clip-path': 'polygon(100% 0, 0 0, 100% 100%)',
    };
  }

  if (side === 'right') {
    return {
      ...baseStyles,
      ...horizontalSide(placement, props.arrowY, props.arrowOffset, props.arrowPosition),
      left: `${arrowPlacement}px`,
      'border-right-color': 'transparent',
      'border-top-color': 'transparent',
      'clip-path': 'polygon(0 100%, 0 0, 100% 100%)',
    };
  }

  if (side === 'top') {
    return {
      ...baseStyles,
      ...verticalSide(placement, props.arrowX, props.arrowOffset, props.arrowPosition, props.dir),
      bottom: `${arrowPlacement}px`,
      'border-top-color': 'transparent',
      'border-left-color': 'transparent',
      'clip-path': 'polygon(0 100%, 100% 100%, 100% 0)',
    };
  }

  if (side === 'bottom') {
    return {
      ...baseStyles,
      ...verticalSide(placement, props.arrowX, props.arrowOffset, props.arrowPosition, props.dir),
      top: `${arrowPlacement}px`,
      'border-bottom-color': 'transparent',
      'border-right-color': 'transparent',
      'clip-path': 'polygon(0 100%, 0 0, 100% 0)',
    };
  }

  return {};
}
