import { JSX } from 'solid-js';
import { DEFAULT_THEME, EmpoleonProvider, rgba } from '../../EmpoleonProvider';
import { Box } from '../Box';
import { theme } from './theme';

export default {
  title: 'Box',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider theme={theme}>
        <Story />
      </EmpoleonProvider>
    ),
  ]
};

export function Usage() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Box bg="orange.4" ms="xl" fz="h2" lh="h1">
        Visible from sm
      </Box>
    </div>
  );
}
export function VirtualColor() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Box bg="virtual.4" p="xl">
        Virtual bg
      </Box>
    </div>
  );
}

export function ColorMix() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Box bg={rgba(DEFAULT_THEME.colors.pink[5], 1)} h={200} w={200}>
        Pink.6
      </Box>
      <Box bg="color-mix(in srgb, var(--empoleon-color-pink-5), white 20%)" h={200} w={200}>
        Pink.6 color-mix
      </Box>
      <Box bg="color-mix(in srgb, var(--empoleon-color-pink-5), black 20%)" h={200} w={200}>
        Pink.6 color-mix
      </Box>
    </div>
  );
}
