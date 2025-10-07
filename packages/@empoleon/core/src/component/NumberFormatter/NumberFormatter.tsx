import { JSX, splitProps } from 'solid-js';
import { NumericFormat } from '@empoleon/solid-number-format';
import { EmpoleonThemeComponent, ExtendComponent, Factory, useProps } from '../../core';

export interface NumberFormatterProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  /** Value to format */
  value?: number | string;

  /** Default Value (for SolidJS) */
  defaultValue?: number | string;

  /** Determines whether negative values are allowed, `true` by default */
  allowNegative?: boolean;

  /** Limits the number of digits that are displayed after the decimal point, by default there is no limit */
  decimalScale?: number;

  /** Character used as a decimal separator, `'.'` by default */
  decimalSeparator?: string;

  /** If set, 0s are added after `decimalSeparator` to match given `decimalScale`. `false` by default */
  fixedDecimalScale?: boolean;

  /** Prefix added before the value */
  prefix?: string;

  /** Suffix added after the value */
  suffix?: string;

  /** Defines the thousand grouping style */
  thousandsGroupStyle?: 'thousand' | 'lakh' | 'wan' | 'none';

  /** A character used to separate thousands, `','` by default */
  thousandSeparator?: string | boolean;
}

export type NumberFormatterFactory = Factory<{
  props: NumberFormatterProps;
  ref: HTMLDivElement;
}>;

export function NumberFormatter(_props: NumberFormatterProps) {
  const props = useProps('NumberFormatter', null, _props);
  const [local, others] = splitProps(props, ['value', 'defaultValue']);

  if (local.value === undefined) {
    return null;
  }

  return <NumericFormat displayType="text" value={local.value} {...others} />;
}

// @ts-ignore
const extendNumberFormatter = (
  c: ExtendComponent<NumberFormatterFactory>
): EmpoleonThemeComponent => c;

NumberFormatter.extend = extendNumberFormatter;
NumberFormatter.displayName = '@empoleon/core/NumberFormatter';
