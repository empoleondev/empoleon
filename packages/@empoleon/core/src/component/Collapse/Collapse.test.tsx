import { tests } from '@empoleon-tests/core';
import { Collapse, CollapseProps } from './Collapse';

const defaultProps: CollapseProps = {
  in: true,
  children: <div style={{ height: '20vh' }} />,
};

describe('@empoleon/core/Collapse', () => {
  tests.itSupportsSystemProps({
    component: Collapse,
    props: defaultProps,
    children: true,
    styleProps: true,
    extend: true,
    withProps: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/Collapse',
  });
});
