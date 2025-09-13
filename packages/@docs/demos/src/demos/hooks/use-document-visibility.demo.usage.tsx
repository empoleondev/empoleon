import { Text } from '@empoleon/core';
import { useDocumentTitle, useDocumentVisibility } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Text } from '@empoleon/core';
import { useDocumentTitle, useDocumentVisibility } from '@empoleon/hooks';

function Demo() {
  const documentState = useDocumentVisibility();
  useDocumentTitle(\`Document is \${documentState}\`);
  return <Text>Switch to another tab to see document title change</Text>;
}
`;

function Demo() {
  const documentState = useDocumentVisibility();
  useDocumentTitle(`Document is ${documentState}`);
  return <Text>Switch to another tab to see document title change</Text>;
}

export const useDocumentVisibilityDemo: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
