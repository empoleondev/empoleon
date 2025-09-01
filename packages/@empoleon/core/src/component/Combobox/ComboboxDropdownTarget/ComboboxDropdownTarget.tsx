import { JSX, splitProps } from 'solid-js';
import { factory, Factory, isElement, useProps } from '../../../core';
import { Popover } from '../../Popover';
import { useComboboxContext } from '../Combobox.context';
import { useMergedRef } from '@empoleon/hooks';

export interface ComboboxDropdownTargetProps {
  /** Target element */
  children: JSX.Element;

  /** Key of the prop that should be used to access element ref */
  refProp?: string;
}

const defaultProps: Partial<ComboboxDropdownTargetProps> = {
  refProp: 'ref',
};

export type ComboboxDropdownTargetFactory = Factory<{
  props: ComboboxDropdownTargetProps;
  ref: HTMLElement;
  compound: true;
}>;

export const ComboboxDropdownTarget = factory<ComboboxDropdownTargetFactory>(_props => {
  const props = useProps('ComboboxDropdownTarget', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'children',
    'refProp',
    'ref'
  ])
  useComboboxContext();

  // if (!isElement(local.children)) {
  //   throw new Error(
  //     'Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
  //   );
  // }

  return (
    <Popover.Target>
      {(popoverProps) => (
        <div ref={useMergedRef(local.ref, popoverProps.ref) as (el: HTMLDivElement) => void}>
          {local.children}
        </div>
      )}
    </Popover.Target>
  );
});

ComboboxDropdownTarget.displayName = '@empoleon/core/ComboboxDropdownTarget';
