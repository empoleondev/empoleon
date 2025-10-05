import { List, ListProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { IconCircleCheck } from '@tabler/icons-solidjs';

const code = `
import { List } from '@empoleon/core';
import { IconCircleCheck } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <List{{props}}>
      <List.Item>Clone or download repository from GitHub</List.Item>
      <List.Item>Install dependencies with yarn</List.Item>
      <List.Item>To start development server run npm start command</List.Item>
      <List.Item>Run tests to make sure your changes do not break the build</List.Item>
      <List.Item>Submit a pull request once you are done</List.Item>
    </List>
  );
}
`;

function Demo(props: ListProps & { iconType?: string }) {
  const getIcon = () => {
    if (props.iconType === 'check') {
      return () => <IconCircleCheck style={{ width: '16px', height: '16px' }} />;
    }
    return undefined;
  };

  return (
    <List {...props} icon={getIcon()}>
      <List.Item>Clone or download repository from GitHub</List.Item>
      <List.Item>Install dependencies with yarn</List.Item>
      <List.Item>To start development server run npm start command</List.Item>
      <List.Item>Run tests to make sure your changes do not break the build</List.Item>
      <List.Item>Submit a pull request once you are done</List.Item>
    </List>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  controls: [
    {
      prop: 'type',
      type: 'segmented',
      data: [
        { value: 'unordered', label: 'Unordered' },
        { value: 'ordered', label: 'Ordered' },
      ],
      initialValue: 'unordered',
      libraryValue: 'unordered',
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'withPadding',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'center',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'spacing',
      type: 'size',
      initialValue: 'xs',
      libraryValue: 'xs',
    },
    {
      prop: 'listStyleType',
      type: 'select',
      initialValue: 'disc',
      libraryValue: 'disc',
      data: [
        { label: 'Disc', value: 'disc' },
        { label: 'Circle', value: 'circle' },
        { label: 'Square', value: 'square' },
        { label: 'Decimal', value: 'decimal' },
        { label: 'Lower Alpha', value: 'lower-alpha' },
        { label: 'Upper Alpha', value: 'upper-alpha' },
        { label: 'Lower Roman', value: 'lower-roman' },
        { label: 'Upper Roman', value: 'upper-roman' },
        { label: 'None', value: 'none' },
      ],
    },
    {
      prop: 'iconType',
      type: 'select',
      initialValue: 'none',
      libraryValue: 'none',
      data: [
        { label: 'None', value: 'none' },
        { label: 'Check Icon', value: 'check' },
      ],
    },
  ],
};
