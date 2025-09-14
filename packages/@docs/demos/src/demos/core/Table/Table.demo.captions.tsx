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

  const ths = (
    <Table.Tr>
      <Table.Th>Element position</Table.Th>
      <Table.Th>Element name</Table.Th>
      <Table.Th>Symbol</Table.Th>
      <Table.Th>Atomic mass</Table.Th>
    </Table.Tr>
  );

  return (
    <Table captionSide="bottom">
      <Table.Caption>Some elements from periodic table</Table.Caption>
      <Table.Thead>{ths}</Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
      <Table.Tfoot>{ths}</Table.Tfoot>
    </Table>
  );
}
`;

export function Demo() {
  return (
    <Table captionSide="bottom">
      <Table.Caption>Some elements from the periodic table</Table.Caption>
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

export const captions: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
