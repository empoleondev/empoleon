import { Box, Button, FocusTrap, TextInput } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useDisclosure } from '@empoleon/hooks';
import { FocusTrap, TextInput, Button, Box } from '@empoleon/core';

function Demo() {
  const [active, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Button onClick={toggle}>{active ? 'Deactivate' : 'Activate'} focus trap</Button>

      <FocusTrap active={active}>
        <div>
          <TextInput mt="sm" label="First input" placeholder="First input" />
          <TextInput mt="sm" label="Second input" placeholder="Second input" />
          <TextInput mt="sm" label="Third input" placeholder="Third input" />
        </div>
      </FocusTrap>
    </Box>
  );
}
`;

function Demo() {
  const [active, { toggle }] = useDisclosure(false);

  return (
    <Box maw={400} mx="auto">
      <Button onClick={toggle}>{active() ? 'Deactivate' : 'Activate'} focus trap</Button>

      <FocusTrap active={active()}>
        {(focusTrapProps) => (
          <div {...focusTrapProps}>
            <TextInput mt="sm" label="First input" placeholder="First input" />
            <TextInput mt="sm" label="Second input" placeholder="Second input" />
            <TextInput mt="sm" label="Third input" placeholder="Third input" />
          </div>
        )}
      </FocusTrap>
    </Box>
  );
}

export const usage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
