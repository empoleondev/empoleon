import { createSignal, For, Show, splitProps } from 'solid-js';
import { Box, findElementAncestor, GetStylesApi } from '../../core';
import type { RenderNode, TreeFactory, TreeNodeData } from './Tree';
import type { TreeController } from './use-tree';

function getValuesRange(anchor: string | null, value: string | undefined, flatValues: string[]) {
  if (!anchor || !value) {
    return [];
  }

  const anchorIndex = flatValues.indexOf(anchor);
  const valueIndex = flatValues.indexOf(value);
  const start = Math.min(anchorIndex, valueIndex);
  const end = Math.max(anchorIndex, valueIndex);

  return flatValues.slice(start, end + 1);
}

interface TreeNodeProps {
  node: TreeNodeData;
  getStyles: GetStylesApi<TreeFactory>;
  rootIndex: number | undefined;
  controller: TreeController;
  expandOnClick: boolean | undefined;
  flatValues: string[];
  isSubtree?: boolean;
  level?: number;
  renderNode: RenderNode | undefined;
  selectOnClick: boolean | undefined;
  allowRangeSelection: boolean | undefined;
  expandOnSpace: boolean | undefined;
  checkOnSpace: boolean | undefined;
}

export function TreeNode(props: TreeNodeProps) {
  const [ref, setRef] = createSignal<HTMLLIElement | null>(null as HTMLLIElement | null);

  const [local] = splitProps(props, [
    'node',
    'getStyles',
    'rootIndex',
    'controller',
    'expandOnClick',
    'selectOnClick',
    'isSubtree',
    'level',
    'renderNode',
    'flatValues',
    'allowRangeSelection',
    'expandOnSpace',
    'checkOnSpace',
  ]);

  const level = () => local.level || 1;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'ArrowRight') {
      event.stopPropagation();
      event.preventDefault();

      if (local.controller.expandedState()[local.node.value]) {
        (event.currentTarget as HTMLElement)?.querySelector<HTMLLIElement>('[role=treeitem]')?.focus();
      } else {
        local.controller.expand(local.node.value);
      }
    }

    if (event.code === 'ArrowLeft') {
      event.stopPropagation();
      event.preventDefault();
      if (local.controller.expandedState()[local.node.value] && (local.node.children || []).length > 0) {
        local.controller.collapse(local.node.value);
      } else if (local.isSubtree) {
        findElementAncestor(event.currentTarget as HTMLElement, '[role=treeitem]')?.focus();
      }
    }

    if (event.code === 'ArrowDown' || event.code === 'ArrowUp') {
      const root = findElementAncestor(event.currentTarget as HTMLElement, '[data-tree-root]');

      if (!root) {
        return;
      }

      event.stopPropagation();
      event.preventDefault();
      const nodes = Array.from(root.querySelectorAll<HTMLLIElement>('[role=treeitem]'));
      const index = nodes.indexOf(event.currentTarget as HTMLLIElement);

      if (index === -1) {
        return;
      }

      const nextIndex = event.code === 'ArrowDown' ? index + 1 : index - 1;
      nodes[nextIndex]?.focus();

      if (event.shiftKey) {
        const selectNode = nodes[nextIndex];

        if (selectNode) {
          local.controller.setSelectedState(
            getValuesRange(local.controller.anchorNode(), selectNode.dataset.value, local.flatValues)
          );
        }
      }
    }

    if (event.code === 'Space') {
      if (local.expandOnSpace) {
        event.stopPropagation();
        event.preventDefault();
        local.controller.toggleExpanded(local.node.value);
      }

      if (local.checkOnSpace) {
        event.stopPropagation();
        event.preventDefault();
        local.controller.isNodeChecked(local.node.value)
          ? local.controller.uncheckNode(local.node.value)
          : local.controller.checkNode(local.node.value);
      }
    }
  };

  const handleNodeClick = (event: MouseEvent) => {
    event.stopPropagation();
    const element = ref();

    if (local.allowRangeSelection && event.shiftKey && local.controller.anchorNode) {
      local.controller.setSelectedState(getValuesRange(local.controller.anchorNode(), local.node.value, local.flatValues));
      element?.focus();
    } else {
      local.expandOnClick && local.controller.toggleExpanded(local.node.value);
      local.selectOnClick && local.controller.select(local.node.value);
      element?.focus();
    }
  };

  const selected = local.controller.selectedState().includes(local.node.value);
  const elementProps = {
    ...local.getStyles('label'),
    onClick: handleNodeClick,
    'data-selected': selected || undefined,
    'data-value': local.node.value,
    'data-hovered': local.controller.hoveredNode() === local.node.value || undefined,
  };

  return (
    <Box component='li'
      {...local.getStyles('node', {
        style: { '--label-offset': `calc(var(--level-offset) * ${level() - 1})` },
      })}
      role="treeitem"
      aria-selected={selected}
      data-value={local.node.value}
      data-selected={selected || undefined}
      data-hovered={local.controller.hoveredNode() === local.node.value || undefined}
      data-level={level()}
      tabIndex={local.rootIndex === 0 ? 0 : -1}
      onKeyDown={handleKeyDown}
      ref={setRef}
      onMouseOver={(event) => {
        event.stopPropagation();
        local.controller.setHoveredNode(local.node.value);
      }}
      onMouseLeave={(event) => {
        event.stopPropagation();
        local.controller.setHoveredNode(null);
      }}
    >
      {typeof local.renderNode === 'function' ? (
        local.renderNode({
          node: local.node,
          level: level(),
          selected,
          tree: local.controller,
          expanded: local.controller.expandedState()[local.node.value] || false,
          hasChildren: Array.isArray(local.node.children) && local.node.children.length > 0,
          // @ts-ignore
          elementProps,
        })
      ) : (
        <Box component='div' {...elementProps}>{local.node.label}</Box>
      )}

      <Show when={local.node.children && local.node.children.length > 0}>
        <Show when={local.controller.expandedState()[local.node.value]}>
          <Box component='ul' role="group" {...local.getStyles('subtree')} data-level={level}>
            <For each={local.node.children || []}>
              {(child) => (
                <TreeNode
                  node={child}
                  flatValues={local.flatValues}
                  getStyles={local.getStyles}
                  rootIndex={undefined}
                  level={level() + 1}
                  controller={local.controller}
                  expandOnClick={local.expandOnClick}
                  isSubtree
                  renderNode={local.renderNode}
                  selectOnClick={local.selectOnClick}
                  allowRangeSelection={local.allowRangeSelection}
                  expandOnSpace={local.expandOnSpace}
                  checkOnSpace={local.checkOnSpace}
                />
              )}
            </For>
          </Box>
        </Show>
      </Show>
    </Box>
  );
}

TreeNode.displayName = '@empoleon/core/TreeNode';
