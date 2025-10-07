import { IconSearch, IconTable } from '@tabler/icons-solidjs';
import { createSignal, JSX } from 'solid-js';
import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonProvider } from '../../core';
import { Button } from '../Button';
import { Group } from '../Group';
import { Input } from '../Input';
import { Text } from '../Text';
import { Tooltip } from '../Tooltip';
import { Menu } from './Menu';

export default {
  title: 'Menu',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function DisabledFirstItem() {
  return (
    <Menu>
      <Menu.Target>{(props) => <Button {...props}>Toggle menu</Button>}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Item disabled>Disabled</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
export function FormTab() {
  return (
    <div>
      <form>
        <input />
        <input />
      </form>

      <Menu keepMounted>
        <Menu.Target>{(props) => <Button {...props}>Hey</Button>}</Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Item 2</Menu.Item>
          <Menu.Item>Item 3</Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <form>
        <input />
        <input />
      </form>
    </div>
  );
}

export function Unstyled() {
  return (
    <Menu unstyled>
      <Menu.Target>{(props) => <Button {...props}>Toggle menu</Button>}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Item disabled>Disabled</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export function KeepMounted() {
  return (
    <Menu keepMounted>
      <Menu.Target>{(props) => <Button {...props}>Toggle menu</Button>}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Item disabled>Disabled</Menu.Item>
        <Menu.Item>Item 2</Menu.Item>
        <Menu.Item>Item 3</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export function Usage() {
  return (
    <div style={{ padding: '40px', display: 'flex', 'justify-content': 'center' }}>
      <Menu width="200px" shadow="md">
        <Menu.Target>{(props) => <Button {...props}>Toggle menu</Button>}</Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Label 1</Menu.Label>
          <Menu.Item>Item 1</Menu.Item>
          <Menu.Item closeMenuOnClick={false}>Won&apos;t close on click</Menu.Item>
          <Menu.Item disabled>Disabled</Menu.Item>

          <Menu.Item
            leftSection={<IconSearch size={14} />}
            rightSection={
              <Text size="xs" c="dimmed">
                ⌘K
              </Text>
            }
          >
            Search
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Label 2</Menu.Label>
          <Menu.Item color="red" leftSection={<IconTable size={14} />}>
            Red color
          </Menu.Item>
          <Menu.Item leftSection={<IconTable size={14} />}>Button item 3</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export function MenuTargetWithTooltip() {
  return (
    <div style={{ padding: '40px' }}>
      <Group>
        <Menu>
          <Tooltip label="Tooltip first">
            {(props) => (
              <Menu.Target {...props}>
                {(props) => <Button {...props}>Tooltip first</Button>}
              </Menu.Target>
            )}
          </Tooltip>

          <Menu.Dropdown>
            <Menu.Item>Item 1</Menu.Item>
            <Menu.Item>Item 2</Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <Menu>
          <Menu.Target>
            <Tooltip label="Tooltip last">
              {(props) => (
                <Button ml="xl" {...props}>
                  Tooltip last
                </Button>
              )}
            </Tooltip>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>Item 1</Menu.Item>
            <Menu.Item>Item 2</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </div>
  );
}

export function Controlled() {
  const [opened, setOpened] = createSignal(false);
  return (
    <div style={{ padding: '100px' }}>
      <Menu opened={opened()} onChange={setOpened}>
        <Menu.Target>{(props) => <Button {...props}>Toggle controlled menu</Button>}</Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Item 1</Menu.Item>
          <Menu.Item>Item 2</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export function WithUseDisclosure() {
  const [opened, handle] = useDisclosure(false);

  return (
    <div style={{ padding: '40px' }}>
      <Menu opened={opened()} onChange={() => handle.toggle()}>
        <Menu.Target>
          {(props) => <Button {...props}>UseDisclosureToggle controlled menu</Button>}
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Item 1</Menu.Item>
          <Menu.Item>Item 2</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}

export function WithKeepMounted() {
  return (
    <div class="App">
      <Menu keepMounted>
        {/* Menu without keepMounted will let you 'TAB' through form-fields */}
        {/* <Menu> */}
        <Menu.Target>{(props) => <Button {...props}>Hey</Button>}</Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Baby</Menu.Item>
          <Menu.Item>Girl</Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <form>
        <Input />
        <Input />
      </form>
    </div>
  );
}

export function WithSubMenu() {
  return (
    <div style={{ padding: '400px' }}>
      <Menu width="200px" position="bottom-start">
        <Menu.Target>{(props) => <Button {...props}>Toggle menu</Button>}</Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Item 1</Menu.Item>
          <Menu.Item>Item 2</Menu.Item>
          <Menu.Sub closeDelay={100}>
            <Menu.Sub.Target>
              <Menu.Sub.Item>Sub Menu item</Menu.Sub.Item>
            </Menu.Sub.Target>

            <Menu.Sub.Dropdown>
              <Menu.Item closeMenuOnClick={false}>Sub 1</Menu.Item>
              <Menu.Item closeMenuOnClick={false}>Sub 2</Menu.Item>
              <Menu.Sub closeDelay={100}>
                <Menu.Sub.Target>
                  <Menu.Sub.Item>Sub Menu item</Menu.Sub.Item>
                </Menu.Sub.Target>

                <Menu.Sub.Dropdown>
                  <Menu.Item closeMenuOnClick={false}>Sub 1</Menu.Item>
                  <Menu.Item closeMenuOnClick={false}>Sub 2</Menu.Item>
                </Menu.Sub.Dropdown>
              </Menu.Sub>
            </Menu.Sub.Dropdown>
          </Menu.Sub>
          <Menu.Item>Item 3</Menu.Item>
          <Menu.Item>Item 4</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
