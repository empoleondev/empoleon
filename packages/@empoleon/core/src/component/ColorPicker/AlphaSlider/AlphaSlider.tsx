import { splitProps } from 'solid-js';
import { rem, useProps } from '../../../core';
import { ColorSlider, ColorSliderProps } from '../ColorSlider/ColorSlider';
import { round } from '../converters/parsers';

export interface AlphaSliderProps
  extends Omit<ColorSliderProps, 'maxValue' | 'overlays' | 'round'> {
  color: string;
}

const defaultProps: Partial<AlphaSliderProps> = {};

export const AlphaSlider = (_props: AlphaSliderProps) => {
  const props = useProps('AlphaSlider', defaultProps, _props);

  const [local, others] = splitProps(props, ['value', 'onChange', 'onChangeEnd', 'color', 'ref']);

  return (
    <ColorSlider
      {...others}
      ref={local.ref}
      value={local.value}
      onChange={(val) => local.onChange?.(round(val, 2))}
      onChangeEnd={(val) => local.onChangeEnd?.(round(val, 2))}
      maxValue={1}
      round={false}
      data-alpha
      overlays={[
        {
          'background-image':
            'linear-gradient(45deg, var(--slider-checkers) 25%, transparent 25%), linear-gradient(-45deg, var(--slider-checkers) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--slider-checkers) 75%), linear-gradient(-45deg, var(--empoleon-color-body) 75%, var(--slider-checkers) 75%)',
          'background-size': `${rem(8)} ${rem(8)}`,
          'background-position': `0 0, 0 ${rem(4)}, ${rem(4)} ${rem(-4)}, ${rem(-4)} 0`,
        },
        {
          'background-image': `linear-gradient(90deg, transparent, ${local.color})`,
        },
        {
          'box-shadow': `rgba(0, 0, 0, .1) 0 0 0 ${rem(1)} inset, rgb(0, 0, 0, .15) 0 0 ${rem(
            4
          )} inset`,
        },
      ]}
    />
  );
};

AlphaSlider.displayName = '@empoleon/core/AlphaSlider';
