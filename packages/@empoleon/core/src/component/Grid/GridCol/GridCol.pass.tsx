import { createContextContainer, tests } from '@empoleon-tests/core';
import { Grid } from '../Grid';
import { GridCol, GridColProps, GridColStylesNames } from './GridCol';

const TestContainer = createContextContainer(GridCol, Grid, {});

const defaultProps: GridColProps = {};

describe('@empoleon/core/GridCol', () => {
  tests.itSupportsSystemProps<GridColProps, GridColStylesNames>({
    component: TestContainer,
    props: () => defaultProps,
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
    displayName: '@empoleon/core/GridCol',
    stylesApiSelectors: ['col'],
    stylesApiName: 'Grid',
    selector: '.empoleon-Grid-col',
    compound: true,
    providerStylesApi: false,
  });
});
