import { IconFolder, IconFolderOpen } from '@tabler/icons-solidjs';
import { Group, RenderTreeNodePayload, Tree } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { CssIcon, NpmIcon, TypeScriptCircleIcon } from '@empoleonx/dev-icons';
import { data, dataCode } from './data';
import classes from './Tree.demo.files.module.css';

const cssCode = `.root {
  font-family: var(--empoleon-font-family-monospace);
  font-size: 13px;
}

.label {
  padding-block: 3px;

  &[data-hovered] {
    @mixin where-light {
      background-color: var(--empoleon-color-gray-0);
    }

    @mixin where-dark {
      background-color: var(--empoleon-color-dark-6);
      color: var(--empoleon-color-white);
    }
  }

  &[data-selected] {
    font-weight: 700;

    @mixin light {
      background-color: var(--empoleon-color-blue-0);
      color: var(--empoleon-color-black);
    }

    @mixin dark {
      background-color: alpha(var(--empoleon-color-blue-8), 0.35);
      color: var(--empoleon-color-blue-0);
    }
  }
}`;

const code = `
import { IconFolder, IconFolderOpen } from '@tabler/icons-solidjs';
import { Group, RenderTreeNodePayload, Tree } from '@empoleon/core';
import { CssIcon, NpmIcon, TypeScriptCircleIcon } from '@empoleonx/dev-icons';
import { data, dataCode } from './data';
import classes from './Demo.module.css';

interface FileIconProps {
  name: string;
  isFolder: boolean;
  expanded: boolean;
}

function FileIcon({ name, isFolder, expanded }: FileIconProps) {
  if (name.endsWith('package.json')) {
    return <NpmIcon size={14} />;
  }

  if (name.endsWith('.ts') || name.endsWith('.tsx') || name.endsWith('tsconfig.json')) {
    return <TypeScriptCircleIcon size={14} />;
  }

  if (name.endsWith('.css')) {
    return <CssIcon size={14} />;
  }

  if (isFolder) {
    return expanded ? (
      <IconFolderOpen color="var(--empoleon-color-yellow-9)" size={14} stroke={2.5} />
    ) : (
      <IconFolder color="var(--empoleon-color-yellow-9)" size={14} stroke={2.5} />
    );
  }

  return null;
}

function Leaf({ node, expanded, hasChildren, elementProps }: RenderTreeNodePayload) {
  return (
    <Group gap={5} {...elementProps}>
      <FileIcon name={node.value} isFolder={hasChildren} expanded={expanded} />
      <span>{node.label}</span>
    </Group>
  );
}

function Demo() {
  return (
    <Tree
      classNames={classes}
      selectOnClick
      clearSelectionOnOutsideClick
      data={data}
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
}
`;

interface FileIconProps {
  name: string;
  isFolder: boolean;
  expanded: boolean;
}

function FileIcon({ name, isFolder, expanded }: FileIconProps) {
  if (name.endsWith('package.json')) {
    return <NpmIcon size={14} />;
  }

  if (name.endsWith('.ts') || name.endsWith('.tsx') || name.endsWith('tsconfig.json')) {
    return <TypeScriptCircleIcon size={14} />;
  }

  if (name.endsWith('.css')) {
    return <CssIcon size={14} />;
  }

  if (isFolder) {
    return expanded ? (
      <IconFolderOpen color="var(--empoleon-color-yellow-9)" size={14} stroke='2.5' />
    ) : (
      <IconFolder color="var(--empoleon-color-yellow-9)" size={14} stroke='2.5' />
    );
  }

  return null;
}

function Leaf({ node, expanded, hasChildren, elementProps }: RenderTreeNodePayload) {
  return (
    <Group gap={5} {...elementProps}>
      <FileIcon name={node.value} isFolder={hasChildren} expanded={expanded} />
      <span>{node.label}</span>
    </Group>
  );
}

function Demo() {
  return (
    <Tree
      classNames={classes}
      selectOnClick
      clearSelectionOnOutsideClick
      data={data}
      renderNode={(payload) => <Leaf {...payload} />}
    />
  );
}

export const files: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  maxWidth: 340,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code },
    { fileName: 'Demo.module.css', language: 'scss', code: cssCode },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
};
