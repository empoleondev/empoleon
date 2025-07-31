import { mergeProps } from 'solid-js';
import { useEmpoleonTheme } from '../EmpoleonThemeProvider';

export function useProps<T extends Record<string, any>, U extends Partial<T> | null = {}>(
  component: string,
  defaultProps: U,
  props: T
): T &
  (U extends null | undefined
    ? {}
    : {
        [Key in Extract<keyof T, keyof U>]-?: U[Key] | NonNullable<T[Key]>;
      }) {
  const theme = useEmpoleonTheme();
  const contextPropsPayload = theme.components[component]?.defaultProps;
  const contextProps =
    typeof contextPropsPayload === 'function' ? contextPropsPayload(theme) : contextPropsPayload;

  const merged = mergeProps(defaultProps || {}, contextProps || {}, props);
  return merged as any;
}
