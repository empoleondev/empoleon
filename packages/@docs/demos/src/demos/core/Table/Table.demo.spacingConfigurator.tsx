import { Table, TableProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { elements } from './_data';
import { For } from 'solid-js';

function Wrapper(props: TableProps) {
  return (
    <Table {...props}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Position</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Symbol</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <For each={elements}>
          {(element) => (
            <Table.Tr>
              <Table.Td>{element.position}</Table.Td>
              <Table.Td>{element.name}</Table.Td>
              <Table.Td>{element.symbol}</Table.Td>
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

export const spacingConfigurator: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    { prop: 'horizontalSpacing', type: 'size', libraryValue: 'xs', initialValue: 'xs' },
    { prop: 'verticalSpacing', type: 'size', initialValue: 'xs', libraryValue: 'xs' },
  ],
};
