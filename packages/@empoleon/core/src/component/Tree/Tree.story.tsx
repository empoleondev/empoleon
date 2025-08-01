import { IconChevronDown } from '@tabler/icons-solidjs';
import { Button } from '../Button';
import { Group } from '../Group';
import { Tree, TreeNodeData } from './Tree';
import { useTree } from './use-tree';
import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Tree',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

const data: TreeNodeData[] = [
  {
    label: 'src',
    value: 'src',
    children: [
      {
        label: 'components',
        value: 'src/components',
        children: [
          { label: 'Accordion.tsx', value: 'src/components/Accordion.tsx' },
          { label: 'Tree.tsx', value: 'src/components/Tree.tsx' },
          { label: 'Button.tsx', value: 'src/components/Button.tsx' },
        ],
      },
    ],
  },
  {
    label: 'node_modules',
    value: 'node_modules',
    children: [
      { label: 'react', value: 'node_modules/react' },
      {
        label: '@empoleon',
        value: 'node_modules/@empoleon',
        children: [
          { label: 'core', value: 'node_modules/@empoleon/core' },
          { label: 'hooks', value: 'node_modules/@empoleon/hooks' },
          { label: 'form', value: 'node_modules/@empoleon/form' },
        ],
      },
    ],
  },
  {
    label: 'package.json',
    value: 'package.json',
  },
  {
    label: 'tsconfig.json',
    value: 'tsconfig.json',
  },
];

export function Usage() {
  const tree = useTree();
  return (
    <div style={{ 'padding': '40px' }}>
      <Tree data={data} tree={tree} />
    </div>
  );
}

export function Controller() {
  const tree = useTree({
    onNodeCollapse: (value) => console.log('Node collapsed:', value),
    onNodeExpand: (value) => console.log('Node expanded:', value),
  });
  return (
    <div style={{ 'padding': '40px' }}>
      <Tree data={data} tree={tree} />
      <Button onClick={() => tree.expandAllNodes()}>Expand all</Button>
      <Button onClick={() => tree.collapseAllNodes()}>Collapse all</Button>
    </div>
  );
}

export function RenderNode() {
  const tree = useTree();
  return (
    <div style={{ 'padding': '40px' }}>
      <Tree
        tree={tree}
        data={data}
        renderNode={({ node, expanded, hasChildren, elementProps }) => (
          <Group gap="xs" {...elementProps}>
            <span>{node.label}</span>
            {hasChildren && (
              <IconChevronDown
                size={18}
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            )}
          </Group>
        )}
      />
    </div>
  );
}

export function ExpandOnDoubleClick() {
  const tree = useTree();

  return (
    <div style={{ 'padding': '40px' }}>
      <Tree
        tree={tree}
        data={data}
        expandOnClick={false}
        style={{ userSelect: 'none' }}
        renderNode={({ node, expanded, hasChildren, elementProps }) => (
          <Group gap="xs" {...elementProps} on-double-click={() => tree.toggleExpanded(node.value)}>
            <span>{node.label}</span>
            {hasChildren && (
              <IconChevronDown
                size={18}
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            )}
          </Group>
        )}
      />
    </div>
  );
}

export function SelectOnClick() {
  const tree = useTree();

  return (
    <div style={{ 'padding': '40px' }}>
      <Tree
        tree={tree}
        data={data}
        selectOnClick
        expandOnSpace={false}
        clearSelectionOnOutsideClick
        renderNode={({ node, expanded, hasChildren, elementProps }) => (
          <Group gap="xs" {...elementProps} on-double-click={() => tree.toggleExpanded(node.value)}>
            <span>{node.label}</span>
            {hasChildren && (
              <IconChevronDown
                size={18}
                style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
              />
            )}
          </Group>
        )}
      />
    </div>
  );
}
