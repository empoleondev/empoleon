import { tests } from '@empoleon-tests/core';
import {
  TableOfContents,
  TableOfContentsProps,
  TableOfContentsStylesNames,
} from './TableOfContents';

const defaultProps: TableOfContentsProps = {};

describe('@empoleon/core/TableOfContents', () => {
  tests.itSupportsSystemProps<TableOfContentsProps, TableOfContentsStylesNames>({
    component: TableOfContents,
    props: defaultProps,
    styleProps: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/TableOfContents',
    stylesApiSelectors: ['root'],
  });
});
