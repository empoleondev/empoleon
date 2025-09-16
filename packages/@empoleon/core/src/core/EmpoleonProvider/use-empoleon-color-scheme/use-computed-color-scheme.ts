import { useColorScheme, UseMediaQueryOptions } from '@empoleon/hooks';
import { useEmpoleonColorScheme } from './use-empoleon-color-scheme';

export function useComputedColorScheme(
  defaultValue?: 'light' | 'dark',
  options: UseMediaQueryOptions = { getInitialValueInEffect: true }
) {
  const osColorScheme = useColorScheme(defaultValue, options);
  const { colorScheme } = useEmpoleonColorScheme();
  return () => colorScheme === 'auto' ? osColorScheme() : colorScheme;
}
