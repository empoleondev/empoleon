import { JSX } from 'solid-js';
import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonProvider } from '../../core';
import { Button } from '../Button';
import { ModalBase } from './ModalBase';
import { ModalBaseBody } from './ModalBaseBody';
import { ModalBaseCloseButton } from './ModalBaseCloseButton';
import { ModalBaseContent } from './ModalBaseContent';
import { ModalBaseHeader } from './ModalBaseHeader';
import { ModalBaseOverlay } from './ModalBaseOverlay';
import { ModalBaseTitle } from './ModalBaseTitle';

export default {
  title: 'ModalBase',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

const lorem =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum tenetur, atque animi ducimus tempora iste distinctio harum nostrum eos tempore voluptatem, voluptas dolorem eveniet fugiat pariatur! Repellendus minus nulla non?';
const content = Array(20)
  .fill(0)
  .map((_) => <p>{lorem}</p>);

export function Usage2() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div style={{ padding: '40px' }}>
      <ModalBase
        opened={opened}
        onClose={close}
        transitionProps={{ keepMounted: true }}
        closeOnEscape
        closeOnClickOutside
        zIndex={100}
        padding="md"
      >
        <ModalBaseContent innerProps={{}}>
          <ModalBaseHeader>
            <ModalBaseTitle>Modal title</ModalBaseTitle>
            <ModalBaseCloseButton />
          </ModalBaseHeader>
          <ModalBaseBody>Modal content</ModalBaseBody>
        </ModalBaseContent>
        <ModalBaseOverlay />
      </ModalBase>

      <Button onClick={open}>Open modal</Button>
      {content}
      <Button onClick={open}>Open modal</Button>
    </div>
  );
}
