import { useMediaQuery, UseMediaQueryOptions } from '../use-media-query/use-media-query';

export function useColorScheme(initialValue?: 'dark' | 'light', options?: UseMediaQueryOptions) {
  const matches = useMediaQuery('(prefers-color-scheme: dark)', initialValue === 'dark', options);
  return () => matches() ? 'dark' : 'light';
}
