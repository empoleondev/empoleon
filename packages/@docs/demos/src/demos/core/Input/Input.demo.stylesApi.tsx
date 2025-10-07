import { IconAt, IconChevronDown } from '@tabler/icons-solidjs';
import { Input } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { InputStylesApi } from '@docs/styles-api';

const code = `
import { Input } from '@empoleon/core';

function Demo() {
  const at = <IconAt size={16} stroke='1.5' />;
  const chevron = <IconChevronDown size={16} stroke='1.5' />;
  return <Input{{props}} placeholder="Input component" leftSection={at} rightSection={chevron} />;
}
`;

function Demo(props: any) {
  const at = <IconAt size={16} stroke="1.5" />;
  const chevron = <IconChevronDown size={16} stroke="1.5" />;
  return <Input placeholder="Input component" leftSection={at} rightSection={chevron} {...props} />;
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: InputStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
