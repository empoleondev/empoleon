import { Pagination } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
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

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: PaginationStylesApi,
  component: Demo,
  code,
  centered: true,
};
