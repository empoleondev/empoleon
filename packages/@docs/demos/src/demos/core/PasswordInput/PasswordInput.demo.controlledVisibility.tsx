import { PasswordInput, Stack } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useDisclosure } from '@empoleon/hooks';
import { PasswordInput, Stack } from '@empoleon/core';

function Demo() {
  const [visible, { toggle }] = useDisclosure(false);
  return (
    <Stack>
      <PasswordInput
        label="Password"
        defaultValue="secret"
        visible={visible}
        onVisibilityChange={toggle}
      />
      <PasswordInput
        label="Confirm password"
        defaultValue="secret"
        visible={visible}
        onVisibilityChange={toggle}
      />
    </Stack>
  );
}
`;

function Demo() {
  const [visible, { toggle }] = useDisclosure(false);
  return (
    <Stack>
      <PasswordInput
        label="Password"
        defaultValue="secret"
        visible={visible()}
        onVisibilityChange={toggle}
      />
      <PasswordInput
        label="Confirm password"
        defaultValue="secret"
        visible={visible()}
        onVisibilityChange={toggle}
      />
    </Stack>
  );
}

export const controlledVisibility: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
