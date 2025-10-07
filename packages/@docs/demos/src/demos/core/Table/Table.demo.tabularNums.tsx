import { NumberFormatter, Table } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { For } from 'solid-js';

const code = `
import { NumberFormatter, Table } from '@empoleon/core';

const data = [
  { product: 'Apples', unitsSold: 2214411234 },
  { product: 'Oranges', unitsSold: 9983812411 },
  { product: 'Bananas', unitsSold: 1234567890 },
  { product: 'Pineapples', unitsSold: 9948810000 },
  { product: 'Pears', unitsSold: 9933771111 },
];

function Demo() {
  return (
    <Table {...props}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Product</Table.Th>
          <Table.Th>Units sold</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <For each={data}>
          {(item) => (
            <Table.Tr>
              <Table.Td>{item.product}</Table.Td>
              <Table.Td>
                <NumberFormatter value={item.unitsSold} thousandSeparator />
              </Table.Td>
            </Table.Tr>
          )}
        </For>
      </Table.Tbody>
    </Table>
  );
}
`;

const data = [
  { product: 'Apples', unitsSold: 2214411234 },
  { product: 'Oranges', unitsSold: 9983812411 },
  { product: 'Bananas', unitsSold: 1234567890 },
  { product: 'Pineapples', unitsSold: 9948810000 },
  { product: 'Pears', unitsSold: 9933771111 },
];

export function Wrapper(props: any) {
  return (
    <Table {...props}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Product</Table.Th>
          <Table.Th>Units sold</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <For each={data}>
          {(item) => (
            <Table.Tr>
              <Table.Td>{item.product}</Table.Td>
              <Table.Td>
                <NumberFormatter value={item.unitsSold} thousandSeparator />
              </Table.Td>
            </Table.Tr>
          )}
        </For>
      </Table.Tbody>
    </Table>
  );
}

export const tabularNums: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [{ type: 'boolean', prop: 'tabularNums', initialValue: true, libraryValue: false }],
};
