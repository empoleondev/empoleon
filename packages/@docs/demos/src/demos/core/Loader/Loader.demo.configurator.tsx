import { Loader } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Loader } from '@empoleon/core';

function Demo() {
  return <Loader{{props}} />;
}
`;

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Loader,
  code,
  centered: true,
  controls: [
    { type: 'color', prop: 'color', initialValue: 'blue', libraryValue: null },
    { type: 'size', prop: 'size', initialValue: 'md', libraryValue: 'md' },
    {
      type: 'segmented',
      prop: 'type',
      data: ['oval', 'bars', 'dots'],
      initialValue: 'oval',
      libraryValue: 'oval',
    },
  ],
};
