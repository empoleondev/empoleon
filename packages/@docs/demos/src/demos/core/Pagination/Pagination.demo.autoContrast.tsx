import { Pagination, Text } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Pagination, Text } from '@empoleon/core';

function Demo() {
  return (
    <>
      <Text>autoContrast: off</Text>
      <Pagination total={10} color="lime.4" />

      <Text mt="md">autoContrast: on</Text>
      <Pagination total={10} autoContrast color="lime.4" />
    </>
  );
}`;

function Demo() {
  return (
    <>
      <Text>autoContrast: off</Text>
      <Pagination total={10} color="lime.4" />

      <Text mt="md">autoContrast: on</Text>
      <Pagination total={10} autoContrast color="lime.4" />
    </>
  );
}

export const autoContrast: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
