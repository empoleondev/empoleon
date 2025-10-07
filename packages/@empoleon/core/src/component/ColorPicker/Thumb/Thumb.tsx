import { JSX, splitProps } from 'solid-js';
import { Box } from '../../../core';

export interface ThumbProps extends JSX.HTMLAttributes<HTMLDivElement> {
  variant?: string;
  position: { x: number; y: number };
  ref?: HTMLDivElement;
}

export const Thumb = (props: ThumbProps) => {
  const [local, others] = splitProps(props, ['position', 'ref']);

  return (
    // @ts-ignore
    <Box
      ref={local.ref}
      __vars={{
        '--thumb-y-offset': `${local.position.y * 100}%`,
        '--thumb-x-offset': `${local.position.x * 100}%`,
      }}
      {...others}
    />
  );
};

Thumb.displayName = '@empoleon/core/ColorPickerThumb';
