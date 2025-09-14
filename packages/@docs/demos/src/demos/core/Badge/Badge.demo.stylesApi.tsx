import { IconAt } from '@tabler/icons-solidjs';
import { Badge } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { BadgeStylesApi } from '@docs/styles-api';

const code = `
import { Badge } from '@empoleon/core';
import { IconAt } from '@tabler/icons-solidjs';

function Demo() {
  const icon = <IconAt size={12} />;

  return (
    <Badge leftSection={icon} rightSection={icon}{{props}}>
      Badge component
    </Badge>
  );
}
`;

function Demo(props: any) {
  const icon = <IconAt size={12} />;

  return (
    <Badge leftSection={icon} rightSection={icon} {...props}>
      Badge component
    </Badge>
  );
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: BadgeStylesApi,
  component: Demo,
  centered: true,
  code,
};
