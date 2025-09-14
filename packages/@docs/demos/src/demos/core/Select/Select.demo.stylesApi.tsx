import { IconAt } from '@tabler/icons-solidjs';
import { Select } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { SelectStylesApi } from '@docs/styles-api';

const code = `
import { IconAt } from '@tabler/icons-solidjs';
import { Select } from '@empoleon/core';

function Demo() {
  return (
    <Select
     {{props}}
      leftSection={<IconAt size={18} stroke='1.5' />}
      label="Select"
      description="Description"
      error="Error"
      placeholder="Select"
      data={['React', 'Angular']}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <Select
      {...props}
      dropdownOpened
      leftSection={<IconAt size={18} stroke='1.5' />}
      withAsterisk
      label="Select"
      description="Description"
      placeholder="Select"
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Node', 'Django'] },
      ]}
    />
  );
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: SelectStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
