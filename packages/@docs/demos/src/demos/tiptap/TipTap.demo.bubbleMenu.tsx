import { BubbleMenu, useEditor } from '@empoleon/solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import { Link, RichTextEditor } from '@empoleon/tiptap';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useEditor, BubbleMenu } from '@empoleon/solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor, Link } from '@empoleon/tiptap';

function Demo() {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: '<p>Select some text to see bubble menu</p>',
  });

  return (
    <RichTextEditor editor={editor}>
      {editor && (
        <BubbleMenu editor={editor}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Link />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
`;

function Demo() {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: '<p>Select some text to see bubble menu</p>',
  });

  return (
    <RichTextEditor editor={editor()}>
      {editor && (
        <BubbleMenu editor={editor()}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Link />
          </RichTextEditor.ControlsGroup>
        </BubbleMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export const bubbleMenu: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
