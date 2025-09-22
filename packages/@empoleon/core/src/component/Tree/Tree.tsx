import { createEffect, createMemo, For, JSX, splitProps } from 'solid-js';
import { useClickOutside, useMergedRef } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getSpacing,
  EmpoleonSpacing,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { TreeNode } from './TreeNode';
import { TreeController, useTree } from './use-tree';
import classes from './Tree.module.css';

export interface TreeNodeData {
  label: JSX.Element;
  value: string;
  nodeProps?: Record<string, any>;
  children?: TreeNodeData[];
}

export interface RenderTreeNodePayload {
  /** Node level in the tree */
  level: number;

  /** `true` if the node is expanded, applicable only for nodes with `children` */
  expanded: boolean;

  /** `true` if the node has non-empty `children` array */
  hasChildren: boolean;

  /** `true` if the node is selected */
  selected: boolean;

  /** Node data from the `data` prop of `Tree` */
  node: TreeNodeData;

  /** Tree controller instance, return value of `useTree` hook */
  tree: TreeController;

  /** Props to spread into the root node element */
  elementProps: {
    className: string;
    style: JSX.CSSProperties;
    onClick: (event: MouseEvent) => void;
    'data-selected': boolean | undefined;
    'data-value': string;
    'data-hovered': boolean | undefined;
  };
}

export type RenderNode = (payload: RenderTreeNodePayload) => JSX.Element | null;

export type TreeStylesNames = 'root' | 'node' | 'subtree' | 'label';
export type TreeCssVariables = {
  root: '--level-offset';
};

export interface TreeProps extends BoxProps, StylesApiProps<TreeFactory>, ElementProps<'ul'> {
  /** Data used to render nodes */
  data: TreeNodeData[];

  /** Horizontal padding of each subtree level, key of `theme.spacing` or any valid CSS value, `'lg'` by default */
  levelOffset?: EmpoleonSpacing;

  /** Determines whether tree node with children should be expanded on click, `true` by default */
  expandOnClick?: boolean;

  /** Determines whether tree node with children should be expanded on space key press, `true` by default */
  expandOnSpace?: boolean;

  /** Determines whether tree node should be checked on space key press, `false` by default */
  checkOnSpace?: boolean;

  /** Determines whether node should be selected on click, `false` by default */
  selectOnClick?: boolean;

  /** Use-tree hook instance that can be used to manipulate component state */
  tree?: TreeController;

  /** A function to render tree node label */
  renderNode?: RenderNode;

  /** Determines whether selection should be cleared when user clicks outside of the tree, `false` by default */
  clearSelectionOnOutsideClick?: boolean;

  /** Determines whether tree nodes range can be selected with click when `Shift` key is pressed, `true` by default */
  allowRangeSelection?: boolean;
}

function getFlatValues(data: TreeNodeData[]): string[] {
  return data.reduce<string[]>((acc, item) => {
    acc.push(item.value);
    if (item.children) {
      acc.push(...getFlatValues(item.children));
    }
    return acc;
  }, []);
}

export type TreeFactory = Factory<{
  props: TreeProps;
  ref: HTMLUListElement;
  stylesNames: TreeStylesNames;
  vars: TreeCssVariables;
}>;

const defaultProps: Partial<TreeProps> = {
  expandOnClick: true,
  allowRangeSelection: true,
  expandOnSpace: true,
};

const varsResolver = createVarsResolver<TreeFactory>((_theme, props) => ({
  root: {
    '--level-offset': getSpacing(props.levelOffset),
  },
}));

export const Tree = factory<TreeFactory>(_props => {
  const props = useProps('Tree', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'data',
    'expandOnClick',
    'tree',
    'renderNode',
    'selectOnClick',
    'clearSelectionOnOutsideClick',
    'allowRangeSelection',
    'expandOnSpace',
    'levelOffset',
    'checkOnSpace',
    'attributes',
    'ref'
  ]);

  const defaultController = useTree();
  const controller = local.tree || defaultController;

  const getStyles = useStyles<TreeFactory>({
    name: 'Tree',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  const clickOutsideRef = useClickOutside(
    () => local.clearSelectionOnOutsideClick && controller.clearSelected()
  );

  const mergedRef = useMergedRef(local.ref, clickOutsideRef);

  const flatValues = createMemo(() => getFlatValues(local.data), [local.data]);

  createEffect(() => {
    controller.initialize(local.data);
  });

  const nodes = (
    <For each={local.data}>
      {(node: any, index) => (
        <TreeNode
          node={node}
          getStyles={getStyles}
          rootIndex={index()}
          expandOnClick={local.expandOnClick}
          selectOnClick={local.selectOnClick}
          controller={controller}
          renderNode={local.renderNode}
          flatValues={flatValues()}
          allowRangeSelection={local.allowRangeSelection}
          expandOnSpace={local.expandOnSpace}
          checkOnSpace={local.checkOnSpace}
        />
      )}
    </For>
  );

  return (
    <Box
      component="ul"
      ref={mergedRef}
      {...getStyles('root')}
      {...others}
      role="tree"
      aria-multiselectable={controller.multiple}
      data-tree-root
    >
      {nodes}
    </Box>
  );
});

Tree.displayName = '@empoleon/core/Tree';
Tree.classes = classes;
