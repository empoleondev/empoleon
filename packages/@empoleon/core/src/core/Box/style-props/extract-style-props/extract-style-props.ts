import { splitProps } from 'solid-js';
import { filterProps } from '../../../utils';
import type { EmpoleonStyleProps } from '../style-props.types';

export function extractStyleProps<T extends Record<string, any>>(
  others: EmpoleonStyleProps & T
): { styleProps: EmpoleonStyleProps & { sx?: any }; rest: T } {
  const [local, rest] = splitProps(others, [
    'm',
    'mx',
    'my',
    'mt',
    'mb',
    'ml',
    'mr',
    'me',
    'ms',
    'p',
    'px',
    'py',
    'pt',
    'pb',
    'pl',
    'pr',
    'pe',
    'ps',
    'bd',
    'bdrs',
    'bg',
    'c',
    'opacity',
    'ff',
    'fz',
    'fw',
    'lts',
    'ta',
    'lh',
    'fs',
    'tt',
    'td',
    'w',
    'miw',
    'maw',
    'h',
    'mih',
    'mah',
    'bgsz',
    'bgp',
    'bgr',
    'bga',
    'pos',
    'top',
    'left',
    'bottom',
    'right',
    'inset',
    'display',
    'flex',
    'hiddenFrom',
    'visibleFrom',
    'lightHidden',
    'darkHidden',
    'sx',
  ]);

  const styleProps = filterProps(local);

  return { styleProps, rest: rest as unknown as T };
}
