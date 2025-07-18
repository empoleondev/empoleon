import { Accessor, createMemo, createSignal } from 'solid-js';
import {
  CheckedNodeStatus,
  getAllCheckedNodes,
} from './get-all-checked-nodes/get-all-checked-nodes';
import {
  getAllChildrenNodes,
  getChildrenNodesValues,
} from './get-children-nodes-values/get-children-nodes-values';
import { memoizedIsNodeChecked } from './is-node-checked/is-node-checked';
import { memoizedIsNodeIndeterminate } from './is-node-indeterminate/is-node-indeterminate';
import type { TreeNodeData } from './Tree';

export type TreeExpandedState = Record<string, boolean>;

function getInitialTreeExpandedState(
  initialState: TreeExpandedState,
  data: TreeNodeData[],
  value: string | string[] | undefined,
  acc: TreeExpandedState = {}
) {
  data.forEach((node) => {
    acc[node.value] = node.value in initialState ? initialState[node.value] : node.value === value;

    if (Array.isArray(node.children)) {
      getInitialTreeExpandedState(initialState, node.children, value, acc);
    }
  });

  return acc;
}

export function getTreeExpandedState(data: TreeNodeData[], expandedNodesValues: string[] | '*') {
  const state = getInitialTreeExpandedState({}, data, []);

  if (expandedNodesValues === '*') {
    return Object.keys(state).reduce((acc, key) => ({ ...acc, [key]: true }), {});
  }

  expandedNodesValues.forEach((node) => {
    state[node] = true;
  });

  return state;
}

function getInitialCheckedState(initialState: string[], data: TreeNodeData[]) {
  const acc: string[] = [];

  initialState.forEach((node) => acc.push(...getChildrenNodesValues(node, data)));

  return Array.from(new Set(acc));
}

export interface UseTreeInput {
  /** Initial expanded state of all nodes */
  initialExpandedState?: TreeExpandedState;

  /** Initial selected state of nodes */
  initialSelectedState?: string[];

  /** Initial checked state of nodes */
  initialCheckedState?: string[];

  /** Determines whether multiple node can be selected at a time */
  multiple?: boolean;

  /** Called with the node value when it is expanded */
  onNodeExpand?: (value: string) => void;

  /** Called with the node value when it is collapsed */
  onNodeCollapse?: (value: string) => void;
}

export interface UseTreeReturnType {
  /** Determines whether multiple node can be selected at a time */
  multiple: boolean;

  /** A record of `node.value` and boolean values that represent nodes expanded state */
  expandedState: Accessor<TreeExpandedState>;

  /** An array of selected nodes values */
  selectedState: Accessor<string[]>;

  /** An array of checked nodes values */
  checkedState: Accessor<string[]>;

  /** A value of the node that was last clicked
   * Anchor node is used to determine range of selected nodes for multiple selection
   */
  anchorNode: Accessor<string | null>;

  /** Initializes tree state based on provided data, called automatically by the Tree component */
  initialize: (data: TreeNodeData[]) => void;

  /** Toggles expanded state of the node with provided value */
  toggleExpanded: (value: string) => void;

  /** Collapses node with provided value */
  collapse: (value: string) => void;

  /** Expands node with provided value */
  expand: (value: string) => void;

  /** Expands all nodes */
  expandAllNodes: () => void;

  /** Collapses all nodes */
  collapseAllNodes: () => void;

  /** Sets expanded state */
  setExpandedState: (state: TreeExpandedState | ((prev: TreeExpandedState) => TreeExpandedState)) => void;

  /** Toggles selected state of the node with provided value */
  toggleSelected: (value: string) => void;

  /** Selects node with provided value */
  select: (value: string) => void;

  /** Deselects node with provided value */
  deselect: (value: string) => void;

  /** Clears selected state */
  clearSelected: () => void;

  /** Sets selected state */
  setSelectedState: (state: string[] | ((prev: string[]) => string[])) => void;

  /** A value of the node that is currently hovered */
  hoveredNode: Accessor<string | null>;

  /** Sets hovered node */
  setHoveredNode: (value: string | null | ((prev: string | null) => string | null)) => void;

  /** Checks node with provided value */
  checkNode: (value: string) => void;

  /** Unchecks node with provided value */
  uncheckNode: (value: string) => void;

  /** Checks all nodes */
  checkAllNodes: () => void;

  /** Unchecks all nodes */
  uncheckAllNodes: () => void;

  /** Sets checked state */
  setCheckedState: (state: string[] | ((prev: string[]) => string[])) => void;

  /** Returns all checked nodes with status */
  getCheckedNodes: () => CheckedNodeStatus[];

  /** Returns `true` if node with provided value is checked */
  isNodeChecked: (value: string) => boolean;

  /** Returns `true` if node with provided value is indeterminate */
  isNodeIndeterminate: (value: string) => boolean;
}

export function useTree({
  initialSelectedState = [],
  initialCheckedState = [],
  initialExpandedState = {},
  multiple = false,
  onNodeCollapse,
  onNodeExpand,
}: UseTreeInput = {}): UseTreeReturnType {
  const [data, setData] = createSignal<TreeNodeData[]>([]);
  const [expandedState, setExpandedState] = createSignal(initialExpandedState);
  const [selectedState, setSelectedState] = createSignal(initialSelectedState);
  const [checkedState, setCheckedState] = createSignal(initialCheckedState);
  const [anchorNode, setAnchorNode] = createSignal<string | null>(null);
  const [hoveredNode, setHoveredNode] = createSignal<string | null>(null);

  // const expandedStateMemo = createMemo(() => expandedState());
  // const selectedStateMemo = createMemo(() => selectedState());
  // const checkedStateMemo  = createMemo(() => checkedState());
  // const anchorNodeMemo     = createMemo(() => anchorNode());
  // const hoveredNodeMemo    = createMemo(() => hoveredNode());

  const initialize = (_data: TreeNodeData[]) => {
    setExpandedState((current) => getInitialTreeExpandedState(current, _data, selectedState()));
    setCheckedState((current) => getInitialCheckedState(current, _data));
    setData(_data);
  };

  const toggleExpanded = (value: string) => {
    setExpandedState((current) => {
      const nextState = { ...current, [value]: !current[value] };
      nextState[value] ? onNodeExpand?.(value) : onNodeCollapse?.(value);
      return nextState;
    });
  };

  const collapse = (value: string) => {
    setExpandedState((current) => {
      if (current[value] !== false) {
        onNodeCollapse?.(value);
      }

      return { ...current, [value]: false };
    });
  };

  const expand = (value: string) => {
    setExpandedState((current) => {
      if (current[value] !== true) {
        onNodeExpand?.(value);
      }

      return { ...current, [value]: true };
    });
  };

  const expandAllNodes = () => {
    setExpandedState((current) => {
      const next = { ...current };
      Object.keys(next).forEach((key) => {
        next[key] = true;
      });

      return next;
    });
  };

  const collapseAllNodes = () => {
    setExpandedState((current) => {
      const next = { ...current };
      Object.keys(next).forEach((key) => {
        next[key] = false;
      });

      return next;
    });
  }

  const toggleSelected = (value: string) => {
    setSelectedState((current) => {
      if (!multiple) {
        if (current.includes(value)) {
          setAnchorNode(null);
          return [];
        }

        setAnchorNode(value);
        return [value];
      }

      if (current.includes(value)) {
        setAnchorNode(null);
        return current.filter((item) => item !== value);
      }

      setAnchorNode(value);

      return [...current, value];
    });
  }

  const select = (value: string) => {
    setAnchorNode(value);
    setSelectedState((current) =>
      multiple ? (current.includes(value) ? current : [...current, value]) : [value]
    );
  }

  const deselect = (value: string) => {
    anchorNode() === value && setAnchorNode(null);
    setSelectedState((current) => current.filter((item) => item !== value));
  };

  const clearSelected = () => {
    setSelectedState([]);
    setAnchorNode(null);
  };

  const checkNode = (value: string) => {
      const checkedNodes = getChildrenNodesValues(value, data());
      setCheckedState((current) => Array.from(new Set([...current, ...checkedNodes])));
    };

  const uncheckNode = (value: string) => {
      const checkedNodes = getChildrenNodesValues(value, data());
      setCheckedState((current) => current.filter((item) => !checkedNodes.includes(item)));
    };

  const checkAllNodes = () => {
    setCheckedState(() => getAllChildrenNodes(data()));
  };

  const uncheckAllNodes = () => {
    setCheckedState([]);
  };

  const getCheckedNodes = () => getAllCheckedNodes(data(), checkedState()).result;
  const isNodeChecked = (value: string) => memoizedIsNodeChecked(value, data(), checkedState());
  const isNodeIndeterminate = (value: string) =>
    memoizedIsNodeIndeterminate(value, data(), checkedState());

  return {
    multiple,
    expandedState,
    selectedState,
    checkedState,
    anchorNode,
    initialize,

    toggleExpanded,
    collapse,
    expand,
    expandAllNodes,
    collapseAllNodes,
    setExpandedState,

    checkNode,
    uncheckNode,
    checkAllNodes,
    uncheckAllNodes,
    setCheckedState,

    toggleSelected,
    select,
    deselect,
    clearSelected,
    setSelectedState,

    hoveredNode,
    setHoveredNode,
    getCheckedNodes,
    isNodeChecked,
    isNodeIndeterminate,
  };
}

export type TreeController = ReturnType<typeof useTree>;
