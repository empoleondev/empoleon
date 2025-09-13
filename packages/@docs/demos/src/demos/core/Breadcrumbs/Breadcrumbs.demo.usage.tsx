import { Anchor, Breadcrumbs } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Breadcrumbs, Anchor } from '@empoleon/core';

const items = [
  { title: 'Mantine', href: '#' },
  { title: 'Mantine hooks', href: '#' },
  { title: 'use-id', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

function Demo() {
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
        {items}
      </Breadcrumbs>
    </>
  );
}
`;

const items = [
  { title: 'Mantine', href: 'https://mantine.dev' },
  { title: 'Mantine hooks', href: '#' },
  { title: 'use-id', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

function Demo() {
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Breadcrumbs
        separator="→"
        mt="xs"
        separatorMargin="md"
        classNames={{ separator: 'mantine-rotate-rtl' }}
      >
        {items}
      </Breadcrumbs>
    </>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
