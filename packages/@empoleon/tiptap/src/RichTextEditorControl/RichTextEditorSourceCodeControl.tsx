import { createSignal, splitProps } from 'solid-js';
import { BoxProps, ElementProps, rem, useProps } from '@empoleon/core';
import { IconBraces } from '../icons/Icons';
import { useRichTextEditorContext } from '../RichTextEditor.context';
import { RichTextEditorControl } from './RichTextEditorControl';

export interface RichTextEditorSourceCodeControlProps extends BoxProps, ElementProps<'button'> {
  ref?: any;
}

export function RichTextEditorSourceCodeControl(_props: RichTextEditorSourceCodeControlProps) {
  const props = useProps('RichTextEditorSourceCodeControl', null, _props);
  const [local, others] = splitProps(props, ['ref']);
  const richTextEditorContext = useRichTextEditorContext();
  const [isSourceCodeModeActive, setIsSourceCodeModeActive] = createSignal(false);

  const handleStateChange = () => {
    if (isSourceCodeModeActive()) {
      richTextEditorContext.editor?.commands.setContent(richTextEditorContext.editor.getText(), true);
    } else {
      richTextEditorContext.editor?.commands.setContent(`<textarea>${richTextEditorContext.editor.getHTML()}</textarea>`);
    }

    const isSourceCodeModeActiveNew = !isSourceCodeModeActive();

    setIsSourceCodeModeActive(isSourceCodeModeActiveNew);
    richTextEditorContext.onSourceCodeTextSwitch?.(isSourceCodeModeActiveNew);
  };

  return (
    <RichTextEditorControl
      {...others}
      variant={richTextEditorContext.variant}
      active={isSourceCodeModeActive()}
      aria-label={richTextEditorContext.labels.sourceCodeControlLabel}
      title={richTextEditorContext.labels.sourceCodeControlLabel}
      onClick={() => handleStateChange()}
      ref={local.ref}
    >
      <IconBraces style={{ width: rem(16), height: rem(16) }} />
    </RichTextEditorControl>
  );
};

RichTextEditorSourceCodeControl.displayName = '@mantine/tiptap/RichTextEditorSourceCodeControl';
