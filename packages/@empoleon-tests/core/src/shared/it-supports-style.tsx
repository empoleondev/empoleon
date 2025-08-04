import { DEFAULT_THEME, EmpoleonTheme } from '@empoleon/core';
import { render } from '../render';
import { JSX } from 'solid-js';
import { getPropsValue } from './get-props-value';

interface Options<Props = any> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  selector?: string;
}

export function itSupportsStyle<Props>(options: Options<Props>, name = 'supports style') {
  it(`${name}: object`, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithStyle = { ...baseProps, style: { color: 'salmon' } } as Props & { style: any };

    const { container } = render(
      () => <options.component {...propsWithStyle} style={{ color: 'salmon' }} />
    );

    expect(container.querySelector(options.selector || '*:not(style)')).toHaveStyle({
      color: 'rgb(250, 128, 114)',
    });
  });

  it(`${name}: theme function`, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithStyle = { ...baseProps, style: (theme: EmpoleonTheme) => ({ color: theme.colors.pink[4] }) } as Props & { style: any };

    const { container } = render(
      () => <options.component
        {...propsWithStyle}
        style={(theme: EmpoleonTheme) => ({ color: theme.colors.pink[4] })}
      />
    );

    expect(container.querySelector(options.selector || '*:not(style)')).toHaveStyle({
      color: DEFAULT_THEME.colors.pink[4],
    });
  });

  it(`${name}: array of objects`, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithStyle = { ...baseProps, style: [{ color: 'salmon' }, { background: 'olive' }] } as Props & { style: any };

    const { container } = render(
      () => <options.component
        {...propsWithStyle}
        style={[{ color: 'salmon' }, { background: 'olive' }]}
      />
    );

    expect(container.querySelector(options.selector || '*:not(style)')).toHaveStyle({
      color: 'rgb(250, 128, 114)',
      background: 'olive',
    });
  });

  it(`${name}: array of theme functions`, () => {
    const baseProps = getPropsValue(options.props);
    const propsWithStyle = { ...baseProps, style: [
      (theme: EmpoleonTheme) => ({ color: theme.colors.pink[4] }),
      (theme: EmpoleonTheme) => ({ background: theme.colors.orange[9] }),
    ] } as Props & { style: any };

    const { container } = render(
      () => <options.component
        {...propsWithStyle}
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
