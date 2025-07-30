import { DEFAULT_THEME, EmpoleonTheme } from '@empoleon/core';
import { renderComponent } from '../render';
import { JSX } from 'solid-js';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props;
  selector?: string;
}

export function itSupportsStyle<Props>(options: Options<Props>, name = 'supports style') {
  it(`${name}: object`, () => {
    const { container } = renderComponent(
      () => <options.component {...options.props} style={{ color: 'salmon' }} />
    );

    expect(container.querySelector(options.selector || '*:not(style)')).toHaveStyle({
      color: 'rgb(250, 128, 114)',
    });
  });

  it(`${name}: theme function`, () => {
    const { container } = renderComponent(
      () => <options.component
        {...options.props}
        style={(theme: EmpoleonTheme) => ({ color: theme.colors.pink[4] })}
      />
    );

    expect(container.querySelector(options.selector || '*:not(style)')).toHaveStyle({
      color: DEFAULT_THEME.colors.pink[4],
    });
  });

  it(`${name}: array of objects`, () => {
    const { container } = renderComponent(
      () => <options.component
        {...options.props}
        style={[{ color: 'salmon' }, { background: 'olive' }]}
      />
    );

    expect(container.querySelector(options.selector || '*:not(style)')).toHaveStyle({
      color: 'rgb(250, 128, 114)',
      background: 'olive',
    });
  });

  it(`${name}: array of theme functions`, () => {
    const { container } = renderComponent(
      () => <options.component
        {...options.props}
        style={[
          (theme: EmpoleonTheme) => ({ color: theme.colors.pink[4] }),
          (theme: EmpoleonTheme) => ({ background: theme.colors.orange[9] }),
        ]}
      />
    );

    expect(container.querySelector(options.selector || '*:not(style)')).toHaveStyle({
      color: DEFAULT_THEME.colors.pink[4],
      background: DEFAULT_THEME.colors.orange[9],
    });
  });
}
