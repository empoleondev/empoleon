import { Accessor, createMemo, JSX, Show, splitProps } from 'solid-js';
import { useDirection } from '../../../core';
import { ArrowPosition, FloatingPosition } from '../types';
import { getArrowPositionStyles } from './get-arrow-position-styles';

interface FloatingArrowProps extends JSX.HTMLAttributes<HTMLDivElement> {
  position: Accessor<FloatingPosition>;
  arrowSize: Accessor<number>;
  arrowOffset: Accessor<number>;
  arrowRadius: Accessor<number>;
  arrowPosition: Accessor<ArrowPosition>;
  arrowX: Accessor<number | undefined>;
  arrowY: Accessor<number | undefined>;
  visible: Accessor<boolean | undefined>;
  ref?: (element: HTMLDivElement) => void;
}

export function FloatingArrow(props: FloatingArrowProps) {
  const [local, others] = splitProps(props, [
    'position',
    'arrowSize',
    'arrowOffset',
    'arrowRadius',
    'arrowPosition',
    'visible',
    'arrowX',
    'arrowY',
    'style',
    'ref',
  ]);

  const { dir } = useDirection();

  const finalStyles = createMemo(() => ({
    ...(typeof local.style === 'object' && local.style !== null ? local.style : {}),
    ...getArrowPositionStyles({
      position: local.position(),
      arrowSize: local.arrowSize(),
      arrowOffset: local.arrowOffset(),
      arrowRadius: local.arrowRadius(),
      arrowPosition: local.arrowPosition(),
      dir,
      arrowX: local.arrowX(),
      arrowY: local.arrowY(),
    }),
  }));

  return (
    <Show when={local.visible()} fallback={null}>
    <div
      {...others}
      ref={local.ref}
      style={finalStyles()}
    />
    </Show>
  );
}

FloatingArrow.displayName = '@empoleon/core/FloatingArrow';
