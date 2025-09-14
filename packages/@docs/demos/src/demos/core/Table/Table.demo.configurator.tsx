import { Table, TableProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { elements } from './_data';
import { For } from 'solid-js';

function Wrapper(props: TableProps) {
  return (
    <Table {...props}>
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
    </Table>
  );
}

const code = `
import { Table } from '@empoleon/core';

function Demo() {
  return (
    <Table{{props}}>
      {/* {...rows} */}
    </Table>
  );
}
`;

export const configurator: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    { prop: 'striped', type: 'boolean', initialValue: false, libraryValue: false },
    { prop: 'highlightOnHover', type: 'boolean', initialValue: false, libraryValue: false },
    { prop: 'withTableBorder', type: 'boolean', initialValue: false, libraryValue: false },
    { prop: 'withColumnBorders', type: 'boolean', initialValue: false, libraryValue: false },
    { prop: 'withRowBorders', type: 'boolean', initialValue: true, libraryValue: true },
  ],
};
