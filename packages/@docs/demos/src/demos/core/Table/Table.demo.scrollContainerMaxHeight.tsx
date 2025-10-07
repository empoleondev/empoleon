import { For } from 'solid-js';
import { Table } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { elementsLong } from './_data';

const code = `
import { For } from 'solid-js';
import { Table } from '@empoleon/core';

function Demo() {
  return (
    <Table.ScrollContainer minWidth={500} maxHeight={300}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <For each={elementsLong}>
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
    </Table.ScrollContainer>
  );
}
`;

function Demo() {
  return (
    <Table.ScrollContainer minWidth="500px" maxHeight="300px">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <For each={elementsLong}>
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
    </Table.ScrollContainer>
  );
}

export const scrollContainerMaxHeight: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
