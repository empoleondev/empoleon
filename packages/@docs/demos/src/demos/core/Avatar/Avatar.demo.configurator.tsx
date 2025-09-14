import { Avatar } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { staticVariantsControl } from '../../../shared';

const code = `
import { Avatar } from '@empoleon/core';

function Demo() {
  return <Avatar{{props}} />;
}
`;

export const configurator: EmpoleonDemo = {
  type: 'configurator',
  component: Avatar,
  centered: true,
  code,
  controls: [
    staticVariantsControl,
    { prop: 'radius', type: 'size', initialValue: 'sm', libraryValue: '100%' },
    { prop: 'size', type: 'size', initialValue: 'md', libraryValue: 'md' },
    { prop: 'color', type: 'color', initialValue: 'gray', libraryValue: 'gray' },
    {
      prop: 'src',
      type: 'string',
      initialValue: '',
      libraryValue: null,
    },
  ],
};
