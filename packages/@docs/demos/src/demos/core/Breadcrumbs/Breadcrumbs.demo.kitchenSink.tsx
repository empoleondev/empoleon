import { For } from 'solid-js';
import { Anchor, Breadcrumbs, BreadcrumbsProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Breadcrumbs, Anchor } from '@empoleon/core';

const items = [
  { title: 'Home', href: '#' },
  { title: 'Products', href: '#' },
  { title: 'Category', href: '#' },
];

function Demo() {
  const getSeparator = () => {
    switch (props.separatorType) {
      case 'slash':
        return '/';
      case 'arrow':
        return '→';
      case 'chevron':
        return '›';
      case 'dot':
        return '•';
      case 'pipe':
        return '|';
      default:
        return '/';
    }
  };

  return (
    <Breadcrumbs{{props}} separator={getSeparator()}>
      <For each={items}>
        {(item) => (
          <Anchor href={item.href}>
            {item.title}
          </Anchor>
        )}
      </For>
    </Breadcrumbs>
  );
}
`;

const items = [
  { title: 'Home', href: '#' },
  { title: 'Products', href: '#' },
  { title: 'Category', href: '#' },
];

function Demo(
  props: BreadcrumbsProps & {
    separatorType?: string;
  }
) {
  const getSeparator = () => {
    switch (props.separatorType) {
      case 'slash':
        return '/';
      case 'arrow':
        return '→';
      case 'chevron':
        return '›';
      case 'dot':
        return '•';
      case 'pipe':
        return '|';
      default:
        return '/';
    }
  };

  return (
    <Breadcrumbs {...props} separator={getSeparator()}>
      <For each={items}>{(item) => <Anchor href={item.href}>{item.title}</Anchor>}</For>
    </Breadcrumbs>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: [
    {
      prop: 'separatorType',
      type: 'select',
      initialValue: 'slash',
      libraryValue: 'slash',
      data: [
        { label: 'Slash (/)', value: 'slash' },
        { label: 'Arrow (→)', value: 'arrow' },
        { label: 'Chevron (›)', value: 'chevron' },
        { label: 'Dot (•)', value: 'dot' },
        { label: 'Pipe (|)', value: 'pipe' },
      ],
    },
    {
      prop: 'separatorMargin',
      type: 'size',
      initialValue: 'xs',
      libraryValue: 'xs',
    },
  ],
};
