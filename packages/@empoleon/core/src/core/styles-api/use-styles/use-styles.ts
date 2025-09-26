import { createEffect, JSX } from 'solid-js';
import type { EmpoleonStyleProp } from '../../Box';
import { FactoryPayload } from '../../factory';
import {
  useEmpoleonClassNamesPrefix,
  useEmpoleonIsHeadless,
  useEmpoleonTheme,
  useEmpoleonWithStaticClasses,
} from '../../EmpoleonProvider';
import { PartialVarsResolver, VarsResolver } from '../create-vars-resolver/create-vars-resolver';
import { Attributes, ClassNames, ClassNamesArray, GetStylesApiOptions, Styles } from '../styles-api.types';
import { getClassName } from './get-class-name/get-class-name';
import { getStyle } from './get-style/get-style';
import { useStylesTransform } from './use-transformed-styles';

export interface UseStylesInput<Payload extends FactoryPayload> {
  name: string | (string | undefined)[];
  classes: Payload['stylesNames'] extends string ? Record<string, string> : never;
  props: Payload['props'];
  stylesCtx?: Payload['ctx'];
  className?: string;
  style?: EmpoleonStyleProp;
  rootSelector?: Payload['stylesNames'];
  unstyled?: boolean;
  classNames?: ClassNames<Payload> | ClassNamesArray<Payload>;
  styles?: Styles<Payload>;
  vars?: PartialVarsResolver<Payload>;
  varsResolver?: VarsResolver<Payload>;
  attributes?: Attributes<Payload>;
}

// type StyleProp = JSX.HTMLAttributes<any>['style']

export type GetStylesApi<Payload extends FactoryPayload> = (
  selector: NonNullable<Payload['stylesNames']>,
  options?: GetStylesApiOptions
) => {
  className: string;
  style: (() => JSX.CSSProperties) | JSX.CSSProperties;
};

export function useStyles<Payload extends FactoryPayload>(_props: UseStylesInput<Payload>): GetStylesApi<Payload> {
  const theme = useEmpoleonTheme();
  const classNamesPrefix = useEmpoleonClassNamesPrefix();
  const withStaticClasses = useEmpoleonWithStaticClasses();
  const headless = useEmpoleonIsHeadless();
  const themeName = (Array.isArray(_props.name) ? _props.name : [_props.name]).filter((n) => n) as string[];
  const { withStylesTransform, getTransformedStyles } = useStylesTransform({
    props: _props.props,
    stylesCtx: _props.stylesCtx,
    themeName,
  });

  const rootSelector = (_props.rootSelector || ('root' as NonNullable<Payload['stylesNames']>));

  return (selector, options) => ({
    className: getClassName({
      theme,
      options,
      themeName,
      selector,
      classNamesPrefix,
      classNames: _props.classNames,
      classes: _props.classes,
      unstyled: _props.unstyled,
      className: _props.className,
      rootSelector,
      props: _props.props,
      stylesCtx: _props.stylesCtx,
      withStaticClasses,
      headless,
      transformedStyles: getTransformedStyles([options?.styles, _props.styles]),
    }),

    style: process.env.NODE_ENV === 'test' ?
      getStyle({
      theme,
      themeName,
      selector,
      options,
      props: _props.props,
      stylesCtx: _props.stylesCtx,
      rootSelector,
      styles: _props.styles,
      style: _props.style,
      vars: _props.vars,
      varsResolver: _props.varsResolver,
      headless,
      withStylesTransform,
    }) :
    () => getStyle({
      theme,
      themeName,
      selector,
      options,
      props: _props.props,
      stylesCtx: _props.stylesCtx,
      rootSelector,
      styles: _props.styles,
      style: _props.style,
      vars: _props.vars,
      varsResolver: _props.varsResolver,
      headless,
      withStylesTransform,
    }),

    ..._props.attributes?.[selector],
  });
}
