import { Grid, GridProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { ColWrapper as Col } from './_col-wrapper';

function Wrapper(props: GridProps) {
  return (
    <Grid {...props}>
      <Col span={4}>1</Col>
      <Col span={4}>2</Col>
      <Col span={4}>3</Col>
      <Col span={4}>4</Col>
      <Col span={4}>5</Col>
    </Grid>
  );
}

const code = `
import { Grid } from '@empoleon/core';

function Demo() {
  return (
    <Grid{{props}}>
      <Grid.Col span={4}>1</Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
      <Grid.Col span={4}>4</Grid.Col>
      <Grid.Col span={4}>5</Grid.Col>
    </Grid>
  );
}
`;

export const growConfigurator: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'grow',
      type: 'boolean',
      initialValue: true,
      libraryValue: false,
    },
    {
      prop: 'gutter',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
  ],
};
