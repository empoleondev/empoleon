import { For, JSX, Show, splitProps } from 'solid-js';
import { Box } from '../../../core';
import { useSliderContext } from '../Slider.context';
import { getPosition } from '../utils/get-position/get-position';
import { isMarkFilled } from './is-mark-filled';

export interface MarksProps {
  marks: { value: number; label?: JSX.Element }[] | undefined;
  min: number;
  max: number;
  value: number;
  offset: number | undefined;
  disabled: boolean | undefined;
  inverted: boolean | undefined;
}

export function Marks(props: MarksProps) {
  const [local, _] = splitProps(props, [
    'marks',
    'min',
    'max',
    'disabled',
    'value',
    'offset',
    'inverted',
   ]);

  const { getStyles } = useSliderContext();

  return (
    <Show when={local.marks}>
      <div>
        <For each={local.marks}>
          {(mark) => (
            <Box
              {...getStyles('markWrapper')}
              __vars={{ '--mark-offset': `${getPosition({ value: mark.value, min: props.min, max: props.max })}%` }}
            >
              <Box
                {...getStyles('mark')}
                mod={{
                  filled: isMarkFilled({
                    mark,
                    value: props.value,
                    offset: props.offset,
                    inverted: props.inverted
                  }),
                  disabled: props.disabled
                }}
              />
              <Show when={mark.label}>
                <div {...getStyles('markLabel')}>{mark.label}</div>
              </Show>
            </Box>
          )}
        </For>
      </div>
    </Show>
  );
}

Marks.displayName = '@empoleon/core/SliderMarks';
