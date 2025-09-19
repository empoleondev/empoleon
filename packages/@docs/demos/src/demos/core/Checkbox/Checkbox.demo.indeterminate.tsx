// original
// import { Box, Checkbox } from '@empoleon/core';
// import { randomId, useListState } from '@empoleon/hooks';
// import { EmpoleonDemo } from '@empoleonx/demo';

// const code = `
// import { useListState, randomId } from '@empoleon/hooks';
// import { Checkbox } from '@empoleon/core';

// const initialValues = [
//   { label: 'Receive email notifications', checked: false, key: randomId() },
//   { label: 'Receive sms notifications', checked: false, key: randomId() },
//   { label: 'Receive push notifications', checked: false, key: randomId() },
// ];

// export function IndeterminateCheckbox() {
//   const [values, handlers] = useListState(initialValues);

//   const allChecked = values.every((value) => value.checked);
//   const indeterminate = values.some((value) => value.checked) && !allChecked;

//   const items = values.map((value, index) => (
//     <Checkbox
//       mt="xs"
//       ml={33}
//       label={value.label}

//       checked={value.checked}
//       onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
//     />
//   ));

//   return (
//     <>
//       <Checkbox
//         checked={allChecked}
//         indeterminate={indeterminate}
//         label="Receive all notifications"
//         onChange={() =>
//           handlers.setState((current) =>
//             current.map((value) => ({ ...value, checked: !allChecked }))
//           )
//         }
//       />
//       {items}
//     </>
//   );
// }
// `;

// const initialValues = [
//   { label: 'Receive email notifications', checked: false, key: randomId() },
//   { label: 'Receive sms notifications', checked: false, key: randomId() },
//   { label: 'Receive push notifications', checked: false, key: randomId() },
// ];

// export function Demo() {
//   const [values, handlers] = useListState(initialValues);
//   const allChecked = values().every((value) => value.checked);
//   const indeterminate = values().some((value) => value.checked) && !allChecked;

//   const items = values().map((value, index) => (
//     <Checkbox
//       mt="xs"
//       ml={33}
//       label={value.label}

//       checked={value.checked}
//       onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
//     />
//   ));

//   return (
//     <Box maw={400} mx="auto">
//       <Checkbox
//         checked={allChecked}
//         indeterminate={indeterminate}
//         label="Receive all notifications"
//         onChange={() =>
//           handlers.setState((current) =>
//             current.map((value) => ({ ...value, checked: !allChecked }))
//           )
//         }
//       />
//       {items}
//     </Box>
//   );
// }

// export const indeterminate: EmpoleonDemo = {
//   type: 'code',
//   code,
//   component: Demo,
// };

// works
// import { Index, createMemo } from 'solid-js';
// import { Box, Checkbox } from '@empoleon/core';
// import { randomId, useListState } from '@empoleon/hooks';
// import { EmpoleonDemo } from '@empoleonx/demo';

// const code = `
// import { useListState, randomId } from '@empoleon/hooks';
// import { Checkbox } from '@empoleon/core';

// const initialValues = [
//   { label: 'Receive email notifications', checked: false, key: randomId() },
//   { label: 'Receive sms notifications', checked: false, key: randomId() },
//   { label: 'Receive push notifications', checked: false, key: randomId() },
// ];

// export function IndeterminateCheckbox() {
//   const [values, handlers] = useListState(initialValues);

//   const allChecked = values.every((value) => value.checked);
//   const indeterminate = values.some((value) => value.checked) && !allChecked;

//   const items = values.map((value, index) => (
//     <Checkbox
//       mt="xs"
//       ml={33}
//       label={value.label}

//       checked={value.checked}
//       onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
//     />
//   ));

//   return (
//     <>
//       <Checkbox
//         checked={allChecked}
//         indeterminate={indeterminate}
//         label="Receive all notifications"
//         onChange={() =>
//           handlers.setState((current) =>
//             current.map((value) => ({ ...value, checked: !allChecked }))
//           )
//         }
//       />
//       {items}
//     </>
//   );
// }
// `;

// const initialValues = [
//   { label: 'Receive email notifications', checked: false, key: randomId() },
//   { label: 'Receive sms notifications', checked: false, key: randomId() },
//   { label: 'Receive push notifications', checked: false, key: randomId() },
// ];

// export function Demo() {
//   const [values, handlers] = useListState(initialValues);

//   const checkboxStates = createMemo(() => {
//     const currentValues = values();
//     const allChecked = currentValues.every((value) => value.checked);
//     const someChecked = currentValues.some((value) => value.checked);
//     const indeterminate = someChecked && !allChecked;
//     return { allChecked, someChecked, indeterminate };
//   });

//   const handleAllNotificationsChange = () => {
//     const { allChecked: currentAllChecked } = checkboxStates();
//     handlers.setState((current) =>
//       current.map((value) => ({
//         ...value,
//         checked: !currentAllChecked
//       }))
//     );
//   };

//   const handleItemChange = (index: number, event: Event) => {
//     const target = event.currentTarget as HTMLInputElement;
//     const newChecked = target.checked;
//     handlers.setItemProp(index, 'checked', newChecked);
//   };

//   return (
//     <Box maw={400} mx="auto">
//       <Checkbox
//         checked={checkboxStates().indeterminate ? false : checkboxStates().allChecked}
//         indeterminate={checkboxStates().indeterminate}
//         label="Receive all notifications"
//         onChange={handleAllNotificationsChange}
//       />
//       <Index each={values()}>
//         {(value, index) => (
//           <Checkbox
//             mt="xs"
//             ml={33}
//             label={value().label}
//             checked={value().checked}
//             onChange={(event) => handleItemChange(index, event)}
//           />
//         )}
//       </Index>
//     </Box>
//   );
// }

// export const indeterminate: EmpoleonDemo = {
//   type: 'code',
//   code,
//   component: Demo,
// };

import { For, Index, createMemo } from 'solid-js';
import { Box, Checkbox } from '@empoleon/core';
import { randomId, useListState } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useListState, randomId } from '@empoleon/hooks';
import { Checkbox } from '@empoleon/core';

const initialValues = [
  { label: 'Receive email notifications', checked: false, key: randomId() },
  { label: 'Receive sms notifications', checked: false, key: randomId() },
  { label: 'Receive push notifications', checked: false, key: randomId() },
];

export function IndeterminateCheckbox() {
  const [values, handlers] = useListState(initialValues);

  const allChecked = values.every((value) => value.checked);
  const indeterminate = values.some((value) => value.checked) && !allChecked;

  const items = values.map((value, index) => (
    <Checkbox
      mt="xs"
      ml={33}
      label={value.label}

      checked={value.checked}
      onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
    />
  ));

  return (
    <>
      <Checkbox
        checked={allChecked}
        indeterminate={indeterminate}
        label="Receive all notifications"
        onChange={() =>
          handlers.setState((current) =>
            current.map((value) => ({ ...value, checked: !allChecked }))
          )
        }
      />
      {items}
    </>
  );
}
`;

const initialValues = [
  { label: 'Receive email notifications', checked: false, key: randomId() },
  { label: 'Receive sms notifications', checked: false, key: randomId() },
  { label: 'Receive push notifications', checked: false, key: randomId() },
];

export function Demo() {
  const [values, handlers] = useListState(initialValues);

  return (
    <>
      <Checkbox
        checked={values().every((value) => value.checked)}
        indeterminate={values().some((value) => value.checked) && !values().every((value) => value.checked)}
        label="Receive all notifications"
        onChange={() => {
          const allChecked = values().every((value) => value.checked);
          handlers.setState((current) =>
            current.map((value) => ({ ...value, checked: !allChecked }))
          );
        }}
      />
      <For each={values()}>
        {(value, index) => (
          <Checkbox
            mt="xs"
            ml={33}
            label={value.label}
            checked={value.checked}
            onChange={(event) => handlers.setItemProp(index(), 'checked', event.currentTarget.checked)}
          />
        )}
      </For>
    </>
  );
}

export const indeterminate: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
