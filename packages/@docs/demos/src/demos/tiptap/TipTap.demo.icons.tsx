import { IconBold, IconItalic } from '@tabler/icons-solidjs';
import StarterKit from '@tiptap/starter-kit';
import { useEditor } from '@empoleon/solid-tiptap';
import { RichTextEditor } from '@empoleon/tiptap';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useEditor } from '@empoleon/solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@empoleon/tiptap';
import { IconBold, IconItalic } from '@tabler/icons-solidjs';

const BoldIcon = () => <IconBold size={16} stroke={3.5} />;
const ItalicIcon = () => <IconItalic size={16} stroke={3.5} />;

function Demo() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Customize icons with icon prop</p>',
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold icon={BoldIcon} />
          <RichTextEditor.Italic icon={ItalicIcon} />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
`;

const BoldIcon = () => <IconBold size={16} stroke="3.5" />;
const ItalicIcon = () => <IconItalic size={16} stroke="3.5" />;

function Demo() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Customize icons with icon prop</p>',
  });

  return (
    <RichTextEditor editor={editor()}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold icon={BoldIcon} />
          <RichTextEditor.Italic icon={ItalicIcon} />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export const icons: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
