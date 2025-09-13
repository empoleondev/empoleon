import { Slider } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Slider } from '@empoleon/core';

function Demo() {
  return (
    <Slider
      domain={[0, 100]}
      min={10}
      max={90}
      defaultValue={25}
      marks={[
        { value: 10, label: 'min' },
        { value: 90, label: 'max' },
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <Slider
      domain={[0, 100]}
      min={10}
      max={90}
      defaultValue={25}
      mb={40}
      marks={[
        { value: 10, label: 'min' },
        { value: 90, label: 'max' },
      ]}
    />
  );
}

export const domain: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 400,
  centered: true,
};
