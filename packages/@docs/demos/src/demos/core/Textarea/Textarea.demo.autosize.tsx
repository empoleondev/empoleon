import { Textarea } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Textarea } from '@empoleon/core';

function Demo() {
  return (
    <>
      <Textarea
        placeholder="Autosize with no rows limit"
        label="Autosize with no rows limit"
        autosize
        minRows={2}
      />

      <Textarea
        label="Autosize with 4 rows max"
        placeholder="Autosize with 4 rows max"
        autosize
        minRows={2}
        maxRows={4}
      />
    </>
  );
}

`;

function Demo() {
  return (
    <>
      <Textarea
        placeholder="Autosize with no rows limit"
        label="Autosize with no rows limit"
        autosize
        minRows={2}
      />

      <Textarea
        label="Autosize with 4 rows max"
        placeholder="Autosize with 4 rows max"
        autosize
        minRows={2}
        maxRows={4}
        mt="md"
      />
    </>
  );
}

export const autosize: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  maxWidth: 340,
  centered: true,
};
