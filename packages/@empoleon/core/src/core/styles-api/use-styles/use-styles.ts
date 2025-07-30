import { JSX } from 'solid-js';
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
  style: JSX.CSSProperties;
};

export function useStyles<Payload extends FactoryPayload>({
  name,
  classes,
  props,
  stylesCtx,
  className,
  style,
  rootSelector = 'root' as NonNullable<Payload['stylesNames']>,
  unstyled,
  classNames,
  styles,
  vars,
  varsResolver,
  attributes,
}: UseStylesInput<Payload>): GetStylesApi<Payload> {
  const theme = useEmpoleonTheme();
  const classNamesPrefix = useEmpoleonClassNamesPrefix();
  const withStaticClasses = useEmpoleonWithStaticClasses();
  const headless = useEmpoleonIsHeadless();
  const themeName = (Array.isArray(name) ? name : [name]).filter((n) => n) as string[];
  const stylesTransformProps = useStylesTransform({
    props,
    stylesCtx,
    themeName,
  });

  return (selector, options) => ({
    className: getClassName({
      theme,
      options,
      themeName,
      selector,
      classNamesPrefix,
      classNames,
      classes,
      unstyled,
      className,
      rootSelector,
      props,
      stylesCtx,
      withStaticClasses,
      headless,
      transformedStyles: stylesTransformProps.getTransformedStyles([options?.styles, styles]),
    }),

    style: getStyle({
      theme,
      themeName,
      selector,
      options,
      props,
      stylesCtx,
      rootSelector,
      styles,
      style,
      vars,
      varsResolver,
      headless,
      withStylesTransform: stylesTransformProps.withStylesTransform,
    }),

    ...attributes?.[selector],
  });
}
