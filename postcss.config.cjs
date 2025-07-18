module.exports = {
  plugins: {
    '@empoleon/postcss-preset': {
      autoRem: true,
    },
    'postcss-simple-vars': {
      variables: {
        'empoleon-breakpoint-xs': '36em',
        'empoleon-breakpoint-sm': '48em',
        'empoleon-breakpoint-md': '62em',
        'empoleon-breakpoint-lg': '75em',
        'empoleon-breakpoint-xl': '88em',
        'docs-navbar-breakpoint': '47.5em',
        'docs-toc-breakpoint': '78em',
        'docs-mdx-breakpoint': '67.5em',
      },
    },
  },
};
