import type { EmpoleonColorScheme } from '../theme.types';

export interface ColorSchemeScriptProps {
  forceColorScheme?: 'light' | 'dark';
  defaultColorScheme?: EmpoleonColorScheme;
  localStorageKey?: string;
}

const getScript = ({
  defaultColorScheme,
  localStorageKey,
  forceColorScheme,
}: Pick<ColorSchemeScriptProps, 'defaultColorScheme' | 'localStorageKey' | 'forceColorScheme'>) =>
  forceColorScheme
    ? `document.documentElement.setAttribute("data-empoleon-color-scheme", '${forceColorScheme}');`
    : `try {
  var _colorScheme = window.localStorage.getItem("${localStorageKey}");
  var colorScheme = _colorScheme === "light" || _colorScheme === "dark" || _colorScheme === "auto" ? _colorScheme : "${defaultColorScheme}";
  var computedColorScheme = colorScheme !== "auto" ? colorScheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-empoleon-color-scheme", computedColorScheme);
} catch (e) {}
`;

export function ColorSchemeScript({
  defaultColorScheme = 'light',
  localStorageKey = 'empoleon-color-scheme-value',
  forceColorScheme,
  ...others
}: ColorSchemeScriptProps) {
  const _defaultColorScheme = ['light', 'dark', 'auto'].includes(defaultColorScheme)
    ? defaultColorScheme
    : 'light';
  return (
    <script
      {...others}
      data-empoleon-script
      // @ts-ignore
      dangerouslySetInnerHTML={{
        __html: getScript({
          defaultColorScheme: _defaultColorScheme,
          localStorageKey,
          forceColorScheme,
        }),
      }}
    />
  );
}
