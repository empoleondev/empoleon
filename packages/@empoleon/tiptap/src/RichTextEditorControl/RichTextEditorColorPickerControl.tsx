import {
  ActionIcon,
  BoxProps,
  ColorPicker,
  ColorPickerProps,
  ColorSwatch,
  ElementProps,
  Group,
  Popover,
  PopoverProps,
  rem,
  SimpleGrid,
  Tooltip,
  useProps,
} from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { IconCheck, IconCircleOff, IconColorPicker, IconPalette, IconX } from '../icons/Icons';
import { useRichTextEditorContext } from '../RichTextEditor.context';
import { RichTextEditorControl } from './RichTextEditorControl';
import { createSignal, For, splitProps } from 'solid-js';

export interface RichTextEditorColorPickerControlProps extends BoxProps, ElementProps<'button'> {
  /** Props added to Popover component */
  popoverProps?: Partial<PopoverProps>;

  /** Props added to ColorPicker component */
  colorPickerProps?: Partial<ColorPickerProps>;

  /** List of colors that the user can choose from */
  colors: string[];
}

const defaultProps: Partial<RichTextEditorColorPickerControlProps> = {};

export function RichTextEditorColorPickerControl(_props: RichTextEditorColorPickerControlProps) {
  const props = useProps('RichTextEditorColorPickerControl', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'popoverProps',
    'colors',
    'colorPickerProps',
    'ref'
  ]);

  const { editor, labels, getStyles, variant } = useRichTextEditorContext();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [state, setState] = createSignal<'palette' | 'colorPicker'>('palette');
  const currentColor = editor?.getAttributes('textStyle').color || 'var(--empoleon-color-text)';

  const handleChange = (value: string, shouldClose = true) => {
    (editor?.chain() as any).focus().setColor(value).run();
    shouldClose && close();
  };

  const handleClear = () => {
    (editor?.chain() as any).focus().unsetColor().run();
    close();
  };

  return (
    <Popover
      opened={opened()}
      withinPortal
      trapFocus
      onChange={(_opened) => !_opened && close()}
      {...local.popoverProps}
    >
      <Popover.Target>
        <RichTextEditorControl
          {...others}
          variant={variant}
          aria-label={labels.colorPickerControlLabel}
          title={labels.colorPickerControlLabel}
          ref={local.ref}
          onClick={toggle}
        >
          <ColorSwatch color={currentColor} size="14" />
        </RichTextEditorControl>
      </Popover.Target>

      <Popover.Dropdown {...getStyles('linkEditorDropdown')}>
        {state() === 'palette' && (
          <SimpleGrid cols={7} spacing={2}>
            <For each={local.colors}>
              {(color) => (
                <ColorSwatch
                  component="button"
                  color={color}
                  onClick={() => handleChange(color)}
                  size="26"
                  radius="xs"
                  style={{ cursor: 'pointer' }}
                  title={labels.colorPickerColorLabel(color)}
                  aria-label={labels.colorPickerColorLabel(color)}
                />
              )}
            </For>
          </SimpleGrid>
        )}

        {state() === 'colorPicker' && (
          <ColorPicker
            defaultValue={currentColor}
            onChange={(value) => handleChange(value, false)}
            {...local.colorPickerProps}
          />
        )}

        <Tooltip.Group closeDelay={200}>
          <Group justify="flex-end" gap="xs" mt="sm">
            {state() === 'palette' && (
              <ActionIcon
                variant="default"
                onClick={close}
                title={labels.colorPickerCancel}
                aria-label={labels.colorPickerCancel}
              >
                <IconX style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            )}

            <ActionIcon
              variant="default"
              onClick={handleClear}
              title={labels.colorPickerClear}
              aria-label={labels.colorPickerClear}
            >
              <IconCircleOff style={{ width: rem(16), height: rem(16) }} />
            </ActionIcon>

            {state() === 'palette' ? (
              <ActionIcon
                variant="default"
                onClick={() => setState('colorPicker')}
                title={labels.colorPickerColorPicker}
                aria-label={labels.colorPickerColorPicker}
              >
                <IconColorPicker style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            ) : (
              <ActionIcon
                variant="default"
                onClick={() => setState('palette')}
                aria-label={labels.colorPickerPalette}
                title={labels.colorPickerPalette}
              >
                <IconPalette style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            )}

            {state() === 'colorPicker' && (
              <ActionIcon
                variant="default"
                onClick={close}
                title={labels.colorPickerSave}
                aria-label={labels.colorPickerSave}
              >
                <IconCheck style={{ width: rem(16), height: rem(16) }} />
              </ActionIcon>
            )}
          </Group>
        </Tooltip.Group>
      </Popover.Dropdown>
    </Popover>
  );
};

RichTextEditorColorPickerControl.displayName = '@empoleon/tiptap/ColorPickerControl';
