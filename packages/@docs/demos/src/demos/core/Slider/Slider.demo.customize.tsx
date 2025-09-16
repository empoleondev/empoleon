import { Box, Slider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './Slider.demo.customize.module.css';

const code = `
import { Slider } from '@empoleon/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Slider
      defaultValue={40}
      size={2}
      classNames={classes}
      marks={[
        { value: 20, label: '20%' },
        { value: 50, label: '50%' },
        { value: 80, label: '80%' },
      ]}
    />
  );
}
`;

const cssCode = `
.track {
  &::before {
    background-color: light-dark(var(--empoleon-color-blue-1), var(--empoleon-color-dark-3));
  }
}

.mark {
  width: 6px;
  height: 6px;
  border-radius: 6px;
  transform: translateX(-3px) translateY(-2px);
  border-color: light-dark(var(--empoleon-color-blue-1), var(--empoleon-color-dark-3));

  &[data-filled] {
    border-color: var(--empoleon-color-blue-6);
  }
}

.markLabel {
  font-size: var(--empoleon-font-size-xs);
  margin-bottom: 5px;
  margin-top: 0;
}

.thumb {
  height: 16px;
  width: 16px;
  background-color: var(--empoleon-color-white);
  border-width: 1px;
  box-shadow: var(--empoleon-shadow-sm);
}
`;

function Demo() {
  return (
    <Box maw={400} pt={15} pb={20} mx="auto">
      <Slider
        defaultValue={40}
        size={2}
        classNames={classes}
        marks={[
          { value: 20, label: '20%' },
          { value: 50, label: '50%' },
          { value: 80, label: '80%' },
        ]}
      />
    </Box>
  );
}

export const customize: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
  ],
};
