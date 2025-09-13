import { RangeSlider } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { RangeSlider } from '@empoleon/core';

function Demo() {
  return (
    <RangeSlider
      restrictToMarks
      defaultValue={[5, 15]}
      marks={[
        { value: 5 },
        { value: 15 },
        { value: 25 },
        { value: 35 },
        { value: 70 },
        { value: 80 },
        { value: 90 },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <RangeSlider
      restrictToMarks
      defaultValue={[5, 15]}
      marks={[
        { value: 5 },
        { value: 15 },
        { value: 25 },
        { value: 35 },
        { value: 70 },
        { value: 80 },
        { value: 90 },
      ]}
    />
  );
}

export const restrictToMarks: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
};
