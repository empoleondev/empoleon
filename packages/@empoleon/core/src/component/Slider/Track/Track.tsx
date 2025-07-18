import { JSX, splitProps } from 'solid-js';
import { Box, BoxProps } from '../../../core';
import { Marks } from '../Marks/Marks';
import { useSliderContext } from '../Slider.context';

export interface TrackProps {
  filled: number;
  offset?: number;
  marksOffset?: number;
  marks: { value: number; label?: JSX.Element }[] | undefined;
  min: number;
  max: number;
  value: number;
  children: JSX.Element;
  disabled: boolean | undefined;
  inverted: boolean | undefined;
  containerProps?: Omit<BoxProps, 'children'> & {
    ref?: any;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    onTouchStartCapture?: (event: TouchEvent) => void;
    onTouchEndCapture?: (event: TouchEvent) => void;
    onMouseDownCapture?: (event: MouseEvent) => void;
    onMouseUpCapture?: (event: MouseEvent) => void;
    onKeyDownCapture?: (event: KeyboardEvent) => void;
  };
}

export function Track(props: TrackProps) {
  const [local, others] = splitProps(props, [
    'filled',
    'children',
    'offset',
    'disabled',
    'marksOffset',
    'inverted',
    'containerProps',
  ]);

  const { getStyles } = useSliderContext();

  return (
    <Box {...getStyles('trackContainer')} mod={{ disabled: local.disabled }} {...local.containerProps}>
      <Box {...getStyles('track')} mod={{ inverted: local.inverted, disabled: local.disabled }}>
        <Box
          mod={{ inverted: local.inverted, disabled: local.disabled }}
          __vars={{
            '--slider-bar-width': `calc(${local.filled}% + var(--slider-size))`,
            '--slider-bar-offset': `calc(${local.offset}% - var(--slider-size))`,
          }}
          {...getStyles('bar')}
        />

        {local.children}

        <Marks {...others} offset={local.marksOffset} disabled={local.disabled} inverted={local.inverted} />
      </Box>
    </Box>
  );
}

Track.displayName = '@empoleon/core/SliderTrack';
