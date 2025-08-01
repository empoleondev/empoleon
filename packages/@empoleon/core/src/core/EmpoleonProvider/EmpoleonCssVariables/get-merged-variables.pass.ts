import { DEFAULT_THEME } from '../default-theme';
import {
  CSSVariablesResolver,
  defaultCssVariablesResolver,
} from './default-css-variables-resolver';
import { getMergedVariables } from './get-merged-variables';

const defaultVariables = defaultCssVariablesResolver(DEFAULT_THEME);

describe('@empoleon/core/get-merged-variables', () => {
  it('returns default variables if no generator provided', () => {
    expect(getMergedVariables({ theme: DEFAULT_THEME })).toEqual(defaultVariables);
    expect(getMergedVariables({ theme: DEFAULT_THEME, generator: undefined })).toEqual(
      defaultVariables
    );
  });

  it('merges default and provider variables', () => {
    const generator: CSSVariablesResolver = (theme) => ({
      variables: {
        '--empoleon-color-red': theme.colors.red[5],
      },
      light: {
        '--empoleon-color-blue': theme.colors.blue[5],
      },
      dark: {
        '--empoleon-color-orange': theme.colors.orange[5],
      },
    });

    expect(getMergedVariables({ theme: DEFAULT_THEME, generator })).toEqual({
      variables: {
        ...defaultVariables.variables,
        '--empoleon-color-red': DEFAULT_THEME.colors.red[5],
      },

      light: {
        ...defaultVariables.light,
        '--empoleon-color-blue': DEFAULT_THEME.colors.blue[5],
      },

      dark: {
        ...defaultVariables.dark,
        '--empoleon-color-orange': DEFAULT_THEME.colors.orange[5],
      },
    });
  });
});
