import { Button, Text } from '@empoleon/core';
import { useMutationObserver } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { Button, Text } from '@empoleon/core';
import { useMutationObserver } from '@empoleon/hooks';

function Demo() {
  const [lastMutation, setLastMutation] = useState('');

  const ref = useMutationObserver<HTMLButtonElement>(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-mutation') {
          mutation.target instanceof HTMLElement &&
            setLastMutation(mutation.target.dataset.mutation || '');
        }
      });
    },
    {
      attributes: true,
      attributeFilter: ['data-mutation'],
    }
  );

  return (
    <>
      <Button
        ref={ref}
        onClick={(event) => {
          event.currentTarget.dataset.mutation = Math.random().toFixed(3);
        }}
      >
        Click to change to data-mutation attribute
      </Button>
      <Text mt={10} size="sm">
        Last detected mutation: {lastMutation || 'Not mutated yet'}
      </Text>
    </>
  );
}
`;

function Demo() {
  const [lastMutation, setLastMutation] = createSignal('');

  const ref = useMutationObserver<HTMLButtonElement>(
    (mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'dir') {
          mutation.target instanceof HTMLElement &&
            setLastMutation(mutation.target.dataset.mutation || '');
        }
      });
    },
    {
      attributes: true,
      attributeFilter: ['data-mutation'],
    }
  );

  return (
    <>
      <Button
        ref={ref}
        onClick={(event) => {
          event.currentTarget.dataset.mutation = Math.random().toFixed(3);
        }}
      >
        Click to change to data-mutation attribute
      </Button>
      <Text mt={10} size="sm">
        Last detected mutation: {lastMutation() || 'Not mutated yet'}
      </Text>
    </>
  );
}

export const useMutationObserverUsage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
