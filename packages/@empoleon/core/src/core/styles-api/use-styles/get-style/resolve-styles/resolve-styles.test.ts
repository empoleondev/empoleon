import { DEFAULT_THEME } from '../../../../EmpoleonProvider';
import { resolveStyles } from './resolve-styles';

describe('@empoleon/core/resolve-styles', () => {
  it('resolves styles from object', () => {
    expect(
      resolveStyles({
        theme: DEFAULT_THEME,
        styles: {
          root: {
            color: 'red',
          },
        },
        props: {},
        stylesCtx: undefined,
      })
    ).toStrictEqual({ root: { color: 'red' } });
  });

  it('resolves styles from function', () => {
    expect(
      resolveStyles({
        theme: DEFAULT_THEME,
        styles: (theme, props, stylesCtx) => ({
          root: {
            color: theme.colors.blue[1],
            outlineColor: props.outline,
            ...stylesCtx,
          },
        }),
        props: { outline: 'cyan' },
        stylesCtx: { textDecoration: 'underline' },
      })
    ).toStrictEqual({
      root: {
        color: DEFAULT_THEME.colors.blue[1],
        outlineColor: 'cyan',
        textDecoration: 'underline',
      },
    });
  });
});
