import { IconAt, IconLock } from '@tabler/icons-solidjs';
import {
  Anchor,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from '@empoleon/core';
import { useForm } from '@empoleon/form';
import { createSignal, JSX } from 'solid-js';

export interface AuthenticationFormProps {
  noShadow?: boolean;
  noPadding?: boolean;
  noSubmit?: boolean;
  style?: JSX.CSSProperties;
}

export function AuthenticationForm(props: AuthenticationFormProps) {
  const [formType, setFormType] = createSignal<'register' | 'login'>('register');
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);

  const toggleFormType = () => {
    setFormType((current) => (current === 'register' ? 'login' : 'register'));
    setError(null);
  };

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsOfService: true,
    },
  });

  const handleSubmit = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      setError(
        formType() === 'register'
          ? 'User with this email already exists'
          : 'User with this email does not exist'
      );
    }, 3000);
  };

  return (
    <Paper
      p={props.noPadding ? 0 : 'lg'}
      shadow={props.noShadow ? 'none' : 'sm'}
      style={{
        ...props.style,
        position: 'relative',
        backgroundColor: 'var(--empoleon-color-body)',
      }}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <LoadingOverlay visible={loading()} />
        {formType() === 'register' && (
          <Group grow>
            <TextInput
              data-autofocus
              required
              placeholder="Your first name"
              label="First name"
              radius="md"
              {...form.getInputProps('firstName')}
            />

            <TextInput
              required
              placeholder="Your last name"
              label="Last name"
              radius="md"
              {...form.getInputProps('lastName')}
            />
          </Group>
        )}

        <TextInput
          mt="md"
          required
          placeholder="Your email"
          label="Email"
          leftSection={<IconAt size={16} stroke='1.5' />}
          radius="md"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          mt="md"
          required
          placeholder="Password"
          label="Password"
          leftSection={<IconLock size={16} stroke='1.5' />}
          radius="md"
          {...form.getInputProps('password')}
        />

        {formType() === 'register' && (
          <PasswordInput
            mt="md"
            required
            label="Confirm Password"
            placeholder="Confirm password"
            leftSection={<IconLock size={16} stroke='1.5' />}
            radius="md"
            {...form.getInputProps('confirmPassword')}
          />
        )}

        {formType() === 'register' && (
          <Checkbox
            mt="xl"
            label="I agree to sell my soul and privacy to this corporation"
            {...form.getInputProps('termsOfService', { type: 'checkbox' })}
          />
        )}

        {error() && (
          <Text c="red" size="sm" mt="sm">
            {error()}
          </Text>
        )}

        {!props.noSubmit && (
          <Group justify="space-between" mt="xl">
            <Anchor component="button" type="button" c="dimmed" onClick={toggleFormType} size="sm">
              {formType() === 'register'
                ? 'Have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>

            <Button color="blue" type="submit" radius="md">
              {formType() === 'register' ? 'Register' : 'Login'}
            </Button>
          </Group>
        )}
      </form>
    </Paper>
  );
}
