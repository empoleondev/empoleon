import { IconChevronRight } from '@tabler/icons-solidjs';
import { Avatar, Group, Menu, Text, UnstyledButton } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { DemoMenuItems } from './_menu-items';
import { JSX } from 'solid-js';

const code = `
import { forwardRef } from 'react';
import { IconChevronRight } from '@tabler/icons-solidjs';
import { Group, Avatar, Text, Menu, UnstyledButton } from '@empoleon/core';

interface UserButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--empoleon-spacing-md)',
        color: 'var(--empoleon-color-text)',
        borderRadius: 'var(--empoleon-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size={16} />}
      </Group>
    </UnstyledButton>
  )
);

function Demo() {
  return (
    <Menu withArrow>
      <Menu.Target>
        <UserButton
          image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          name="Harriette Spoonlicker"
          email="hspoonlicker@outlook.com"
        />
      </Menu.Target>
      {/* ... menu items */}
    </Menu>
  );
}
`;

interface UserButtonProps extends JSX.ButtonHTMLAttributes<HTMLButtonElement> {
  image: string;
  name: string;
  email: string;
  icon?: JSX.Element;
}

const UserButton = ({ image, name, email, icon, ...others }: UserButtonProps, ref: any) => (
  <UnstyledButton
    ref={ref}
    style={{
      padding: 'var(--empoleon-spacing-md)',
      color: 'var(--empoleon-color-text)',
      'border-radius': 'var(--empoleon-radius-sm)',
    } as any}
    {...others}
  >
    <Group>
      <Avatar src={image} radius="xl" />

      <div style={{ flex: 1 }}>
        <Text size="sm" fw={500}>
          {name}
        </Text>

        <Text c="dimmed" size="xs">
          {email}
        </Text>
      </div>

      {icon || <IconChevronRight size={16} />}
    </Group>
  </UnstyledButton>
);

function Demo() {
  return (
    <Menu withArrow>
      <Menu.Target>
        <UserButton
          image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
          name="Harriette Spoonlicker"
          email="hspoonlicker@outlook.com"
        />
      </Menu.Target>
      <DemoMenuItems withTarget={false} />
    </Menu>
  );
}

export const customControl: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
