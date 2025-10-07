import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { useEditor } from '@empoleon/solid-tiptap';
import { RichTextEditor } from '@empoleon/tiptap';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { RichTextEditor } from '@empoleon/tiptap';
import { useEditor } from '@empoleon/solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

function Demo() {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: 'This is placeholder' })],
    content: '',
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
`;

function Demo() {
  const editor = useEditor({
    extensions: [StarterKit, Placeholder.configure({ placeholder: 'This is placeholder' })],
    content: '',
  });

  return (
    <RichTextEditor editor={editor()}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export const placeholder: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
