// Files names that should not have use client directive at the top of the output file
export const ROLLUP_EXCLUDE_USE_CLIENT = [
  'index',
  'core/utils/deep-merge/deep-merge',
  'core/utils/units-converters/rem',
  'core/utils/units-converters/px',
  'core/factory/create-polymorphic-component',
  'core/EmpoleonProvider/empoleon-html-props',
  'core/EmpoleonProvider/create-theme/create-theme',
  'core/EmpoleonProvider/color-functions/darken/darken',
  'core/EmpoleonProvider/color-functions/lighten/lighten',
  'core/EmpoleonProvider/color-functions/luminance/luminance',
  'core/EmpoleonProvider/color-functions/rgba/rgba',
  'core/EmpoleonProvider/color-functions/to-rgba/to-rgba',
  'core/EmpoleonProvider/default-colors',
  'core/EmpoleonProvider/default-theme',
  'core/EmpoleonProvider/merge-empoleon-theme/merge-empoleon-theme',
  'core/EmpoleonProvider/EmpoleonCssVariables/virtual-color/virtual-color',
  'core/EmpoleonProvider/color-functions/colors-tuple/colors-tuple',
  'CodeHighlightProvider/adapters/plain-text-adapter',
  'CodeHighlightProvider/adapters/shiki-adapter',
  'CodeHighlightProvider/adapters/shiki-themes',
  'CodeHighlightProvider/adapters/highlight-js-adapter',
  'theme-to-vars',
].reduce<string[]>((acc, name) => {
  acc.push(`${name}.js`, `${name}.mjs`, `${name}.cjs`);
  return acc;
}, []);
