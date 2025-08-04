import { convertCssVariables } from '../convert-css-variables/convert-css-variables';
import { useEmpoleonCssVariablesResolver, useEmpoleonStyleNonce } from '../Empoleon.context';
import { useEmpoleonTheme } from '../EmpoleonThemeProvider';
import { getMergedVariables } from './get-merged-variables';
import { removeDefaultVariables } from './remove-default-variables';

interface EmpoleonCssVariablesProps {
  cssVariablesSelector: string;
  deduplicateCssVariables: boolean;
}

function getColorSchemeCssVariables(selector: string) {
  return `
  ${selector}[data-empoleon-color-scheme="dark"] { --empoleon-color-scheme: dark; }
  ${selector}[data-empoleon-color-scheme="light"] { --empoleon-color-scheme: light; }
`;
}

export function EmpoleonCssVariables(props: EmpoleonCssVariablesProps) {
  const theme = useEmpoleonTheme();
  const nonce = useEmpoleonStyleNonce();
  const generator = useEmpoleonCssVariablesResolver();
  const mergedVariables = getMergedVariables({ theme, generator });
  const shouldCleanVariables = props.cssVariablesSelector === ':root' && props.deduplicateCssVariables;
  const cleanedVariables = shouldCleanVariables
    ? removeDefaultVariables(mergedVariables)
    : mergedVariables;
  const css = convertCssVariables(cleanedVariables, props.cssVariablesSelector);

  if (css) {
    return (
      <style
        data-empoleon-styles
        nonce={nonce?.()}
        // @ts-ignore
        dangerouslySetInnerHTML={{
          __html: `${css}${
            shouldCleanVariables ? '' : getColorSchemeCssVariables(props.cssVariablesSelector)
          }`,
        }}
      />
    );
  }

  return null;
}

EmpoleonCssVariables.displayName = '@empoleon/CssVariables';
