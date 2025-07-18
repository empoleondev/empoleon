import { Index } from 'solid-js';
import { usePaginationContext } from '../Pagination.context';
import { PaginationControl } from '../PaginationControl/PaginationControl';
import { PaginationDots } from '../PaginationDots/PaginationDots';

export interface PaginationItemsProps {
  /** Dots icon component */
  dotsIcon?: any;
}

export function PaginationItems(props: PaginationItemsProps) {
  const ctx = usePaginationContext();
  const range = ctx.range;

  return (
    <Index each={range()}>
      {(page) => (
        // div forces index to re-render
        <div>
          {page() === 'dots' ? (
            <PaginationDots icon={props.dotsIcon} />
          ) : (
            <PaginationControl
              active={page() === ctx.active()}
              onClick={() => ctx.onChange(page() as number)}
              disabled={ctx.disabled()}
              {...ctx.getItemProps?.(page() as number)}
            >
              {ctx.getItemProps?.(page() as number)?.children ?? page()}
            </PaginationControl>
          )}
        </div>
      )}
    </Index>
  );
}

PaginationItems.displayName = '@empoleon/core/PaginationItems';
