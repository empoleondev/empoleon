import { For, splitProps } from 'solid-js';
import { Box, ElementProps } from '../../../core';
import { ColorSwatch } from '../../ColorSwatch';
import { useColorPickerContext } from '../ColorPicker.context';

export interface SwatchesProps extends ElementProps<'div'> {
  size?: string | number;
  data: string[];
  swatchesPerRow?: number;
  focusable?: boolean;
  onChangeEnd?: (color: string) => void;
  setValue: (value: string) => void;
}

export const Swatches = (props: SwatchesProps) => {
  const [local, others] = splitProps(props, [
    'datatype',
    'setValue',
    'onChangeEnd',
    'size',
    'focusable',
    'data',
    'swatchesPerRow',
    'ref',
  ]);

  const ctx = useColorPickerContext()!;

  const colors = (
    <For each={local.data}>
      {(color) => (
        <ColorSwatch
          {...ctx.getStyles('swatch')}
          unstyled={ctx.unstyled}
          component="button"
          type="button"
          color={color}
          radius="sm"
          onClick={() => {
            local.setValue(color);
            local.onChangeEnd?.(color);
          }}
          aria-label={color}
          tabIndex={local.focusable ? 0 : -1}
          data-swatch
        />
      )}
    </For>
  );

  return (
    <Box {...ctx.getStyles('swatches')} ref={local.ref} {...others}>
      {colors}
    </Box>
  );
};

Swatches.displayName = '@empoleon/core/Swatches';
