import { Table, TableProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { elements } from './_data';
import { For } from 'solid-js';

function Wrapper(props: TableProps) {
  return (
    <Table {...props}>
      {props.captionSide && (
        <Table.Caption>Some elements from periodic table</Table.Caption>
      )}
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <For each={elements}>
          {(element) => (
            <Table.Tr>
              <Table.Td>{element.position}</Table.Td>
              <Table.Td>{element.name}</Table.Td>
              <Table.Td>{element.symbol}</Table.Td>
              <Table.Td>{element.mass}</Table.Td>
            </Table.Tr>
          )}
        </For>
      </Table.Tbody>
      <Table.Tfoot>
        <Table.Tr>
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Tfoot>
    </Table>
  );
}

const code = `
import { Table } from '@empoleon/core';

function Demo() {
  return (
    <Table{{props}}>
      <Table.Caption>Some elements from periodic table</Table.Caption>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {/* {...rows} */}
      </Table.Tbody>
      <Table.Tfoot>
        <Table.Tr>
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Tfoot>
    </Table>
  );
}
`;

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'striped',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'highlightOnHover',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'withTableBorder',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'withColumnBorders',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'withRowBorders',
      type: 'boolean',
      initialValue: true,
      libraryValue: true
    },
    {
      prop: 'horizontalSpacing',
      type: 'size',
      initialValue: 'xs',
      libraryValue: 'xs'
    },
    {
      prop: 'verticalSpacing',
      type: 'size',
      initialValue: 'xs',
      libraryValue: 'xs'
    },
    {
      prop: 'captionSide',
      type: 'select',
      initialValue: 'top',
      libraryValue: 'top',
      data: [
        { label: 'Top', value: 'top' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },
    {
      prop: 'stickyHeader',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'stickyHeaderOffset',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 200,
      step: 10
    },
    {
      prop: 'layout',
      type: 'select',
      initialValue: 'auto',
      libraryValue: 'auto',
      data: [
        { label: 'Auto', value: 'auto' },
        { label: 'Fixed', value: 'fixed' },
      ],
    },
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'default',
      libraryValue: 'default',
      data: [
        { label: 'Default', value: 'default' },
        { label: 'Vertical', value: 'vertical' },
      ],
    },
    {
      prop: 'tabularNums',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
  ],
};
