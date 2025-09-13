import { useState } from 'react';
import { Button, Progress } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { Button, Progress } from '@empoleon/core';

function Demo() {
  const [value, setValue] = useState(50);
  return (
    <>
      <Progress value={value} size="lg" transitionDuration={200} />
      <Button onClick={() => setValue(Math.random() * 100)} mt="md">
        Set random value
      </Button>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = useState(50);
  return (
    <>
      <Progress value={value} size="lg" transitionDuration={200} />
      <Button onClick={() => setValue(Math.random() * 100)} mt="md">
        Set random value
      </Button>
    </>
  );
}

export const transition: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
};
