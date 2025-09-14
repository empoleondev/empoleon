import { IconAt } from '@tabler/icons-solidjs';
import { Button } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { ButtonStylesApi } from '@docs/styles-api';

const code = `
import { Button } from '@empoleon/core';
import { IconAt } from '@tabler/icons-solidjs';

function Demo() {
  return <Button{{props}} leftSection={<IconAt size={16} />}>Your email</Button>;
}
`;

function Demo(props: any) {
  return (
    <Button leftSection={<IconAt size={16} />} {...props}>
      Your email
    </Button>
  );
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: ButtonStylesApi,
  component: Demo,
  code,
  centered: true,
};
