import { For, JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { Stack } from '../Stack';
import { Text } from '../Text';
import { Title } from '../Title';
import { Table } from './Table';

export default {
  title: 'Table',
};

// Data for the table rows
const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

/**
 * Reusable component for rendering table rows.
 * By wrapping the <For> loop in a component, we ensure it's executed
 * within a reactive scope every time it's used.
 */
const TableRows = () => (
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
);

// Base component for all stories, providing padding and the Empoleon theme.
const StoryWrapper = (props: { children: JSX.Element }) => (
  <EmpoleonProvider>
    <div style={{ padding: '40px' }}>{props.children}</div>
  </EmpoleonProvider>
);

export function Usage() {
  return (
    <StoryWrapper>
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
          <TableRows />
        </Table.Tbody>
        <Table.Caption>Test caption</Table.Caption>
      </Table>
    </StoryWrapper>
  );
}

export function VerticalVariant() {
  return (
    <StoryWrapper>
      <Table variant="vertical" layout="fixed" withTableBorder>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th w={160}>Epic name</Table.Th>
            <Table.Td>7.x migration</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Status</Table.Th>
            <Table.Td>Open</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Total issues</Table.Th>
            <Table.Td>135</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
    </StoryWrapper>
  );
}

export function Unstyled() {
  return (
    <StoryWrapper>
      <Table withColumnBorders withRowBorders withTableBorder borderColor="cyan" unstyled>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <TableRows />
        </Table.Tbody>
        <Table.Caption>Test caption</Table.Caption>
      </Table>
    </StoryWrapper>
  );
}

export function WithScrollContainer() {
  return (
    <StoryWrapper>
      <Table.ScrollContainer minWidth={'500px'}>
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
            <TableRows />
          </Table.Tbody>
          <Table.Caption>Test caption</Table.Caption>
        </Table>
      </Table.ScrollContainer>
    </StoryWrapper>
  );
}

export function FixedLayout() {
  return (
    <StoryWrapper>
      <Table layout="fixed" verticalSpacing={20} horizontalSpacing="xl" fz="xl">
        <Table.Thead>
          <Table.Tr>
            <Table.Th w={200}>Element position</Table.Th>
            <Table.Th w={200}>Element name</Table.Th>
            <Table.Th w={100}>Symbol</Table.Th>
            <Table.Th w={200}>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <TableRows />
        </Table.Tbody>
      </Table>
    </StoryWrapper>
  );
}

export function Striped() {
  return (
    <StoryWrapper>
      <Table striped="even">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <TableRows />
        </Table.Tbody>
      </Table>
    </StoryWrapper>
  );
}

export function HighlightOnHover() {
  return (
    <StoryWrapper>
      <Table highlightOnHover highlightOnHoverColor="red">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Element position</Table.Th>
            <Table.Th>Element name</Table.Th>
            <Table.Th>Symbol</Table.Th>
            <Table.Th>Atomic mass</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <TableRows />
        </Table.Tbody>
      </Table>
    </StoryWrapper>
  );
}

const nums = [2214411234, 9983812411, 1234567890, 9948811128, 9933771777];

export function TabularNums() {
  return (
    <StoryWrapper>
      <Table tabularNums>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Units sold</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          <For each={nums}>
            {(num) => (
              <Table.Tr>
                <Table.Td>Units sold</Table.Td>
                <Table.Td>{num}</Table.Td>
              </Table.Tr>
            )}
          </For>
        </Table.Tbody>
      </Table>
    </StoryWrapper>
  );
}
