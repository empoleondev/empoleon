import { deepMerge } from '../../utils';
import { ConvertCSSVariablesInput } from '../convert-css-variables';
import { EmpoleonTheme } from '../theme.types';
import { defaultCssVariablesResolver } from './default-css-variables-resolver';

interface GetMergedVariablesInput {
  theme: EmpoleonTheme;
  generator?: (theme: EmpoleonTheme) => ConvertCSSVariablesInput;
}

export function getMergedVariables(props: GetMergedVariablesInput) {
  const defaultResolver = defaultCssVariablesResolver(props.theme);
  const providerGenerator = props.generator?.(props.theme);
  return providerGenerator ? deepMerge(defaultResolver, providerGenerator) : defaultResolver;
}
