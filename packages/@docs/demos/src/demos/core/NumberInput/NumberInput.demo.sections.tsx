import { IconCurrencyDram } from '@tabler/icons-react';
import { NumberInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { NumberInput } from '@empoleon/core';
import { IconCurrencyDram } from '@tabler/icons-react';

function Demo() {
  const icon = <IconCurrencyDram size={20} stroke={1.5} />;
  return (
    <>
      <NumberInput leftSection={icon} label="With left section" placeholder="With left section" />
      <NumberInput
        rightSection={icon}
        label="With right section"
        placeholder="With right section"
        mt="md"
      />
    </>
  );
}
`;

function Demo() {
  const icon = <IconCurrencyDram size={20} stroke={1.5} />;
  return (
    <>
      <NumberInput leftSection={icon} label="With left section" placeholder="With left section" />
      <NumberInput
        rightSection={icon}
        label="With right section"
        placeholder="With right section"
        mt="md"
      />
    </>
  );
}

export const sections: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
