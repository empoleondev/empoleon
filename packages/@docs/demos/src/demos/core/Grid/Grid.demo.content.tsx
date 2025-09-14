import { Grid } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { ColWrapper as Col } from './_col-wrapper';

const code = `
import { Grid } from '@empoleon/core';

function Demo() {
  return (
    <Grid>
      <Grid.Col span="content">fit content</Grid.Col>
      <Grid.Col span={6}>2</Grid.Col>
    </Grid>
  );
}
`;

function Demo() {
  return (
    <Grid>
      <Col span="content">fit content</Col>
      <Col span={6}>2</Col>
    </Grid>
  );
}

export const content: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
