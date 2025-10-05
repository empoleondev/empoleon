import { Grid, GridProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { ColWrapper as Col } from './_col-wrapper';

function Wrapper(props: GridProps) {
  return (
    <Grid
      breakpoints={{ xs: '100px', sm: '200px', md: '300px', lg: '400px', xl: '500px' }}
      {...props}
      id="grid-kitchenSink"
    >
      <Col span={3} h={80}>
        1
      </Col>
      <Col span={3} h={120}>
        2
      </Col>
      <Col span={3} h={100}>
        3
      </Col>
    </Grid>
  );
}

const code = `
import { Grid } from '@empoleon/core';

function Demo() {
  return (
    <Grid{{props}}>
      <Grid.Col span={3} h={80}>1</Grid.Col>
      <Grid.Col span={3} h={120}>2</Grid.Col>
      <Grid.Col span={3} h={100}>3</Grid.Col>
    </Grid>
  );
}
`;

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'gutter',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'grow',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'justify',
      type: 'select',
      initialValue: 'flex-start',
      libraryValue: '__',
      data: [
        { label: 'flex-start', value: 'flex-start' },
        { label: 'flex-end', value: 'flex-end' },
        { label: 'center', value: 'center' },
        { label: 'space-between', value: 'space-between' },
        { label: 'space-around', value: 'space-around' },
      ],
    },
    {
      prop: 'align',
      type: 'select',
      initialValue: 'flex-start',
      libraryValue: '__',
      data: [
        { label: 'flex-start', value: 'flex-start' },
        { label: 'flex-end', value: 'flex-end' },
        { label: 'center', value: 'center' },
      ],
    },
    {
      prop: 'overflow',
      type: 'select',
      initialValue: 'visible',
      libraryValue: 'visible',
      data: [
        { label: 'Visible', value: 'visible' },
        { label: 'Hidden', value: 'hidden' },
      ],
    },
    {
      prop: 'type',
      type: 'select',
      initialValue: 'media',
      libraryValue: 'media',
      data: [
        { label: 'Media', value: 'media' },
        { label: 'Container', value: 'container' },
      ],
    },
  ],
};
