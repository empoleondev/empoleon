import { createSignal, For } from 'solid-js';
import { Checkbox, Table } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createSignal, For } from 'solid-js';
import { Table, Checkbox } from '@empoleon/core';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function Demo() {
  const [selectedRows, setSelectedRows] = createSignal<number[]>([]);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <For each={elements}>
          {(element) => (
            <Table.Tr
              bg={selectedRows().includes(element.position) ? 'var(--empoleon-color-blue-light)' : undefined}
            >
              <Table.Td>
                <Checkbox
                  aria-label="Select row"
                  checked={selectedRows().includes(element.position)}
                  onChange={(event) =>
                    setSelectedRows(
                      event.currentTarget.checked
                        ? [...selectedRows(), element.position]
                        : selectedRows().filter((position) => position !== element.position)
                    )
                  }
                />
              </Table.Td>
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
`;

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function Demo() {
  const [selectedRows, setSelectedRows] = createSignal<number[]>([]);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <For each={elements}>
          {(element) => (
            <Table.Tr
              bg={
                selectedRows().includes(element.position)
                  ? 'var(--empoleon-color-blue-light)'
                  : undefined
              }
            >
              <Table.Td>
                <Checkbox
                  aria-label="Select row"
                  checked={selectedRows().includes(element.position)}
                  onChange={(event) =>
                    setSelectedRows(
                      event.currentTarget.checked
                        ? [...selectedRows(), element.position]
                        : selectedRows().filter((position) => position !== element.position)
                    )
                  }
                />
              </Table.Td>
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

export const rowSelection: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  defaultExpanded: false,
  code,
};
