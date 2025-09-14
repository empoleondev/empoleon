import { Table } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { elements } from './_data';
import { For } from 'solid-js';

const code = `
import { Table } from '@empoleon/core';

function Demo() {
  const rows = elements.map((element) => (
    <Table.Tr >
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table.ScrollContainer minWidth={500}>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
`;

function Demo() {
  return (
    <Table.ScrollContainer minWidth='500px'>
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
    </Table.ScrollContainer>
  );
}

export const scrollContainer: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
