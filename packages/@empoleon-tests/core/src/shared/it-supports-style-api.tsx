import { DEFAULT_THEME, EmpoleonTheme } from '@empoleon/core';
import { render } from '../render';
import { JSX } from 'solid-js';
import { getPropsValue } from './get-props-value';

const randomNumber = (min = 10, max = 100) => Math.floor(Math.random() * (max - min + 1) + min);
const getTestObjectClassNames = (selectors: string[]) =>
  selectors.reduce<Record<string, string>>((acc, selector) => {
    acc[selector] = `test-${selector}`;
    return acc;
  }, {});

const getTestFunctionClassNames = (selectors: string[]) => (theme: EmpoleonTheme, props: any) => {
  const result = selectors.reduce<Record<string, string>>((acc, selector) => {
    acc[selector] = `test-${
      props['data-test'] === undefined ? Math.random() : props['data-test']
    }-${theme === undefined ? Math.random() : theme.defaultRadius}-${selector}`;
    return acc;
  }, {});

  return result;
};

interface Options<Props extends Record<string, any> = any, Selectors extends string = string> {
  component: (props: Props) => JSX.Element;
  props: Props | (() => Props)
  selectors: Selectors[];
  providerName: string;
  providerStylesApi?: boolean;
  compound?: boolean;
}

export function itSupportsStylesApi<
  Props extends Record<string, any>,
  Selectors extends string = string,
>(options: Options<Props, Selectors>, name = 'supports styles api') {
  it(`${name}: classNames (inline object)`, () => {
    const classNames = getTestObjectClassNames(options.selectors);
    const baseProps = getPropsValue(options.props);
    const propsWithClassNames = { ...baseProps, classNames } as Props & { classNames: any };
    const { container } = render(() => <options.component {...propsWithClassNames} />);

    options.selectors.forEach((selector) => {
      try {
        expect(container.querySelector(`.${classNames[selector]}`)).toBeInTheDocument();
      } catch (e) {
        throw new Error(`Missing selector: .${classNames[selector]} - Check if this component actually renders elements with the '${selector}' selector`);
      }
    });
  });

  if (!options.compound) {
    it(`${name}: classNames (inline function)`, () => {
      const classNames = getTestFunctionClassNames(options.selectors);
      const baseProps = getPropsValue(options.props);
      const { container } = render(
        () => <options.component {...baseProps} data-test="__test" classNames={classNames} />
      );
      options.selectors.forEach((selector) => {
        expect(
          container.querySelector(
            `.${classNames(DEFAULT_THEME, { 'data-test': '__test' })[selector]}`
          )
        ).toBeInTheDocument();
      });
    });
  }

  it(`${name}: styles (inline object)`, () => {
    const classNames = getTestObjectClassNames(options.selectors);
    const styles = options.selectors.reduce<Record<string, JSX.CSSProperties>>(
      (acc, selector) => {
        acc[selector] = { 'font-size': `${randomNumber()}px` };
        return acc;
      },
      {}
    );

    const baseProps = getPropsValue(options.props);
    const { container } = render(
      () => <options.component {...baseProps} classNames={classNames} styles={styles} />
    );

    options.selectors.forEach((selector) => {
      expect(container.querySelector(`.${classNames[selector]}`)).toHaveStyle({
        ...styles[selector],
      });
    });
  });

  if (!options.compound) {
    it(`${name}: styles (inline function)`, () => {
      const classNames = getTestObjectClassNames(options.selectors);
      const styles = (theme: EmpoleonTheme, props: any) =>
        options.selectors.reduce<Record<string, JSX.CSSProperties>>((acc, selector) => {
          acc[selector] = {
            'outline-color': props['data-test'],
            'box-shadow': theme.shadows.xl,
          };
          return acc;
        }, {});

      const baseProps = getPropsValue(options.props);
      const { container } = render(
        () => <options.component
          {...baseProps}
          data-test="orange"
          classNames={classNames}
          styles={styles}
        />
      );

      options.selectors.forEach((selector) => {
        expect(container.querySelector(`.${classNames[selector]}`)).toHaveStyle({
          ...styles(DEFAULT_THEME, { 'data-test': 'rgb(255, 165, 0)' })[selector],
        });
      });
    });
  }

  it(`${name}: static classNames (default)`, () => {
    const baseProps = getPropsValue(options.props);
    const { container } = render(() => <options.component {...baseProps} />);
    options.selectors.forEach((selector) => {
      try {
        expect(
          container.querySelector(`.empoleon-${options.providerName}-${selector}`)
        ).toBeInTheDocument();
      } catch (e) {
        throw new Error(`Missing selector: .empoleon-${options.providerName}-${selector}`);
      }
    });
  });

  if (options.providerStylesApi === undefined || options.providerStylesApi === true) {
    it(`${name}: classNames (EmpoleonProvider object)`, () => {
      const classNames = getTestObjectClassNames(options.selectors);
      const baseProps = getPropsValue(options.props);
      const { container } = render(
        () => <options.component {...baseProps} classNames={classNames} />,
        {
          components: {
            [options.providerName]: {
              classNames,
            },
          },
        }
      );

      options.selectors.forEach((selector) => {
        expect(container.querySelector(`.${classNames[selector]}`)).toBeInTheDocument();
      });
    });

    it(`${name}: classNames (EmpoleonProvider function)`, () => {
      const classNames = getTestFunctionClassNames(options.selectors);
      const baseProps = getPropsValue(options.props);
      const { container } = render(
        () => <options.component {...baseProps} data-test="__test" classNames={classNames} />,
        {
          components: {
            [options.providerName]: {
              classNames: classNames as any,
            },
          },
        }
      );
      options.selectors.forEach((selector) => {
        expect(
          container.querySelector(
            `.${classNames(DEFAULT_THEME, { 'data-test': '__test' })[selector]}`
          )
        ).toBeInTheDocument();
      });
    });

    it(`${name}: styles (EmpoleonProvider object)`, () => {
      const classNames = getTestObjectClassNames(options.selectors);
      const styles = options.selectors.reduce<Record<string, JSX.CSSProperties>>(
        (acc, selector) => {
          acc[selector] = { 'font-size': `${randomNumber()}px` };
          return acc;
        },
        {}
      );

      const baseProps = getPropsValue(options.props);
      const { container } = render(() => <options.component {...baseProps} />, {
        components: {
          [options.providerName]: {
            styles,
            classNames,
          },
        },
      });

      options.selectors.forEach((selector) => {
        expect(container.querySelector(`.${classNames[selector]}`)).toHaveStyle({
          ...styles[selector],
        });
      });
    });

    it(`${name}: styles (EmpoleonProvider function)`, () => {
      const classNames = getTestObjectClassNames(options.selectors);
      const styles = (theme: EmpoleonTheme, props: any) =>
        options.selectors.reduce<Record<string, JSX.CSSProperties>>((acc, selector) => {
          acc[selector] = {
            'outline-color': props['data-test'],
            'box-shadow': theme.shadows.xl,
          };
          return acc;
        }, {});

      const { container } = render(() => {
        const baseProps = getPropsValue(options.props);
        const propsWithDataTest = { ...baseProps, "data-test": "orange" } as Props & { "data-test": string };
        return <options.component {...propsWithDataTest} data-test="orange" />;
      }, {
        components: {
          [options.providerName]: {
            styles: styles as any,
            classNames: classNames as any,
          },
        },
      });

      options.selectors.forEach((selector) => {
        try {
          expect(container.querySelector(`.${classNames[selector]}`)).toHaveStyle({
            ...styles(DEFAULT_THEME, { 'data-test': 'rgb(255, 165, 0)' })[selector],
          });
        } catch (e) {
          throw new Error(`Missing selector: .test-${options.providerName}-${selector}`);
        }
      });
    });

    it(`${name}: static classNames (EmpoleonProvider)`, () => {
      const { container } = render(
        () => {
          const baseProps = getPropsValue(options.props);
          return <options.component {...baseProps} />;
        },
        {},
        { classNamesPrefix: 'test' }
      );

      options.selectors.forEach((selector) => {
        try {
          expect(
            container.querySelector(`.test-${options.providerName}-${selector}`)
          ).toBeInTheDocument();
        } catch (e) {
          throw new Error(`Missing selector: .test-${options.providerName}-${selector}`);
        }
      });
    });
  }
}
