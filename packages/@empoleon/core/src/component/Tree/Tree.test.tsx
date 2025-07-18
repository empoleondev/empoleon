import { tests } from '@empoleon-tests/core';
import { Tree, TreeProps, TreeStylesNames } from './Tree';

const defaultProps: TreeProps = {
  data: [
    {
      label: 'Tree Node',
      value: 'tree-node',
    },
  ],
};

describe('@empoleon/core/Tree', () => {
  tests.itSupportsSystemProps<TreeProps, TreeStylesNames>({
    component: Tree,
    props: defaultProps,
    polymorphic: true,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLUListElement,
    displayName: '@empoleon/core/Tree',
    stylesApiSelectors: ['root', 'label', 'node'],
  });
});
