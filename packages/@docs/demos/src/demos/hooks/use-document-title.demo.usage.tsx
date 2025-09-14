import { Button } from '@empoleon/core';
import { randomId, useDocumentTitle } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

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

  return <Button onClick={() => setTitle(randomId())}>Set document title to random id</Button>;
}

export const useDocumentTitleDemo: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
