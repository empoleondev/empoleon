import { Tabs } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Tabs } from '@empoleon/core';

function Demo() {
  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        <Tabs.Tab value="chat">Chat</Tabs.Tab>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Tab value="account" ml="auto">
          Account
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}
`;

function Demo() {
  return (
    <Tabs defaultValue="chat">
      <Tabs.List>
        <Tabs.Tab value="chat">Chat</Tabs.Tab>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
        <Tabs.Tab value="account" ml="auto">
          Account
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}

export const pull: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
