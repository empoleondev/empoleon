import { JSX } from 'solid-js';
import { EmpoleonTheme } from '../../../EmpoleonProvider';
import { keys } from '../../../utils';
import { resolvers } from '../resolvers';
import type { SystemPropData } from '../style-props-data';
import type { StyleProp } from '../style-props.types';
import { sortMediaQueries, SortMediaQueriesResult } from './sort-media-queries';

function hasResponsiveStyles(styleProp: StyleProp<unknown>) {
  if (typeof styleProp !== 'object' || styleProp === null) {
    return false;
  }

  const breakpoints = Object.keys(styleProp);

  if (breakpoints.length === 1 && breakpoints[0] === 'base') {
    return false;
  }

  return true;
}

function getBaseValue(value: StyleProp<unknown>) {
  if (typeof value === 'object' && value !== null) {
    if ('base' in value) {
      return value.base;
    }

    return undefined;
  }

  return value;
}

function getBreakpointKeys(value: StyleProp<unknown>) {
  if (typeof value === 'object' && value !== null) {
    return keys(value).filter((key) => key !== 'base');
  }

  return [];
}

function getBreakpointValue(value: StyleProp<unknown>, breakpoint: string) {
  if (typeof value === 'object' && value !== null && breakpoint in value) {
    return value[breakpoint as keyof typeof value];
  }

  return value;
}

interface ParseStylePropsOptions {
  styleProps: Record<string, StyleProp<any>>;
  theme: EmpoleonTheme;
  data: Record<string, SystemPropData>;
}

export interface ParseStylePropsResult {
  hasResponsiveStyles: boolean;
  inlineStyles: JSX.CSSProperties;
  styles: JSX.CSSProperties;
  media: Record<string, JSX.CSSProperties>;
}

function camelToKebab(str: string) {
  return str.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
}

export function parseStyleProps(props: ParseStylePropsOptions): SortMediaQueriesResult {
  return sortMediaQueries(
    keys(props.styleProps).reduce<{
      hasResponsiveStyles: boolean;
      inlineStyles: JSX.CSSProperties;
      styles: JSX.CSSProperties;
      media: Record<string, JSX.CSSProperties>;
    }>(
      (acc, styleProp) => {
        if (
          (styleProp as string) === 'hiddenFrom' ||
          (styleProp as string) === 'visibleFrom' ||
          (styleProp as string) === 'sx'
        ) {
          return acc;
        }

        const propertyData = props.data[styleProp];
        const properties = Array.isArray(propertyData.property)
          ? propertyData.property
          : [propertyData.property];
        const baseValue = getBaseValue(props.styleProps[styleProp]);

        if (!hasResponsiveStyles(props.styleProps[styleProp])) {
          properties.forEach((property) => {
            // change from camelCase to kebab-case
            (acc.inlineStyles as any)[camelToKebab(property)] = resolvers[propertyData.type](
              baseValue,
              props.theme
            );
          });

          return acc;
        }

        acc.hasResponsiveStyles = true;

        const breakpoints = getBreakpointKeys(props.styleProps[styleProp]);

        properties.forEach((property) => {
          if (baseValue) {
            (acc.styles as any)[property] = resolvers[propertyData.type](baseValue, props.theme);
          }

          breakpoints.forEach((breakpoint) => {
            const bp = `(min-width: ${props.theme.breakpoints[breakpoint]})`;
            acc.media[bp] = {
              ...acc.media[bp],
              [property]: resolvers[propertyData.type](
                getBreakpointValue(props.styleProps[styleProp], breakpoint),
                props.theme
              ),
            };
          });
        });

        return acc;
      },
      {
        hasResponsiveStyles: false,
        styles: {},
        inlineStyles: {},
        media: {},
      }
    )
  );
}
