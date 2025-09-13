import { Burger } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { useDisclosure } from '@empoleon/hooks';
import { Burger } from '@empoleon/core';

function Demo() {
  const [opened, { toggle }] = useDisclosure();
  return <Burger{{props}} opened={opened} onClick={toggle} aria-label="Toggle navigation" />;
}
`;

function Wrapper(props: any) {
  const [opened, { toggle }] = useDisclosure();
  return <Burger {...props} opened={opened} onClick={toggle} aria-label="Toggle navigation" />;
}

export const usage: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [{ type: 'size', prop: 'size', initialValue: 'md', libraryValue: 'md' }],
};
