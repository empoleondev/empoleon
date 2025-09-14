import { Pagination } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Demo() {
  return <Pagination total={10} />;
}

export const usage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
};
