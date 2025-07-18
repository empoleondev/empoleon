import { For } from 'solid-js';
import { PickerControl } from './PickerControl';

export default { title: 'PickerControl' };

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <PickerControl>March</PickerControl>
      <PickerControl disabled>March</PickerControl>
      <PickerControl selected>March</PickerControl>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: '40px' }}>
      <PickerControl unstyled>March</PickerControl>
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: '40px', display: 'flex' }}>
      <PickerControl firstInRange inRange selected>
        March
      </PickerControl>
      <PickerControl inRange>April</PickerControl>
      <PickerControl inRange>May</PickerControl>
      <PickerControl lastInRange inRange selected>
        June
      </PickerControl>
    </div>
  );
}

export function Sizes() {
 const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

 return (
   <div style={{ padding: '40px' }}>
     <For each={sizes}>
       {(size) => (
         <PickerControl selected size={size} mt="md">
           {size}
         </PickerControl>
       )}
     </For>
   </div>
 );
}
