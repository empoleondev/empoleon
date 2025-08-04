import cx from 'clsx';
import { EmpoleonTheme } from '../../../EmpoleonProvider';
import { GetStylesApiOptions } from '../../styles-api.types';
import { getGlobalClassNames } from './get-global-class-names/get-global-class-names';
import { getOptionsClassNames } from './get-options-class-names/get-options-class-names';
import { getResolvedClassNames } from './get-resolved-class-names/get-resolved-class-names';
import { getRootClassName } from './get-root-class-name/get-root-class-name';
import { getSelectorClassName } from './get-selector-class-name/get-selector-class-name';
import { getStaticClassNames } from './get-static-class-names/get-static-class-names';
import { getThemeClassNames } from './get-theme-class-names/get-theme-class-names';
import { getVariantClassName } from './get-variant-class-name/get-variant-class-name';

type __ClassNames =
  | undefined
  | Partial<Record<string, string>>
  | ((
      theme: EmpoleonTheme,
      props: Record<string, any>,
      ctx: Record<string, any> | undefined
    ) => Partial<Record<string, string>>);

export type _ClassNames = __ClassNames | __ClassNames[];

export interface GetClassNameOptions {
  /** Theme object, resolved by hook */
  theme: EmpoleonTheme;

  /** Options for specified selector, may include `classNames` or `className` */
  options: GetStylesApiOptions | undefined;

  /** Name of the component which is used to get `classNames` from `theme.components` */
  themeName: string[];

  /** Class part specified in `getStyles` */
  selector: string;

  /** Prefix for all class names, resolved by hook, `empoleon` by default */
  classNamesPrefix: string;

  /** `classNames` specified in the hook, only resolved `classNames[selector]` is added to the list */
  classNames: _ClassNames;

  /** Classes object, usually imported from `*.module.css` */
  classes: Record<string, string>;

  /** Determines whether classes from `classes` should be added to the list */
  unstyled: boolean | undefined;

  /** `className` specified in the hook, added to the list if `selector` is `rootSelector` */
  className: string | undefined;

  /** `rootSelector` specified in the hook, determines whether `className` should be added to the list */
  rootSelector: string;

  /** Component props, used as context for `classNames` and `options.classNames` */
  props: Record<string, any>;

  /** Component styles context, used as context for `classNames` and `options.classNames` */
  stylesCtx?: Record<string, any> | undefined;

  /** Determines whether static classes should be added */
  withStaticClasses?: boolean;

  /** If set, removes all Empoleon classes */
  headless?: boolean;

  /** `styles` prop transformed into classes with CSS-in-JS library, for example, emotion */
  transformedStyles?: Record<string, string>[];
}

export function getClassName(_props: GetClassNameOptions) {
  return cx(
    getGlobalClassNames({ theme: _props.theme, options: _props.options, unstyled: _props.unstyled || _props.headless }),
    getThemeClassNames({ theme: _props.theme, themeName: _props.themeName, selector: _props.selector, props: _props.props, stylesCtx: _props.stylesCtx }),
    getVariantClassName({ options: _props.options, classes: _props.classes, selector: _props.selector, unstyled: _props.unstyled }),
    getResolvedClassNames({ selector: _props.selector, stylesCtx: _props.stylesCtx, theme: _props.theme, classNames: _props.classNames, props: _props.props }),
    getResolvedClassNames({ selector: _props.selector, stylesCtx: _props.stylesCtx, theme: _props.theme, classNames: _props.transformedStyles, props: _props.props }),
    getOptionsClassNames({ selector: _props.selector, stylesCtx: _props.stylesCtx, options: _props.options, props: _props.props, theme: _props.theme }),
    getRootClassName({ rootSelector: _props.rootSelector, selector: _props.selector, className: _props.className }),
    getSelectorClassName({ selector: _props.selector, classes: _props.classes, unstyled: _props.unstyled || _props.headless }),
    _props.withStaticClasses &&
      !_props.headless &&
      getStaticClassNames({
        themeName: _props.themeName,
        classNamesPrefix: _props.classNamesPrefix,
        selector: _props.selector,
        withStaticClass: _props.options?.withStaticClass,
      }),
    _props.options?.className
  );
}
