import { JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  ElementProps,
  EmpoleonColor,
  EmpoleonRadius,
  EmpoleonSize,
} from '../../../core';
import { useSliderContext } from '../Slider.context';

export interface SliderRootProps extends BoxProps, ElementProps<'div'> {
  size: EmpoleonSize | (string & {}) | number;
  children: JSX.Element;
  color: EmpoleonColor | undefined;
  disabled: boolean | undefined;
  variant?: string;
  thumbSize: string | number | undefined;
  radius: EmpoleonRadius | undefined;
  onMouseDownCapture?: (event: MouseEvent | TouchEvent) => void;
  onKeyDownCapture?: (event: KeyboardEvent) => void;
}

export function SliderRoot(props: SliderRootProps) {
  const [local, others] = splitProps(props, [
    'size',
    'color',
    'disabled',
    'variant',
    'thumbSize',
    'radius',
    'ref',
  ]);

  const { getStyles } = useSliderContext();

  return (
    <Box
      tabIndex={-1}
      variant={local.variant}
      size={local.size}
      ref={local.ref}
      {...getStyles('root')}
      {...others}
    />
  );
}

SliderRoot.displayName = '@empoleon/core/SliderRoot';
