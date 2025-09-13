import { Pagination } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

function Demo() {
  return <Pagination total={10} />;
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
};
