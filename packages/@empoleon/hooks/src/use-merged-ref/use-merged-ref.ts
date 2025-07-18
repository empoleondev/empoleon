// use-merged-ref.ts
import { mergeRefs as solidMergeRefs, type Ref } from "@solid-primitives/refs";

/** A ref callback or signal-style ref used by Solid primitives */
export type PossibleRef<T> = Ref<T> | undefined;

/**
 * Assigns a value to a ref that can be either a function ref or an object ref
 * This utility handles both React-style object refs and Solid-style function refs
 */
export function assignRef<T>(
  ref: ((el: T) => void) | { current?: T } | undefined,
  value: T
) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref && typeof ref === "object") {
    (ref as any).current = value;
  }
}

/**
 * Merges multiple refs into a single ref callback
 * This is useful when you need to attach multiple refs to a single element
 *
 * @param refs - Array of refs to merge
 * @returns A single ref callback that updates all provided refs
 */
export function mergeRefs<T>(...refs: PossibleRef<T>[]): Ref<T> {
  // Filter out undefined refs and merge them using solid-primitives/refs
  return solidMergeRefs<T>(...refs.filter((r): r is Ref<T> => !!r));
}

/**
 * Hook that merges multiple refs into one
 * Exactly the same API shape as Empoleon's React hook:
 *   useMergedRef(ref1, ref2, …)
 *
 * @param refs - Refs to merge
 * @returns A single ref callback that updates all provided refs
 */
export function useMergedRef<T>(...refs: PossibleRef<T>[]): Ref<T> {
  // Filter out undefined refs, then chain them
  return mergeRefs<T>(...refs.filter((r): r is Ref<T> => !!r));
}
