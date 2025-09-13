import { useState } from 'react';
import { Button, SemiCircleProgress } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { Button, SemiCircleProgress } from '@empoleon/core';

function Demo() {
  const [value, setValue] = useState(30);

  return (
    <>
      <SemiCircleProgress value={value} transitionDuration={250} label={\`\${value}%\`} />

      <Button onClick={() => setValue(Math.floor(Math.random() * 100))} mt="xl" fullWidth>
        Set random value
      </Button>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = useState(30);

  return (
    <>
      <SemiCircleProgress value={value} transitionDuration={250} label={`${value}%`} />

      <Button onClick={() => setValue(Math.floor(Math.random() * 100))} mt="xl" fullWidth>
        Set random value
      </Button>
    </>
  );
}

export const transitions: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
