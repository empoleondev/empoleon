import { useEditor } from '@empoleon/solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import { Link, RichTextEditor } from '@empoleon/tiptap';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './TipTap.demo.typographyStyles.module.css';

const cssCode = `.root {
  h2 {
    color: light-dark(var(--mantine-color-gray-6), var(--mantine-color-dark-2));
    font-size: var(--mantine-font-size-xl);
  }

  p {
    font-size: var(--mantine-font-size-lg);
  }

  a {
    color: var(--mantine-color-red-6);
  }
}`;

const code = `
import { useEditor } from '@empoleon/solid-tiptap';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor, Link } from '@empoleon/tiptap';
import classes from './Demo.module.css';

function Demo() {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: \`
    <h2>Heading 2</h2>
    <p>Paragraph with <a href="https://mantine.dev">link</a></p>
    \`,
  });

  return (
    <RichTextEditor editor={editor} classNames={classes}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export const typographyStyles: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
`;

function Demo() {
  const editor = useEditor({
    extensions: [StarterKit, Link],
    content: `
    <h2>Heading 2</h2>
    <p>Paragraph with <a href="https://mantine.dev">link</a></p>
    `,
  });

  return (
    <RichTextEditor editor={editor()} classNames={classes}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export const typographyStyles: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
    { fileName: 'Demo.tsx', code, language: 'tsx' },
  ],
};
