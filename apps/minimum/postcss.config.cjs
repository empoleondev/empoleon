module.exports = {
  plugins: {
    "@empoleon/postcss-preset": {},
    "postcss-simple-vars": {
      variables: {
        "empoleon-breakpoint-xs": "36em",
        "empoleon-breakpoint-sm": "48em",
        "empoleon-breakpoint-md": "62em",
        "empoleon-breakpoint-lg": "75em",
        "empoleon-breakpoint-xl": "88em",
      },
    },
  },
};
