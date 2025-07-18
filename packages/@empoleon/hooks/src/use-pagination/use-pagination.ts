import { Accessor, createEffect, createMemo, splitProps } from 'solid-js';
import { useUncontrolled } from '../use-uncontrolled/use-uncontrolled';

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

export const DOTS = 'dots';

export interface PaginationParams {
  /** Page selected on initial render, defaults to 1 */
  initialPage?: Accessor<number>;

  /** Controlled active page number */
  page?: Accessor<number>;

  /** Total amount of pages */
  total: Accessor<number>;

  /** Siblings amount on left/right side of selected page, defaults to 1 */
  siblings?: Accessor<number>;

  /** Amount of elements visible on left/right edges, defaults to 1  */
  boundaries?: Accessor<number>;

  /** Callback fired after change of each page */
  onChange?: (page: number) => void;
}

export function usePagination(props: PaginationParams) {
  const [local] = splitProps(props, [
    'total',
    'siblings',
    'boundaries',
    'page',
    'initialPage',
    'onChange',
  ]);

  const siblings = createMemo(() => local.siblings?.() ?? 1);
  const boundaries = createMemo(() => local.boundaries?.() ?? 1);
  const initialPage = createMemo(() => local.initialPage?.() ?? 1);

  const _total = createMemo(() => Math.max(Math.trunc(local.total()), 0));
  const [activePage, setActivePage] = useUncontrolled({
    value: local.page,
    onChange: local.onChange,
    defaultValue: initialPage(),
    finalValue: initialPage(),
  });

  // createEffect(() => {
  //   console.log(`[usePagination Hook] Active page state is now: ${activePage()}`);
  // });

  const setPage = (pageNumber: number) => {
    // console.log(`[usePagination Hook] setPage called with: ${pageNumber}`);

    if (pageNumber <= 0) {
      setActivePage(1);
    } else if (pageNumber > _total()) {
      setActivePage(_total());
    } else {
      setActivePage(pageNumber);
    }
  };

  const next = () => setPage(activePage() + 1);
  const previous = () => setPage(activePage() - 1);
  const first = () => setPage(1);
  const last = () => setPage(_total());

  const paginationRange = createMemo((): (number | 'dots')[] => {
    const totalPageNumbers = siblings() * 2 + 3 + boundaries() * 2;
    if (totalPageNumbers >= _total()) {
      return range(1, _total());
    }

    const leftSiblingIndex = Math.max(activePage() - siblings(), boundaries());
    const rightSiblingIndex = Math.min(activePage() + siblings(), _total() - boundaries());

    const shouldShowLeftDots = leftSiblingIndex > boundaries() + 2;
    const shouldShowRightDots = rightSiblingIndex < _total() - (boundaries() + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings() * 2 + boundaries() + 2;
      return [...range(1, leftItemCount), DOTS, ...range(_total() - (boundaries() - 1), _total())];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries() + 1 + 2 * siblings();
      return [...range(1, boundaries()), DOTS, ...range(_total() - rightItemCount, _total())];
    }

    return [
      ...range(1, boundaries()),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(_total() - boundaries() + 1, _total()),
    ];
  });

  return {
    range: paginationRange,
    active: activePage,
    setPage,
    next,
    previous,
    first,
    last,
  };
}
