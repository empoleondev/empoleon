import { useEditor } from '@empoleon/solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@empoleon/tiptap';
import { MantineDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useEditor } from '@empoleon/solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@empoleon/tiptap';
import { useState } from 'react';

function Demo() {
  const [isSourceCodeModeActive, onSourceCodeTextSwitch] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Source code control example</p><p>New line with <strong>bold text</strong></p><p>New line with <em>italic</em> <em>text</em></p>',
  });

  return (
    <RichTextEditor editor={editor} onSourceCodeTextSwitch={onSourceCodeTextSwitch}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.SourceCode icon={BoldIcon} />
        </RichTextEditor.ControlsGroup>
        {!isSourceCodeModeActive && (
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
          </RichTextEditor.ControlsGroup>
        )}
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
`;

function Demo() {
  const [isSourceCodeModeActive, onSourceCodeTextSwitch] = createSignal(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content:
      '<p>Source code control example</p><p>New line with <strong>bold text</strong></p><p>New line with <em>italic</em> <em>text</em></p>',
  });

  return (
    <RichTextEditor editor={editor()} onSourceCodeTextSwitch={onSourceCodeTextSwitch}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          {/* @ts-ignore */}
          <RichTextEditor.SourceCode />
        </RichTextEditor.ControlsGroup>
        {!isSourceCodeModeActive() && (
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
          </RichTextEditor.ControlsGroup>
        )}
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export const sourceCodeSwitcher: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
