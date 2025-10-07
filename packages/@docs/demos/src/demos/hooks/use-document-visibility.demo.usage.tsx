import { createEffect } from 'solid-js';
import { Text } from '@empoleon/core';
import { useDocumentTitle, useDocumentVisibility } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

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
  const title = () => `Document is ${documentState()}`;
  useDocumentTitle(title());

  createEffect(() => {
    const t = title();
    if (t && t.trim().length > 0) {
      if (window.parent && window.parent !== window && window.parent.document) {
        window.parent.document.title = t.trim();
      }
    }
  });

  return <Text>Switch to another tab to see document title change</Text>;
}

export const useDocumentVisibilityDemo: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
