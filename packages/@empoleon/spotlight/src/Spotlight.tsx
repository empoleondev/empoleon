import { For, JSX, splitProps } from 'solid-js';
import { factory, Factory, getDefaultZIndex, useProps } from '@empoleon/core';
import { useUncontrolled } from '@empoleon/hooks';
import { defaultSpotlightFilter } from './default-spotlight-filter';
import { isActionsGroup } from './is-actions-group';
import { limitActions } from './limit-actions';
import { spotlight, spotlightStore } from './spotlight.store';
import { SpotlightAction, SpotlightActionProps } from './SpotlightAction';
import { SpotlightActionsGroup } from './SpotlightActionsGroup';
import { SpotlightActionsList } from './SpotlightActionsList';
import { SpotlightEmpty } from './SpotlightEmpty';
import { SpotlightFooter } from './SpotlightFooter';
import { SpotlightRoot, SpotlightRootProps, SpotlightRootStylesNames } from './SpotlightRoot';
import { SpotlightSearch, SpotlightSearchProps } from './SpotlightSearch';
import classes from './Spotlight.module.css';

export type SpotlightFilterFunction = (
  query: string,
  actions: SpotlightActions[]
) => SpotlightActions[];

export interface SpotlightActionData extends SpotlightActionProps {
  id: string;
  group?: string;
}

export interface SpotlightActionGroupData {
  group: string;
  actions: SpotlightActionData[];
}

export type SpotlightActions = SpotlightActionData | SpotlightActionGroupData;

export type SpotlightStylesNames = SpotlightRootStylesNames;

export interface SpotlightProps extends SpotlightRootProps {
  /** Props passed down to the `Spotlight.Search` */
  searchProps?: SpotlightSearchProps;

  /** Actions data, passed down to `Spotlight.Action` component */
  actions: SpotlightActions[];

  /** Function to filter actions data based on search query, by default actions are filtered by title, description and keywords */
  filter?: SpotlightFilterFunction;

  /** Message displayed when none of the actions match given `filter` */
  nothingFound?: JSX.Element;

  /** Determines whether search query should be highlighted in action label, `false` by default */
  highlightQuery?: boolean;

  /** Maximum number of actions displayed at a time, `Infinity` by default */
  limit?: number;
}

export type SpotlightFactory = Factory<{
  props: SpotlightProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightStylesNames;
  staticComponents: {
    Search: typeof SpotlightSearch;
    ActionsList: typeof SpotlightActionsList;
    Action: typeof SpotlightAction;
    Empty: typeof SpotlightEmpty;
    Footer: typeof SpotlightFooter;
    ActionsGroup: typeof SpotlightActionsGroup;
    Root: typeof SpotlightRoot;
    open: typeof spotlight.open;
    close: typeof spotlight.close;
    toggle: typeof spotlight.toggle;
  };
}>;

const defaultProps: Partial<SpotlightProps> = {
  size: 600,
  yOffset: '80px',
  limit: Infinity,
  zIndex: getDefaultZIndex('max'),
  overlayProps: { backgroundOpacity: 0.35, blur: 7 },
  transitionProps: { duration: 200, transition: 'pop' },
  store: spotlightStore,
  filter: defaultSpotlightFilter,
  clearQueryOnClose: true,
  closeOnActionTrigger: true,
  shortcut: 'mod + K',
  highlightQuery: false,
};

export const Spotlight = factory<SpotlightFactory>(_props => {
  const props = useProps('Spotlight', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'searchProps',
    'filter',
    'query',
    'onQueryChange',
    'actions',
    'nothingFound',
    'highlightQuery',
    'limit',
    'ref'
  ]);

  const [_query, setQuery] = useUncontrolled({
    value: () => local.query,
    defaultValue: '',
    finalValue: '',
    onChange: local.onQueryChange,
  });

  const filteredActions = () => (
    <For each={limitActions(local.filter!(_query(), local.actions), local.limit!)}>
      {(item) => {
        if (isActionsGroup(item)) {
          return (
            <SpotlightActionsGroup label={item.group}>
              <For each={item.actions}>
                {({ id, ...actionData }) => (
                  <SpotlightAction highlightQuery={local.highlightQuery} {...actionData} />
                )}
              </For>
            </SpotlightActionsGroup>
          );
        }

        return <SpotlightAction highlightQuery={local.highlightQuery} {...item} />;
      }}
    </For>
  );

  return (
    <SpotlightRoot {...others} query={_query()} onQueryChange={setQuery} ref={local.ref}>
      <SpotlightSearch {...local.searchProps} />
      <SpotlightActionsList>
        {filteredActions()}
        {filteredActions.length === 0 && local.nothingFound && (
          <SpotlightEmpty>{local.nothingFound}</SpotlightEmpty>
        )}
      </SpotlightActionsList>
    </SpotlightRoot>
  );
});

Spotlight.classes = classes;
Spotlight.displayName = '@empoleon/spotlight/Spotlight';
Spotlight.Search = SpotlightSearch;
Spotlight.ActionsList = SpotlightActionsList;
Spotlight.Action = SpotlightAction;
Spotlight.Empty = SpotlightEmpty;
Spotlight.ActionsGroup = SpotlightActionsGroup;
Spotlight.Footer = SpotlightFooter;
Spotlight.Root = SpotlightRoot;
Spotlight.open = spotlight.open;
Spotlight.close = spotlight.close;
Spotlight.toggle = spotlight.toggle;
