import { createEffect, createSignal } from 'solid-js';
import { Button } from '@empoleon/core';
import { randomId, useDocumentTitle } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { useDocumentTitle, randomId } from '@empoleon/hooks';
import { Button } from '@empoleon/core';

function Demo() {
  const [title, setTitle] = useState('');
  useDocumentTitle(title);

  return (
    <Button onClick={() => setTitle(randomId())}>
      Set document title to random id
    </Button>
  );
}`;

function Demo() {
  const [title, setTitle] = createSignal('');
  useDocumentTitle(title());

  createEffect(() => {
    const t = title();
    if (t && t.trim().length > 0) {
      if (window.parent && window.parent !== window && window.parent.document) {
        window.parent.document.title = t.trim();
      }
    }
  });

  return <Button onClick={() => setTitle(randomId())}>Set document title to random id</Button>;
}

export const useDocumentTitleDemo: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
