import { Badge } from '@empoleon/core';
import { useReducedMotion } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Badge } from '@empoleon/core';
import { useReducedMotion } from '@empoleon/hooks';

function Demo() {
  const reduceMotion = useReducedMotion();

  return (
    <Badge
      color={reduceMotion ? 'red' : 'teal'}
      style={{ transitionDuration: reduceMotion ? '0ms' : '200ms' }}
      variant="filled"
    >
      {reduceMotion ? 'You prefer to reduce motion' : 'You prefer not to reduce motion'}
    </Badge>
  );
}`;

function Demo() {
  const reduceMotion = useReducedMotion();
  return (
    <Badge
      color={reduceMotion() ? 'red' : 'teal'}
      style={{ transitionDuration: reduceMotion() ? '0ms' : '200ms' }}
      variant="filled"
    >
      {reduceMotion() ? 'You prefer to reduce motion' : 'You prefer not to reduce motion'}
    </Badge>
  );
}

export const useReducedMotionDemo: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
