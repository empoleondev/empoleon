import { FloatingMenu, useEditor } from '@empoleon/solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import { Link, RichTextEditor } from '@empoleon/tiptap';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { useEditor, FloatingMenu } from '@empoleon/solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor, Link } from '@empoleon/tiptap';

function Demo() {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: '<p>Enter a new line to see floating menu</p>',
  });

  return (
    <RichTextEditor editor={editor}>
      {editor && (
        <FloatingMenu editor={editor}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.BulletList />
          </RichTextEditor.ControlsGroup>
        </FloatingMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
`;

function Demo() {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: '<p>Enter a new line to see floating menu</p>',
  });

  return (
    <RichTextEditor editor={editor()}>
      {editor && (
        <FloatingMenu editor={editor()}>
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.BulletList />
          </RichTextEditor.ControlsGroup>
        </FloatingMenu>
      )}
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export const floatingMenu: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
