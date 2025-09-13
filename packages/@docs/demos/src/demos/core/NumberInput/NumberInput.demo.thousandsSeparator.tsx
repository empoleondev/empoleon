import { NumberInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { NumberInput } from '@empoleon/core';

function Demo() {
  return (
    <>
      <NumberInput
        label="Thousands are separated with a coma"
        placeholder="Thousands are separated with a coma"
        thousandSeparator=","
        defaultValue={1_000_000}
      />

      <NumberInput
        label="Thousands are separated with a space"
        placeholder="Thousands are separated with a space"
        thousandSeparator=" "
        defaultValue={1_000_000}
        mt="md"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <NumberInput
        label="Thousands are separated with a coma"
        placeholder="Thousands are separated with a coma"
        thousandSeparator=","
        defaultValue={1_000_000}
      />

      <NumberInput
        label="Thousands are separated with a space"
        placeholder="Thousands are separated with a space"
        thousandSeparator=" "
        defaultValue={1_000_000}
        mt="md"
      />
    </>
  );
}

export const thousandsSeparator: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
