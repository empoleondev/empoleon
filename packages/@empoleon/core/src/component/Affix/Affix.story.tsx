import { JSX } from 'solid-js';
import { Box, EmpoleonProvider } from '../../core';
import { Affix } from './Affix';

export default {
  title: 'Affix',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <Affix position={{ bottom: 'xl', right: 90 }}>
        <Box bg="blue" p="xl">
          Affix box
        </Box>
      </Affix>
    </div>
  );
}
