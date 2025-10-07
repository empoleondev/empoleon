import { createSignal } from 'solid-js';
import { Button, Drawer, Group } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createSignal } from 'solid-js';
import { Button, Group, Drawer } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';

function Demo() {
  const [firstOpened, firstHandlers] = useDisclosure(false);
  const [secondOpened, secondHandlers] = useDisclosure(false);
  const [drawerData, setDrawerData] = createSignal({
    title: '',
    message: '',
  });

  return (
    <>
      <Drawer
        opened={firstOpened}
        onClose={() => {
          firstHandlers.close();
          setDrawerData({ title: '', message: '' });
        }}
        title={drawerData().title}
      >
        {drawerData().message}
      </Drawer>
      <Drawer
        opened={secondOpened}
        onClose={secondHandlers.close}
        onExitTransitionEnd={() => setDrawerData({ title: '', message: '' })}
        title={drawerData.title}
      >
        {drawerData().message}
      </Drawer>

      <Group>
        <Button
          onClick={() => {
            firstHandlers.open();
            setDrawerData({ title: 'Edit your profile', message: 'Imagine a form here' });
          }}
        >
          Clear data in onClose
        </Button>

        <Button
          onClick={() => {
            secondHandlers.open();
            setDrawerData({ title: 'Edit your profile', message: 'Imagine a form here' });
          }}
        >
          Clear data in onExitTransitionEnd
        </Button>
      </Group>
    </>
  );
}
`;

function Demo() {
  const [firstOpened, firstHandlers] = useDisclosure(false);
  const [secondOpened, secondHandlers] = useDisclosure(false);
  const [drawerData, setDrawerData] = createSignal({
    title: '',
    message: '',
  });

  return (
    <>
      <Drawer
        opened={firstOpened()}
        onClose={() => {
          firstHandlers.close();
          setDrawerData({ title: '', message: '' });
        }}
        transitionProps={{ duration: 300, exitDuration: 1000 }}
        title={drawerData().title}
      >
        {drawerData().message}
      </Drawer>
      <Drawer
        opened={secondOpened()}
        onClose={secondHandlers.close}
        transitionProps={{ duration: 300, exitDuration: 1000 }}
        onExitTransitionEnd={() => setDrawerData({ title: '', message: '' })}
        title={drawerData().title}
      >
        {drawerData().message}
      </Drawer>

      <Group>
        <Button
          onClick={() => {
            firstHandlers.open();
            setDrawerData({ title: 'Edit your profile', message: 'Imagine a form here' });
          }}
          variant="default"
        >
          Clear data in onClose
        </Button>

        <Button
          onClick={() => {
            secondHandlers.open();
            setDrawerData({ title: 'Edit your profile', message: 'Imagine a form here' });
          }}
          variant="default"
        >
          Clear data in onExitTransitionEnd
        </Button>
      </Group>
    </>
  );
}

export const transitionEnd: EmpoleonDemo = {
  type: 'code',
  code,
  centered: true,
  component: Demo,
  defaultExpanded: false,
};
