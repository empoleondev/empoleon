import { For } from 'solid-js';
import { Checkbox } from '@empoleon/core';
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
