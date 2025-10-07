import { Spoiler, SpoilerProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { Wrapper } from './_wrapper';

const code = `
import { Spoiler } from '@empoleon/core';

function Demo() {
  return (
    <Spoiler{{props}}>
      {/* Content here */}
    </Spoiler>
  );
}
`;

function Demo(props: SpoilerProps) {
  return <Wrapper {...props} />;
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 600,
  controls: [
    {
      prop: 'maxHeight',
      type: 'number',
      initialValue: 120,
      libraryValue: 100,
      min: 50,
      max: 500,
      step: 10,
    },
    {
      prop: 'showLabel',
      type: 'string',
      initialValue: 'Show more',
      libraryValue: undefined,
    },
    {
      prop: 'hideLabel',
      type: 'string',
      initialValue: 'Hide',
      libraryValue: undefined,
    },
    {
      prop: 'transitionDuration',
      type: 'number',
      initialValue: 200,
      libraryValue: 200,
      min: 0,
      max: 1000,
      step: 50,
    },
    {
      prop: 'expanded',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
  ],
};
