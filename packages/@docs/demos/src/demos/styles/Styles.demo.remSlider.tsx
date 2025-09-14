import { Slider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createEffect } from 'solid-js';

const code = `
import { Slider } from '@empoleon/core';

function Demo() {
  return (
    <Slider
      defaultValue={100}
      min={70}
      max={130}
      onChange={(value) => {
        document.documentElement.style.fontSize = \`\${value}%\`;
      }}
    />
  );
}
`;

function Demo() {
  createEffect(
    () => () => {
      document.documentElement.style.fontSize = '100%';
    }
  );

  return (
    <Slider
      defaultValue={100}
      min={70}
      max={130}
      onChange={(value) => {
        document.documentElement.style.fontSize = `${value}%`;
      }}
    />
  );
}

export const remSlider: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
