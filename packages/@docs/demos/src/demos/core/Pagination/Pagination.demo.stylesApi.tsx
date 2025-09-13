import { Pagination } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';
import { PaginationStylesApi } from '@docs/styles-api';

const code = `
import { Pagination } from '@empoleon/core';

function Demo() {
  return <Pagination total={10}{{props}} />;
}
`;

function Demo(props: any) {
  return <Pagination total={10} {...props} />;
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: PaginationStylesApi,
  component: Demo,
  code,
  centered: true,
};
