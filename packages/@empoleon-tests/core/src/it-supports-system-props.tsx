import { ParentComponent } from 'solid-js';
import { itHasClasses } from './shared/it-has-classes';
import { itHasExtend } from './shared/it-has-extend';
import { itHasWithProps } from './shared/it-has-withProps';
import { itIsPolymorphic } from './shared/it-is-polymorphic';
import { itRendersChildren } from './shared/it-renders-children';
import { itSupportsClassName } from './shared/it-supports-classname';
import { itSupportsHiddenVisible } from './shared/it-supports-hidden-visible';
import { itSupportsId } from './shared/it-supports-id';
import { itSupportsLightDarkHidden } from './shared/it-supports-light-dark-hidden';
import { itSupportsMod } from './shared/it-supports-mod';
import { itSupportsOthers } from './shared/it-supports-others';
import { itSupportsProviderDefaultProps } from './shared/it-supports-provider-default-props';
import { itSupportsRef } from './shared/it-supports-ref';
import { itSupportsSize } from './shared/it-supports-size';
import { itSupportsStyle } from './shared/it-supports-style';
import { itSupportsStylesApi } from './shared/it-supports-style-api';
import { itSupportsVariant } from './shared/it-supports-variant';
import { itSupportsBackgroundProps } from './style-props/it-supports-background-props';
import { itSupportsColorsProps } from './style-props/it-supports-colors-props';
import { itSupportsFontsProps } from './style-props/it-supports-fonts-props';
import { itSupportsMarginsProps } from './style-props/it-supports-margins-props';
import { itSupportsPaddingsProps } from './style-props/it-supports-paddings-props';
import { itSupportsPositionProps } from './style-props/it-supports-position-props';
import { itSupportsSizeProps } from './style-props/it-supports-size-props';

interface Options<Props extends Record<string, any>, StylesApiSelectors extends string> {
  component: ParentComponent<Props>;
  props: () => Props;
  mod?: boolean;
  classes?: boolean;
  withProps?: boolean;
  styleProps?: boolean;
  polymorphic?: boolean;
  children?: boolean;
  extend?: boolean;
  variant?: boolean;
  id?: boolean;
  size?: boolean;
  displayName?: string;
  selector?: string;
  refType?: any;
  refProp?: string;
  providerName?: string | null;
  stylesApiName?: string;
  stylesApiSelectors?: StylesApiSelectors[];
  polymorphicSelector?: string;
  variantSelector?: string;
  sizeSelector?: string;
  providerStylesApi?: boolean;
  compound?: boolean;
}

export function itSupportsSystemProps<
  Props extends Record<string, any>,
  StylesApiSelectors extends string = string,
>(options: Options<Props, StylesApiSelectors>) {
  describe('supports system properties', () => {
    const splittedDisplayName = options.displayName ? options.displayName.split('/') : [];
    const predictedProviderName = options.displayName
      ? splittedDisplayName[splittedDisplayName.length - 1]
      : undefined;
    const providerName = options.providerName || predictedProviderName;
    const stylesApiName = options.stylesApiName || providerName;

    const getProps = () => typeof options.props === 'function' ? options.props() : options.props;

    itSupportsClassName({ ...options, props: getProps });
    itSupportsHiddenVisible({ ...options, props: getProps });
    itSupportsLightDarkHidden({ ...options, props: getProps });
    itSupportsStyle({ ...options, props: getProps });
    itSupportsOthers({ ...options, props: getProps });
    options.refType && itSupportsRef({ ...options, props: getProps, refType: options.refType });
    options.polymorphic &&
      itIsPolymorphic({ ...options, props: getProps, selector: options.polymorphicSelector || options.selector });
    options.children && itRendersChildren({ ...options, props: getProps });
    // typeof providerName === 'string' &&
    //   options.providerName !== null &&
    //   itSupportsProviderDefaultProps({ ...options, props: getProps, providerName });

    if (options.styleProps) {
      itSupportsMarginsProps(options);
      itSupportsPaddingsProps(options);
      itSupportsColorsProps(options);
      itSupportsFontsProps(options);
      itSupportsSizeProps(options);
      itSupportsBackgroundProps(options);
      itSupportsPositionProps(options);
    }

    if (options.variant) {
      itSupportsVariant({ ...options, props: getProps, selector: options.variantSelector || options.selector });
    }

    if (options.size) {
      itSupportsSize({ ...options, props: getProps, selector: options.sizeSelector || options.selector });
    }

    if (options.mod) {
      itSupportsMod({ ...options, props: getProps, selector: options.sizeSelector || options.selector });
    }

    if (Array.isArray(options.stylesApiSelectors) && stylesApiName) {
      itSupportsStylesApi<Props, StylesApiSelectors>({
        ...options,
        props: getProps,
        selectors: options.stylesApiSelectors,
        providerName: stylesApiName,
      });
    }

    if (options.extend) {
      itHasExtend(options);
    }

    if (options.classes) {
      itHasClasses(options);
    }

    if (options.withProps) {
      itHasWithProps(options);
    }

    if (options.id) {
      itSupportsId(options);
    }

    if (options.displayName) {
      it('has correct displayName', () => {
        expect((options.component as any).displayName).toBe(options.displayName);
      });
    }
  });
}
