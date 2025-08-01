import { tests } from '@empoleon-tests/core';
import { Grid, GridProps, GridStylesNames } from './Grid';
import { GridCol } from './GridCol/GridCol';

describe('@empoleon/core/Grid', () => {
  tests.itSupportsSystemProps<GridProps, GridStylesNames>({
    component: Grid,
    props: () => ({
      children: <Grid.Col span={12}>test</Grid.Col>,
    }),
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
    displayName: '@empoleon/core/Grid',
    stylesApiSelectors: ['root', 'inner', 'col'],
  });

  it('exposes Grid.Col component', () => {
    expect(Grid.Col).toBe(GridCol);
  });
});
