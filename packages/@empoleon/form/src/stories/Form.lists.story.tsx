import { ActionIcon, Button, Group, EmpoleonProvider, Switch, Text, TextInput } from '@empoleon/core';
import { randomId } from '@empoleon/hooks';
import { For, Component, JSX } from 'solid-js';
import { useForm } from '../use-form';
import { FormBase } from './_base';

interface Employee {
  name: string;
  active: boolean;
  key: string;
}

interface FormValues {
  employees: Employee[];
}

export default {
   title: 'Form',
   decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ]
};

export const Lists: Component = () => {
  const form = useForm<FormValues>({
    initialValues: {
      employees: [
        { name: '', active: false, key: randomId() },
        { name: '', active: false, key: randomId() },
        { name: '', active: false, key: randomId() },
      ],
    },

    validate: {
      employees: {
        name: (value: string) => (value.length < 2 ? 'Too short' : null),
      },
    },
  });

  return (
    <FormBase form={form}>
      {form.values.employees.length > 0 ? (
        <Group mb="xs">
          <Text fw={500} size="sm" style={{ flex: 1 }}>
            Name
          </Text>
          <Text fw={500} size="sm" pr={90}>
            Status
          </Text>
        </Group>
      ) : (
        <Text c="dimmed" ta="center">
          No one here...
        </Text>
      )}

      <For each={form.values.employees}>
        {(_, index) => (
          <Group mt="xs">
            <TextInput
              placeholder="John Doe"
              style={{ flex: 1 }}
              {...form.getInputProps(`employees.${index()}.name`)}
            />
            <Switch
              label="Active"
              {...form.getInputProps(`employees.${index()}.active`, { type: 'checkbox' })}
            />
            <ActionIcon color="red" onClick={() => form.removeListItem('employees', index())}>
              $
            </ActionIcon>
          </Group>
        )}
      </For>

      <Group justify="center" mt="md">
        <Button
          type="button"
          onClick={() =>
            form.insertListItem('employees', { name: '', active: false, key: randomId() })
          }
        >
          Add employee
        </Button>
      </Group>
    </FormBase>
  );
};

export const ListsUncontrolled: Component = () => {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      employees: [
        { name: 'First', active: false, key: randomId() },
        { name: 'Second', active: false, key: randomId() },
        { name: 'Third', active: false, key: randomId() },
      ],
    },

    validate: {
      employees: {
        name: (value: string) => (value.length < 2 ? 'Too short' : null),
      },
    },
  });

  return (
    <FormBase form={form}>
      {form.values.employees.length > 0 ? (
        <Group mb="xs">
          <Text fw={500} size="sm" style={{ flex: 1 }}>
            Name
          </Text>
          <Text fw={500} size="sm" pr={90}>
            Status
          </Text>
        </Group>
      ) : (
        <Text c="dimmed" ta="center">
          No one here...
        </Text>
      )}

      <For each={form.values.employees}>
        {(_, index) => (
          <Group mt="xs">
            <TextInput
              placeholder="John Doe"
              style={{ flex: 1 }}
              {...form.getInputProps(`employees.${index()}.name`)}
            />
            <Switch
              label="Active"
              {...form.getInputProps(`employees.${index()}.active`, { type: 'checkbox' })}
            />
            <ActionIcon color="red" onClick={() => form.removeListItem('employees', index())}>
              $
            </ActionIcon>
          </Group>
        )}
      </For>

      <Group justify="center" mt="md">
        <Button
          type="button"
          onClick={() =>
            form.insertListItem('employees', { name: '', active: false, key: randomId() })
          }
        >
          Add employee
        </Button>
        <Button
          type="button"
          onClick={() => form.reorderListItem('employees', { from: 0, to: 2 })}
        >
          Reorder
        </Button>
      </Group>
    </FormBase>
  );
};
