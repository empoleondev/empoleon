import { IconPictureInPicture } from '@tabler/icons-solidjs';
import { createSignal, JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { Accordion } from './Accordion';

export default {
  title: 'Accordion',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export const Variants = () => (
  <>
    <Accordion
      defaultValue="flex"
      style={{ 'max-width': '400px' }}
      mx="auto"
      mt="xl"
      variant="default"
      radius="md"
    >
      <>
        <Accordion.Item value="customize">
          <Accordion.Control>Customization</Accordion.Control>
          <Accordion.Panel>
            Colors, fonts, shadows and many other parts are customizable to fit your design needs
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="flex">
          <Accordion.Control>Flexibility</Accordion.Control>
          <Accordion.Panel>
            Configure components appearance and behavior with vast amount of settings or overwrite
            any part of component styles
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="focus">
          <Accordion.Control>No annoying focus ring</Accordion.Control>
          <Accordion.Panel>
            With new :focus-visible pseudo-class focus ring appears only when user navigates with
            keyboard
          </Accordion.Panel>
        </Accordion.Item>
      </>
    </Accordion>

    <Accordion
      defaultValue="flex"
      style={{ 'max-width': '400px' }}
      mx="auto"
      mt={50}
      variant="contained"
      radius="md"
    >
      <>
        <Accordion.Item value="customize">
          <Accordion.Control>Customization</Accordion.Control>
          <Accordion.Panel>
            Colors, fonts, shadows and many other parts are customizable to fit your design needs
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="flex">
          <Accordion.Control>Flexibility</Accordion.Control>
          <Accordion.Panel>
            Configure components appearance and behavior with vast amount of settings or overwrite
            any part of component styles
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="focus">
          <Accordion.Control>No annoying focus ring</Accordion.Control>
          <Accordion.Panel>
            With new :focus-visible pseudo-class focus ring appears only when user navigates with
            keyboard
          </Accordion.Panel>
        </Accordion.Item>
      </>
    </Accordion>

    <Accordion
      defaultValue="flex"
      style={{ 'max-width': '400px' }}
      mx="auto"
      mt={50}
      variant="filled"
      radius="md"
    >
      <>
        <Accordion.Item value="customize">
          <Accordion.Control>Customization</Accordion.Control>
          <Accordion.Panel>
            Colors, fonts, shadows and many other parts are customizable to fit your design needs
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="flex">
          <Accordion.Control>Flexibility</Accordion.Control>
          <Accordion.Panel>
            Configure components appearance and behavior with vast amount of settings or overwrite
            any part of component styles
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="focus">
          <Accordion.Control>No annoying focus ring</Accordion.Control>
          <Accordion.Panel>
            With new :focus-visible pseudo-class focus ring appears only when user navigates with
            keyboard
          </Accordion.Panel>
        </Accordion.Item>
      </>
    </Accordion>

    <Accordion
      defaultValue="flex"
      style={{ 'max-width': '400px' }}
      mx="auto"
      mt={50}
      variant="separated"
      radius="md"
    >
      <>
        <Accordion.Item value="customize">
          <Accordion.Control>Customization</Accordion.Control>
          <Accordion.Panel>
            Colors, fonts, shadows and many other parts are customizable to fit your design needs
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="flex">
          <Accordion.Control>Flexibility</Accordion.Control>
          <Accordion.Panel>
            Configure components appearance and behavior with vast amount of settings or overwrite
            any part of component styles
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="focus">
          <Accordion.Control>No annoying focus ring</Accordion.Control>
          <Accordion.Panel>
            With new :focus-visible pseudo-class focus ring appears only when user navigates with
            keyboard
          </Accordion.Panel>
        </Accordion.Item>
      </>
    </Accordion>
  </>
);

export const ChevronPositions = () => (
  <>
    <Accordion
      defaultValue="flex"
      style={{ 'max-width': '400px' }}
      mx="auto"
      mt="xl"
      variant="default"
      radius="md"
    >
      <>
        <Accordion.Item value="customize">
          <Accordion.Control>Customization</Accordion.Control>
          <Accordion.Panel>
            Colors, fonts, shadows and many other parts are customizable to fit your design needs
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="flex">
          <Accordion.Control>Flexibility</Accordion.Control>
          <Accordion.Panel>
            Configure components appearance and behavior with vast amount of settings or overwrite
            any part of component styles
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="focus">
          <Accordion.Control>No annoying focus ring</Accordion.Control>
          <Accordion.Panel>
            With new :focus-visible pseudo-class focus ring appears only when user navigates with
            keyboard
          </Accordion.Panel>
        </Accordion.Item>
      </>
    </Accordion>

    <Accordion
      defaultValue="flex"
      style={{ 'max-width': '400px' }}
      mx="auto"
      mt="xl"
      variant="default"
      radius="md"
      chevronPosition="left"
    >
      <>
        <Accordion.Item value="customize">
          <Accordion.Control>Customization</Accordion.Control>
          <Accordion.Panel>
            Colors, fonts, shadows and many other parts are customizable to fit your design needs
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="flex">
          <Accordion.Control>Flexibility</Accordion.Control>
          <Accordion.Panel>
            Configure components appearance and behavior with vast amount of settings or overwrite
            any part of component styles
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="focus">
          <Accordion.Control>No annoying focus ring</Accordion.Control>
          <Accordion.Panel>
            With new :focus-visible pseudo-class focus ring appears only when user navigates with
            keyboard
          </Accordion.Panel>
        </Accordion.Item>
      </>
    </Accordion>
  </>
);

export const Multiple = () => (
  <Accordion multiple defaultValue={['flex']} style={{ 'max-width': '400px' }} mx="auto">
    <>
      <Accordion.Item value="customize">
        <Accordion.Control>Customization</Accordion.Control>
        <Accordion.Panel>
          Colors, fonts, shadows and many other parts are customizable to fit your design needs
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="flex">
        <Accordion.Control>Flexibility</Accordion.Control>
        <Accordion.Panel>
          Configure components appearance and behavior with vast amount of settings or overwrite any
          part of component styles
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="focus">
        <Accordion.Control>No annoying focus ring</Accordion.Control>
        <Accordion.Panel>
          With new :focus-visible pseudo-class focus ring appears only when user navigates with
          keyboard
        </Accordion.Panel>
      </Accordion.Item>
    </>
  </Accordion>
);

export const ControlledSingle = () => {
  const [value, setValue] = createSignal<string | null>(null);
  return (
    <Accordion value={value()} onChange={setValue} style={{ 'max-width': '400px' }} mx="auto">
      <>
        <Accordion.Item value="customize">
          <Accordion.Control>Customization</Accordion.Control>
          <Accordion.Panel>
            Colors, fonts, shadows and many other parts are customizable to fit your design needs
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="flex">
          <Accordion.Control>Flexibility</Accordion.Control>
          <Accordion.Panel>
            Configure components appearance and behavior with vast amount of settings or overwrite
            any part of component styles
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="focus">
          <Accordion.Control>No annoying focus ring</Accordion.Control>
          <Accordion.Panel>
            With new :focus-visible pseudo-class focus ring appears only when user navigates with
            keyboard
          </Accordion.Panel>
        </Accordion.Item>
      </>
    </Accordion>
  );
};

export const ControlledMultiple = () => {
  const [value, setValue] = createSignal<string[]>([]);
  return (
    <Accordion
      multiple
      value={value()}
      onChange={setValue}
      style={{ 'max-width': '400px' }}
      mx="auto"
    >
      <>
        <Accordion.Item value="customize">
          <Accordion.Control>Customization</Accordion.Control>
          <Accordion.Panel>
            Colors, fonts, shadows and many other parts are customizable to fit your design needs
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="flex">
          <Accordion.Control>Flexibility</Accordion.Control>
          <Accordion.Panel>
            Configure components appearance and behavior with vast amount of settings or overwrite
            any part of component styles
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="focus">
          <Accordion.Control>No annoying focus ring</Accordion.Control>
          <Accordion.Panel>
            With new :focus-visible pseudo-class focus ring appears only when user navigates with
            keyboard
          </Accordion.Panel>
        </Accordion.Item>
      </>
    </Accordion>
  );
};

export const NoLoop = () => (
  <Accordion loop={false} style={{ 'max-width': '400px' }} mx="auto">
    <>
      <Accordion.Item value="customize">
        <Accordion.Control>Customization</Accordion.Control>
        <Accordion.Panel>
          Colors, fonts, shadows and many other parts are customizable to fit your design needs
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="flex">
        <Accordion.Control>Flexibility</Accordion.Control>
        <Accordion.Panel>
          Configure components appearance and behavior with vast amount of settings or overwrite any
          part of component styles
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="focus">
        <Accordion.Control>No annoying focus ring</Accordion.Control>
        <Accordion.Panel>
          With new :focus-visible pseudo-class focus ring appears only when user navigates with
          keyboard
        </Accordion.Panel>
      </Accordion.Item>
    </>
  </Accordion>
);

export const Disabled = () => (
  <Accordion loop={false} style={{ 'max-width': '400px' }} mx="auto">
    <Accordion.Item value="customize">
      <Accordion.Control>Customization</Accordion.Control>
      <Accordion.Panel>
        Colors, fonts, shadows and many other parts are customizable to fit your design needs
      </Accordion.Panel>
    </Accordion.Item>

    <Accordion.Item value="flex">
      <Accordion.Control disabled>Flexibility</Accordion.Control>
      <Accordion.Panel>
        Configure components appearance and behavior with vast amount of settings or overwrite any
        part of component styles
      </Accordion.Panel>
    </Accordion.Item>

    <Accordion.Item value="focus">
      <Accordion.Control>No annoying focus ring</Accordion.Control>
      <Accordion.Panel>
        With new :focus-visible pseudo-class focus ring appears only when user navigates with
        keyboard
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

export const Unstyled = () => (
  <Accordion unstyled style={{ 'max-width': '400px' }} mx="auto">
    <>
      <Accordion.Item value="customize">
        <Accordion.Control>Customization</Accordion.Control>
        <Accordion.Panel>
          Colors, fonts, shadows and many other parts are customizable to fit your design needs
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="flex">
        <Accordion.Control>Flexibility</Accordion.Control>
        <Accordion.Panel>
          Configure components appearance and behavior with vast amount of settings or overwrite any
          part of component styles
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item value="focus">
        <Accordion.Control>No annoying focus ring</Accordion.Control>
        <Accordion.Panel>
          With new :focus-visible pseudo-class focus ring appears only when user navigates with
          keyboard
        </Accordion.Panel>
      </Accordion.Item>
    </>
  </Accordion>
);

export const Nested = () => (
  <Accordion multiple style={{ 'max-width': '400px' }} mx="auto">
    <Accordion.Item value="item-1">
      <Accordion.Control>Nested 1</Accordion.Control>
      <Accordion.Panel>
        <Accordion>
          <>
            <Accordion.Item value="customize">
              <Accordion.Control>Customization</Accordion.Control>
              <Accordion.Panel>
                Colors, fonts, shadows and many other parts are customizable to fit your design
                needs
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="flex">
              <Accordion.Control>Flexibility</Accordion.Control>
              <Accordion.Panel>
                Configure components appearance and behavior with vast amount of settings or
                overwrite any part of component styles
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="focus">
              <Accordion.Control>No annoying focus ring</Accordion.Control>
              <Accordion.Panel>
                With new :focus-visible pseudo-class focus ring appears only when user navigates
                with keyboard
              </Accordion.Panel>
            </Accordion.Item>
          </>
        </Accordion>
      </Accordion.Panel>
    </Accordion.Item>

    <Accordion.Item value="item-2">
      <Accordion.Control>Nested 2</Accordion.Control>
      <Accordion.Panel>
        <Accordion>
          <>
            <Accordion.Item value="customize">
              <Accordion.Control>Customization</Accordion.Control>
              <Accordion.Panel>
                Colors, fonts, shadows and many other parts are customizable to fit your design
                needs
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="flex">
              <Accordion.Control>Flexibility</Accordion.Control>
              <Accordion.Panel>
                Configure components appearance and behavior with vast amount of settings or
                overwrite any part of component styles
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item value="focus">
              <Accordion.Control>No annoying focus ring</Accordion.Control>
              <Accordion.Panel>
                With new :focus-visible pseudo-class focus ring appears only when user navigates
                with keyboard
              </Accordion.Panel>
            </Accordion.Item>
          </>
        </Accordion>
      </Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

export const WithIcon = () => (
  <>
    <Accordion style={{ 'max-width': '400px' }} mx="auto">
      <Accordion.Item value="flex">
        <Accordion.Control icon={<IconPictureInPicture size={18} />}>Flexibility</Accordion.Control>
      </Accordion.Item>
    </Accordion>

    <Accordion style={{ 'max-width': '400px' }} mx="auto" chevronPosition="left">
      <Accordion.Item value="flex">
        <Accordion.Control icon={<IconPictureInPicture size={18} />}>Flexibility</Accordion.Control>
      </Accordion.Item>
    </Accordion>
  </>
);
