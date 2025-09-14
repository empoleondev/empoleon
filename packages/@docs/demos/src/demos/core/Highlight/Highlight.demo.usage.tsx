import { Highlight, HighlightProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Wrapper(props: HighlightProps) {
  return <Highlight maw={400} mx="auto" {...props} />;
}

const code = `
import { Highlight } from '@empoleon/core';

function Demo() {
  return (
    <Highlight{{props}}>
      {{children}}
    </Highlight>
  );
}
`;

export const usage: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: '100%',
  controls: [
    { prop: 'color', type: 'color', initialValue: 'yellow', libraryValue: 'yellow' },
    { prop: 'highlight', type: 'string', initialValue: 'this', libraryValue: null },
    {
      prop: 'children',
      type: 'string',
      initialValue: 'Highlight This, definitely THIS and also this!',
      libraryValue: null,
    },
  ],
};
