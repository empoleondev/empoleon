import { Text } from '@empoleon/core';
import { useOs } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useOs } from '@empoleon/hooks';

function Demo() {
  const os = useOs();
  return <>Your os is <b>{os}</b></>;
}
`;

function Demo() {
  const os = useOs();
  return (
    <Text ta="center">
      Your os is <b>{os()}</b>
    </Text>
  );
}

export const useOsDemo: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
