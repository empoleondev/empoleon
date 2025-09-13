import { Box, BoxProps, ElementProps } from '@empoleon/core';

export function Content(props: BoxProps & ElementProps<'div'>) {
  return (
    <Box
      style={{
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500,
        fontSize: 'var(--mantine-font-size-lg)',
      }}
      {...props}
    />
  );
}
