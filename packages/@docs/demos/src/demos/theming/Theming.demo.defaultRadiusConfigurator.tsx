import { Button, TextInput } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = (props: Record<string, any>) => `
import { EmpoleonProvider, TextInput, Button } from '@empoleon/core';

function Demo() {
  return (
    <EmpoleonProvider theme={{ defaultRadius: '${props.defaultRadius}' }}>
      <Button fullWidth>Button with defaultRadius</Button>
      <TextInput mt="sm" label="TextInput with defaultRadius" placeholder="TextInput with default radius" />
    </EmpoleonProvider>
  );
}
`;

function Wrapper(props: any) {
  return (
    <>
      <Button radius={props.defaultRadius} fullWidth>
        Button with defaultRadius
      </Button>
      <TextInput
        mt="sm"
        radius={props.defaultRadius}
        label="TextInput with defaultRadius"
        placeholder="TextInput with default radius"
      />
    </>
  );
}

export const defaultRadiusConfigurator: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [{ type: 'size', prop: 'defaultRadius', initialValue: 'sm', libraryValue: '__none__' }],
};
