import { Button, Text } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = (props: any) => `
import { Button, Text } from '@empoleon/core';

function Demo() {
  return (
    <>
      <Text c="blue.${props.index}">Text with blue.${props.index} color</Text>
      <Button color="cyan.${props.index}">Button</Button>
    </>
  );
}
`;

function Wrapper(props: any) {
  return (
    <>
      <Text c={`blue.${props.index}`}>Text with blue.{props.index} color</Text>
      <Button color={`cyan.${props.index}`} mt="sm">
        Button
      </Button>
    </>
  );
}

export const colorsIndexConfigurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    { type: 'number', prop: 'index', initialValue: 6, libraryValue: '__none__', min: 0, max: 9 },
  ],
};
