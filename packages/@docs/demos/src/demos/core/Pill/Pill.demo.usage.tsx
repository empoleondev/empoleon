import { Pill } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './_demo.module.css';

const code = `
import { Pill } from '@empoleon/core';

function Demo() {
  return <Pill{{props}}>React</Pill>;
}
`;

function Wrapper(props: any) {
  return (
    <div class={classes.demoWrapper}>
      <Pill {...props}>React</Pill>
    </div>
  );
}

export const usage: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { type: 'size', prop: 'size', initialValue: 'md', libraryValue: 'md' },
    { type: 'boolean', prop: 'withRemoveButton', initialValue: false, libraryValue: false },
  ],
};
