import { createEffect, createSignal } from 'solid-js';
import { shallowEqual } from '../utils/shallow-equal/shallow-equal';

type DependencyList = readonly any[];

function shallowCompare(
  prevValue: DependencyList | null | undefined,
  currValue: DependencyList | null | undefined
): boolean {
 if (!prevValue || !currValue) {
   return false;
 }

 if (prevValue === currValue) {
   return true;
 }

 if (prevValue.length !== currValue.length) {
   return false;
 }

 for (let i = 0; i < prevValue.length; i += 1) {
   if (!shallowEqual(prevValue[i], currValue[i])) {
     return false;
   }
 }

 return true;
}

function useShallowCompare(dependencies: DependencyList | undefined): [number] {
 let ref: DependencyList | undefined = [];
 const [updateRef, setUpdateRef] = createSignal(0);

 if (!shallowCompare(ref, dependencies)) {
   ref = dependencies;
   setUpdateRef(c => c + 1);
 }

 return [updateRef()];
}

export function useShallowEffect(
  cb: () => void | (() => void),
  dependencies: DependencyList | undefined
): void {
 createEffect(cb, useShallowCompare(dependencies));
}
