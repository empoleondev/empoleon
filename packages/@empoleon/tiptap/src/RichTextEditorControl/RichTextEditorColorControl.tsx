import { Component, splitProps } from 'solid-js';
import { BoxProps, ColorSwatch, ElementProps, useProps } from '@empoleon/core';
import { useRichTextEditorContext } from '../RichTextEditor.context';
import { RichTextEditorControl } from './RichTextEditorControl';

export interface RichTextEditorColorControlProps extends BoxProps, ElementProps<'button'> {
  /** Color that will be set as text color, for example #ef457e */
  color: string;
  ref?: (el: HTMLButtonElement) => void;
}

export const RichTextEditorColorControl: Component<RichTextEditorColorControlProps> = (_props) => {
  const props = useProps('RichTextEditorColorControl', null, _props);
  const [local, others] = splitProps(props, [
    'color', 'ref'
  ]);

  const textEditorProps = useRichTextEditorContext();

  const currentColor = () => {
    const editor = textEditorProps.editor;
    if (!editor) return null;
    return editor.getAttributes('textStyle').color || null;
  };
  const label = () => textEditorProps.labels.colorControlLabel(local.color);

  return (
    <RichTextEditorControl
      {...others}
      variant={textEditorProps.variant}
      active={currentColor() === local.color}
      aria-label={label()}
      title={label()}
      onClick={() => {
        const editor = textEditorProps.editor;
        if (!editor) return;
        (editor.chain() as any).focus().setColor(local.color).run();
      }}
      ref={local.ref}
    >
      <ColorSwatch color={local.color} size="14px" />
    </RichTextEditorControl>
  );
};
