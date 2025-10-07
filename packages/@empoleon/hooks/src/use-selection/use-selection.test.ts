import { renderHook } from '@solidjs/testing-library';
import { createSignal } from 'solid-js';
import { describe, expect, it, vi } from 'vitest';
import { useSelection } from './use-selection';

describe('@empoleon/hooks/use-selection', () => {
  it('correctly returns initial state for an empty data array', () => {
    const data: number[] = [];
    const { result } = renderHook(() => useSelection({ data }));

    expect(result[0]()).toStrictEqual([]);
    expect(result[1].isAllSelected()).toBe(false);
    expect(result[1].isSomeSelected()).toBe(false);
  });

  it('correctly returns initial state for a non-empty data array', () => {
    const data: number[] = [1, 2, 3];
    const { result } = renderHook(() => useSelection({ data }));

    expect(result[0]()).toStrictEqual([]);
    expect(result[1].isAllSelected()).toBe(false);
    expect(result[1].isSomeSelected()).toBe(false);
  });

  it('correctly initializes with defaultSelection', () => {
    const data = [1, 2, 3, 4, 5];
    const defaultSelection = [1, 3];
    const { result } = renderHook(() => useSelection({ data, defaultSelection }));

    expect(result[0]()).toEqual(expect.arrayContaining(defaultSelection));
    expect(result[0]()).toHaveLength(2);
    expect(result[1].isAllSelected()).toBe(false);
    expect(result[1].isSomeSelected()).toBe(true);
  });

  it('correctly selects an item', () => {
    const data = [1, 2, 3];
    const { result } = renderHook(() => useSelection({ data }));

    expect(result[0]()).toStrictEqual([]);

    result[1].select(1);
    expect(result[0]()).toStrictEqual([1]);
    expect(result[1].isAllSelected()).toBe(false);
    expect(result[1].isSomeSelected()).toBe(true);

    result[1].select(1);
    expect(result[0]()).toStrictEqual([1]);
  });

  it('correctly deselects an item', () => {
    const data = [1, 2, 3];
    const { result } = renderHook(() => useSelection({ data }));

    result[1].select(1);
    result[1].select(2);
    expect(result[0]()).toEqual(expect.arrayContaining([1, 2]));
    expect(result[0]()).toHaveLength(2);

    result[1].deselect(1);
    expect(result[0]()).toStrictEqual([2]);
    expect(result[1].isAllSelected()).toBe(false);
    expect(result[1].isSomeSelected()).toBe(true);

    result[1].deselect(1);
    expect(result[0]()).toStrictEqual([2]);
  });

  it('correctly toggles an item', () => {
    const data = [1, 2, 3];
    const { result } = renderHook(() => useSelection({ data }));

    expect(result[0]()).toStrictEqual([]);

    result[1].toggle(1);
    expect(result[0]()).toStrictEqual([1]);
    expect(result[1].isAllSelected()).toBe(false);
    expect(result[1].isSomeSelected()).toBe(true);

    result[1].toggle(1);
    expect(result[0]()).toStrictEqual([]);
    expect(result[1].isAllSelected()).toBe(false);
    expect(result[1].isSomeSelected()).toBe(false);
  });

  it('correctly resets the selection', () => {
    const data = [1, 2, 3];
    const { result } = renderHook(() => useSelection({ data }));

    result[1].select(1);
    result[1].select(2);
    expect(result[0]()).toEqual(expect.arrayContaining([1, 2]));
    expect(result[0]()).toHaveLength(2);
    expect(result[1].isSomeSelected()).toBe(true);

    result[1].resetSelection();
    expect(result[0]()).toStrictEqual([]);
    expect(result[1].isAllSelected()).toBe(false);
    expect(result[1].isSomeSelected()).toBe(false);
  });

  it('isAllSelected is true when all items are selected', () => {
    const data: string[] = ['a', 'b', 'c'];
    const { result } = renderHook(() => useSelection({ data }));

    expect(result[0]()).toStrictEqual([]);

    result[1].select('a');
    result[1].select('b');
    result[1].select('c');
    expect(result[0]()).toEqual(expect.arrayContaining(['a', 'b', 'c']));
    expect(result[0]()).toHaveLength(3);
    expect(result[1].isAllSelected()).toBe(true);
    expect(result[1].isSomeSelected()).toBe(true);
  });

  it('allows direct setting of selection via setSelection', () => {
    const data: number[] = [10, 20, 30];
    const { result } = renderHook(() => useSelection({ data }));

    expect(result[0]()).toStrictEqual([]);

    result[1].setSelection([10, 30]);
    expect(result[0]()).toEqual(expect.arrayContaining([10, 30]));
    expect(result[0]()).toHaveLength(2);
    expect(result[1].isAllSelected()).toBe(false);
    expect(result[1].isSomeSelected()).toBe(true);

    result[1].setSelection([]);
    expect(result[0]()).toStrictEqual([]);
    expect(result[1].isAllSelected()).toBe(false);
    expect(result[1].isSomeSelected()).toBe(false);

    result[1].setSelection([10, 20, 30]);
    expect(result[0]()).toEqual(expect.arrayContaining([10, 20, 30]));
    expect(result[0]()).toHaveLength(3);
    expect(result[1].isAllSelected()).toBe(true);
    expect(result[1].isSomeSelected()).toBe(true);
  });

  it('does not reset selection when data changes and resetSelectionOnDataChange is false', () => {
    const [data, setData] = createSignal([1, 2, 3]);
    const { result } = renderHook(() =>
      useSelection({ data: data(), resetSelectionOnDataChange: false })
    );

    result[1].select(1);
    result[1].select(2);
    expect(result[0]()).toEqual(expect.arrayContaining([1, 2]));
    expect(result[0]()).toHaveLength(2);

    setData([1, 2, 3, 4, 5]);

    expect(result[0]()).toEqual(expect.arrayContaining([1, 2]));
    expect(result[0]()).toHaveLength(2);
    expect(result[1].isSomeSelected()).toBe(true);
  });

  it('resets selection when data changes and resetSelectionOnDataChange is true', () => {
    const [data, setData] = createSignal([1, 2, 3]);

    const { result } = renderHook(() =>
      useSelection({
        get data() {
          return data();
        },
        resetSelectionOnDataChange: true,
      })
    );

    result[1].select(1);
    result[1].select(2);
    expect(result[0]()).toEqual(expect.arrayContaining([1, 2]));

    setData([1, 2, 3, 4, 5]);

    expect(result[0]()).toStrictEqual([]);
    expect(result[1].isSomeSelected()).toBe(false);
  });

  it('resets to empty selection when data changes and resetSelectionOnDataChange is true', () => {
    const [data, setData] = createSignal([1, 2, 3]);
    const { result } = renderHook(() =>
      useSelection({
        get data() {
          return data();
        },
        defaultSelection: [1],
        resetSelectionOnDataChange: true,
      })
    );

    expect(result[0]()).toStrictEqual([1]);
    setData([1, 2, 3, 4]);
    expect(result[0]()).toStrictEqual([]);
    expect(result[1].isSomeSelected()).toBe(false);
  });

  it('correctly calculates isAllSelected based on data and selection lengths', () => {
    const data = [1, 2, 3];
    const { result } = renderHook(() => useSelection({ data }));

    result[1].select(1);
    result[1].select(2);
    expect(result[1].isAllSelected()).toBe(false);

    result[1].select(3);
    expect(result[1].isAllSelected()).toBe(true);

    result[1].deselect(3);
    expect(result[1].isAllSelected()).toBe(false);
  });

  it('handles duplicates in defaultSelection correctly', () => {
    const data = [1, 2, 3];
    const defaultSelection = [1, 1, 2];
    const { result } = renderHook(() => useSelection({ data, defaultSelection }));

    expect(result[0]()).toEqual(expect.arrayContaining([1, 2]));
    expect(result[0]()).toHaveLength(2);
    expect(result[1].isSomeSelected()).toBe(true);
  });
});
