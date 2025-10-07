import { createEffect, createSignal } from 'solid-js';
import { Button, Modal, ModalProps } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { AuthenticationForm } from '../../../shared/AuthenticationForm/AuthenticationForm';

const code = `
import { useDisclosure } from '@empoleon/hooks';
import { Modal, Button } from '@empoleon/core';

function Demo() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal{{props}} opened={opened()} onClose={close} title="Modal Title">
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}
`;

function Demo(
  props: ModalProps & {
    contentType?: string;
    contentLength?: string;
  }
) {
  const [opened, { open, close }] = useDisclosure(false);

  const getContent = () => {
    const length = props.contentLength || 'short';
    const type = props.contentType || 'form';

    if (type === 'form') {
      return <AuthenticationForm noShadow noPadding />;
    }

    if (type === 'text') {
      if (length === 'short') {
        return (
          <div>
            <p>This is a short text content for the modal.</p>
          </div>
        );
      } else if (length === 'long') {
        return (
          <div>
            <p>This is a longer text content that demonstrates scrolling behavior in the modal.</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
          </div>
        );
      }
    }

    return <AuthenticationForm noShadow noPadding />;
  };

  return (
    <>
      <Modal {...props} opened={opened()} onClose={close}>
        {getContent()}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: [
    {
      prop: 'title',
      type: 'string',
      initialValue: 'Modal Title',
      libraryValue: '',
    },
    {
      prop: 'size',
      type: 'select',
      initialValue: 'md',
      libraryValue: 'md',
      data: [
        { label: 'Extra Small', value: 'xs' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
        { label: 'Auto', value: 'auto' },
      ],
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'centered',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'fullScreen',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withCloseButton',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'closeOnClickOutside',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'closeOnEscape',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'trapFocus',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'returnFocus',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'keepMounted',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withOverlay',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'padding',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'shadow',
      type: 'select',
      initialValue: 'xl',
      libraryValue: 'xl',
      data: [
        { label: 'Extra Small', value: 'xs' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
      ],
    },
    {
      prop: 'contentType',
      type: 'select',
      initialValue: 'form',
      libraryValue: 'form',
      data: [
        { label: 'Form', value: 'form' },
        { label: 'Text', value: 'text' },
      ],
    },
    {
      prop: 'contentLength',
      type: 'select',
      initialValue: 'short',
      libraryValue: 'short',
      data: [
        { label: 'Short', value: 'short' },
        { label: 'Long (Scrollable)', value: 'long' },
      ],
    },
  ],
};
