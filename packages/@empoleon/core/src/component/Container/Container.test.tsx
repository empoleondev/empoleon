import { tests } from '@empoleon-tests/core';
import { Container, ContainerProps, ContainerStylesNames } from './Container';

const defaultProps: ContainerProps = {};

describe('@empoleon/core/Container', () => {
  tests.itSupportsSystemProps<ContainerProps, ContainerStylesNames>({
    component: Container,
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
    displayName: '@empoleon/core/Container',
    stylesApiSelectors: ['root'],
  });
});
