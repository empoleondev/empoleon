import { mergeProps } from 'solid-js';
import { useEmpoleonTheme } from '../EmpoleonThemeProvider';

export function useProps<T extends Record<string, any>, U extends Partial<T> = {}>(
  component: string,
  defaultProps: U,
  props: T
): T & {
  [Key in Extract<keyof T, keyof U>]-?: U[Key] | NonNullable<T[Key]>;
} {
  const theme = useEmpoleonTheme();
  const contextPropsPayload = theme.components[component]?.defaultProps;
  const contextProps =
    typeof contextPropsPayload === 'function' ? contextPropsPayload(theme) : contextPropsPayload;

  return mergeProps(defaultProps, contextProps || {}, props) as T & {
    [Key in Extract<keyof T, keyof U>]-?: U[Key] | NonNullable<T[Key]>;
  };
}
