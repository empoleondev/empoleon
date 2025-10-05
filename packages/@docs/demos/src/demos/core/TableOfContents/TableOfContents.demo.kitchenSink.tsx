import { TableOfContents } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { TableOfContents } from '@empoleon/core';

function Demo() {
  return (
    <TableOfContents
      {{props}}
      scrollSpyOptions={{
        selector: '#mdx :is(h1, h2, h3, h4, h5, h6)',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}
`;

function Wrapper(props: any) {
  return (
    <TableOfContents
      {...props}
      scrollSpyOptions={{
        selector: '#mdx :is(h1, h2, h3, h4, h5, h6)',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: [
    {
      type: 'select',
      prop: 'variant',
      initialValue: 'filled',
      libraryValue: 'filled',
      data: [
        { label: 'Filled', value: 'filled' },
        { label: 'Light', value: 'light' },
        { label: 'None', value: 'none' },
      ],
    },
    {
      type: 'color',
      prop: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      type: 'size',
      prop: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      type: 'size',
      prop: 'radius',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      type: 'number',
      prop: 'minDepthToOffset',
      initialValue: 1,
      libraryValue: 1,
      min: 0,
      max: 6,
      step: 1,
    },
    {
      type: 'number',
      prop: 'depthOffset',
      initialValue: 16,
      libraryValue: 16,
      min: 0,
      max: 60,
      step: 4,
    },
    {
      type: 'boolean',
      prop: 'autoContrast',
      initialValue: false,
      libraryValue: false,
    },
  ],
};
