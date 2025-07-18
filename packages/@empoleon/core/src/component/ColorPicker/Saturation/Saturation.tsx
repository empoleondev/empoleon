import { createEffect, createSignal, splitProps } from 'solid-js';
import { clampUseMovePosition, useMove, UseMovePosition } from '@empoleon/hooks';
import { Box, ElementProps, EmpoleonSize } from '../../../core';
import { useColorPickerContext } from '../ColorPicker.context';
import { HsvaColor } from '../ColorPicker.types';
import { convertHsvaTo } from '../converters';
import { Thumb } from '../Thumb/Thumb';

export interface SaturationProps extends ElementProps<'div', 'onChange'> {
  value: HsvaColor;
  onChange: (color: Partial<HsvaColor>) => void;
  onChangeEnd: (color: Partial<HsvaColor>) => void;
  onScrubStart?: () => void;
  onScrubEnd?: () => void;
  saturationLabel?: string;
  size: EmpoleonSize | (string & {});
  color: string;
  focusable?: boolean;
  className?: string;
}

export function Saturation(props: SaturationProps) {
  const [local, others] = splitProps(props, [
    'className',
    'onChange',
    'onChangeEnd',
    'value',
    'saturationLabel',
    'focusable',
    'size',
    'color',
    'onScrubStart',
    'onScrubEnd',
  ]);

  const focusable = local.focusable ?? true;

  const { getStyles } = useColorPickerContext()!;

  const [position, setPosition] = createSignal({ x: local.value.s / 100, y: 1 - local.value.v / 100 });
  let positionRef: { x: number; y: number } = position();

  const { ref } = useMove(
    ({ x, y }: UseMovePosition) => {
      positionRef = { x, y };
      local.onChange({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) });
    },
    {
      onScrubEnd: () => {
        const { x, y } = positionRef;
        local.onChangeEnd({ s: Math.round(x * 100), v: Math.round((1 - y) * 100) });
        local.onScrubEnd?.();
      },
      onScrubStart: local.onScrubStart,
    }
  );

  createEffect(() => {
    setPosition({ x: local.value.s / 100, y: 1 - local.value.v / 100 });
  });

  const handleArrow = (event: KeyboardEvent, pos: UseMovePosition) => {
    event.preventDefault();
    const _position = clampUseMovePosition(pos);
    local.onChange({ s: Math.round(_position.x * 100), v: Math.round((1 - _position.y) * 100) });
    local.onChangeEnd({ s: Math.round(_position.x * 100), v: Math.round((1 - _position.y) * 100) });
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp': {
        handleArrow(event, { y: position().y - 0.05, x: position().x });
        break;
      }

      case 'ArrowDown': {
        handleArrow(event, { y: position().y + 0.05, x: position().x });
        break;
      }

      case 'ArrowRight': {
        handleArrow(event, { x: position().x + 0.05, y: position().y });
        break;
      }

      case 'ArrowLeft': {
        handleArrow(event, { x: position().x - 0.05, y: position().y });
        break;
      }
    }
  };

  return (
    <Box
      {...getStyles('saturation')}
      ref={ref as any}
      {...others}
      role="slider"
      aria-label={local.saturationLabel}
      aria-valuenow={position().x}
      aria-valuetext={convertHsvaTo('rgba', local.value)}
      tabIndex={focusable ? 0 : -1}
      onKeyDown={handleKeyDown}
    >
      <div
        {...getStyles('saturationOverlay', {
          style: { 'background-color': `hsl(${local.value.h}, 100%, 50%)` },
        })}
      />

      <div
        {...getStyles('saturationOverlay', {
          style: { 'background-image': 'linear-gradient(90deg, #fff, transparent)' },
        })}
      />

      <div
        {...getStyles('saturationOverlay', {
          style: { 'background-image': 'linear-gradient(0deg, #000, transparent)' },
        })}
      />

      <Thumb position={position()} {...getStyles('thumb', { style: { backgroundColor: local.color } })} />
    </Box>
  );
}

Saturation.displayName = '@empoleon/core/Saturation';
