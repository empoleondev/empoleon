import { JSX, splitProps } from 'solid-js';
import { Box, BoxProps, ElementProps, useDirection } from '../../../core';
import { useRatingContext } from '../Rating.context';
import { StarSymbol } from '../StarSymbol/StarSymbol';

export interface RatingItemProps extends BoxProps, ElementProps<'input', 'value' | 'size'> {
  getSymbolLabel: ((value: number) => string) | undefined;
  emptyIcon?: JSX.Element | ((value: number) => JSX.Element);
  fullIcon?: JSX.Element | ((value: number) => JSX.Element);
  full: boolean;
  active: boolean;
  fractionValue: number;
  value: number;
  id: string;
  onChange: (event: Event | number) => void;
  onInputChange: (event: Event | number) => void;
}

export function RatingItem(props: RatingItemProps) {
  const [local, others] = splitProps(props, [
    'getSymbolLabel',
    'emptyIcon',
    'fullIcon',
    'full',
    'active',
    'value',
    'readOnly',
    'fractionValue',
    'color',
    'id',
    'onBlur',
    'onChange',
    'onInputChange',
    'style',
  ]);

  const ctx = useRatingContext();
  const _fullIcon = typeof local.fullIcon === 'function' ? local.fullIcon(local.value) : local.fullIcon;
  const _emptyIcon = typeof local.emptyIcon === 'function' ? local.emptyIcon(local.value) : local.emptyIcon;
  const { dir } = useDirection();

  return (
    <>
      {!local.readOnly && (
        <input
          {...ctx.getStyles('input')}
          onKeyDown={(event) => event.key === ' ' && local.onChange(local.value)}
          id={local.id}
          type="radio"
          data-active={local.active || undefined}
          aria-label={local.getSymbolLabel?.(local.value)}
          value={local.value}
          onBlur={local.onBlur}
          onChange={local.onInputChange}
          {...others}
        />
      )}

      <Box
        component={local.readOnly ? 'div' : 'label'}
        {...ctx.getStyles('label')}
        data-read-only={local.readOnly || undefined}
        html-for={local.id}
        onClick={() => local.onChange(local.value)}
        __vars={{
          '--rating-item-z-index': (local.fractionValue === 1 ? undefined : local.active ? 2 : 0)?.toString(),
        }}
      >
        <Box
          {...ctx.getStyles('symbolBody')}
          __vars={{
            '--rating-symbol-clip-path':
            local.fractionValue === 1
                ? undefined
                : dir === 'ltr'
                  ? `inset(0 ${local.active ? 100 - local.fractionValue * 100 : 100}% 0 0)`
                  : `inset(0 0 0 ${local.active ? 100 - local.fractionValue * 100 : 100}% )`,
          }}
        >
          {local.full
            ? _fullIcon || <StarSymbol type="full" />
            : _emptyIcon || <StarSymbol type="empty" />}
        </Box>
      </Box>
    </>
  );
}

RatingItem.displayName = '@empoleon/core/RatingItem';
