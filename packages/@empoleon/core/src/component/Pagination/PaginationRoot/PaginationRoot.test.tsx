import { tests } from '@empoleon-tests/core';
import { PaginationRoot, PaginationRootProps, PaginationRootStylesNames } from './PaginationRoot';

const defaultProps: PaginationRootProps = {
  total: 10,
};

describe('@empoleon/core/PaginationRoot', () => {
  tests.itSupportsSystemProps<PaginationRootProps, PaginationRootStylesNames>({
    component: PaginationRoot,
    props: defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/PaginationRoot',
    stylesApiSelectors: ['root'],
    stylesApiName: 'Pagination',
  });
});
