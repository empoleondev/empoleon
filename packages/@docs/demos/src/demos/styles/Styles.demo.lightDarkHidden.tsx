import { Button } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button } from '@empoleon/core';

function Demo() {
  return (
    <>
      <Button color="cyan" lightHidden>
        Visible in dark color scheme only
      </Button>

      <Button color="pink" darkHidden>
        Visible in light color scheme only
      </Button>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Button color="cyan" lightHidden>
        Visible in dark color scheme only
      </Button>

      <Button color="pink" darkHidden>
        Visible in light color scheme only
      </Button>
    </>
  );
}

export const lightDarkHidden: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
