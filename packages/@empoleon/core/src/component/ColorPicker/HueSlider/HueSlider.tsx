import { splitProps } from 'solid-js';
import { rem, useProps } from '../../../core';
import { ColorSlider, ColorSliderProps } from '../ColorSlider/ColorSlider';

export interface HueSliderProps extends Omit<ColorSliderProps, 'maxValue' | 'overlays' | 'round'> {}

export const HueSlider = ((_props: HueSliderProps) => {
  const props = useProps('HueSlider', {}, _props);

  const [local, others] = splitProps(props, [
    'value',
    'onChange',
    'onChangeEnd',
    'color',
    'ref'
  ]);

  return (
    <ColorSlider
      {...others}
      ref={local.ref}
      value={local.value}
      onChange={local.onChange}
      onChangeEnd={local.onChangeEnd}
      maxValue={360}
      thumbColor={`hsl(${local.value}, 100%, 50%)`}
      round
      data-hue
      overlays={[
        {
          'background-image':
            'linear-gradient(to right,hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(170,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))',
        },
        {
          'box-shadow': `rgba(0, 0, 0, .1) 0 0 0 ${rem(1)} inset, rgb(0, 0, 0, .15) 0 0 ${rem(4)} inset`,
        },
      ]}
    />
  );
});

// HueSlider.displayName = '@empoleon/core/HueSlider';
