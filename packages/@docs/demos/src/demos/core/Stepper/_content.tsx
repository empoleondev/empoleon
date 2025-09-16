import { Box, BoxProps, ElementProps } from '@empoleon/core';

export function Content(props: BoxProps & ElementProps<'div'>) {
  return (
    <Box
      style={{
        height: '60px',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
        'font-weight': 500,
        'font-size': 'var(--empoleon-font-size-lg)',
      }}
      {...props}
    />
  );
}
