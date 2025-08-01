import { createEffect, JSX, on, splitProps } from 'solid-js';
import {
  factory,
  Factory,
  getDefaultZIndex,
  Modal,
  ModalProps,
  ModalStylesNames,
  rem,
  resolveClassNames,
  resolveStyles,
  StylesApiProps,
  useEmpoleonTheme,
  useProps,
  useStyles,
} from '@empoleon/core';
import { useHotkeys } from '@empoleon/hooks';
import { getHotkeys } from './get-hotkeys';
import { SpotlightProvider } from './Spotlight.context';
import { spotlightActions, SpotlightStore, spotlightStore, useSpotlight } from './spotlight.store';
import classes from './Spotlight.module.css';

export type SpotlightRootStylesNames =
  | ModalStylesNames
  | 'search'
  | 'actionsList'
  | 'action'
  | 'empty'
  | 'footer'
  | 'actionBody'
  | 'actionLabel'
  | 'actionDescription'
  | 'actionSection'
  | 'actionsGroup';

export interface SpotlightRootProps
  extends StylesApiProps<SpotlightRootFactory>,
    Omit<
      ModalProps,
      | 'styles'
      | 'classNames'
      | 'vars'
      | 'variant'
      | 'opened'
      | 'onClose'
      | 'closeButtonProps'
      | 'withCloseButton'
    > {
  /** Spotlight store, can be used to create multiple instances of spotlight */
  store?: SpotlightStore;

  /** Controlled Spotlight search query */
  query?: string;

  /** Called when query changes */
  onQueryChange?: (query: string) => void;

  /** Determines whether the search query should be cleared when the spotlight is closed, `true` by default */
  clearQueryOnClose?: boolean;

  /** Keyboard shortcut or a list of shortcuts to trigger spotlight, `'mod + K'` by default */
  shortcut?: string | string[] | null;

  /** A list of tags which when focused will be ignored by shortcut, `['input', 'textarea', 'select']` by default */
  tagsToIgnore?: string[];

  /** Determines whether shortcut should trigger based in contentEditable, `false` by default */
  triggerOnContentEditable?: boolean;

  /** If set, spotlight will not be rendered */
  disabled?: boolean;

  /** Called when spotlight opens */
  onSpotlightOpen?: () => void;

  /** Called when spotlight closes */
  onSpotlightClose?: () => void;

  /** Forces opened state, useful for tests */
  forceOpened?: boolean;

  /** Determines whether spotlight should be closed when one of the actions is triggered, `true` by default */
  closeOnActionTrigger?: boolean;

  /** Spotlight content max-height. Ignored unless `scrollable` prop is set. `400` by default */
  maxHeight?: JSX.CSSProperties['max-height'];

  /** Determines whether the actions list should be scrollable. If not set, `maxHeight` is ignored, `false` by default */
  scrollable?: boolean;
}

export type SpotlightRootFactory = Factory<{
  props: SpotlightRootProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightRootStylesNames;
  compound: true;
}>;

const defaultProps: Partial<SpotlightRootProps> = {
  size: 600,
  yOffset: '80px',
  zIndex: getDefaultZIndex('max'),
  overlayProps: { backgroundOpacity: 0.35, blur: 7 },
  transitionProps: { duration: 200, transition: 'pop' },
  store: spotlightStore,
  clearQueryOnClose: true,
  closeOnActionTrigger: true,
  shortcut: 'mod + K',
  maxHeight: '400px',
  scrollable: false,
};

export const SpotlightRoot = factory<SpotlightRootFactory>(_props => {
  const props = useProps('SpotlightRoot', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'store',
    'children',
    'query',
    'onQueryChange',
    'transitionProps',
    'clearQueryOnClose',
    'shortcut',
    'tagsToIgnore',
    'triggerOnContentEditable',
    'disabled',
    'onSpotlightOpen',
    'onSpotlightClose',
    'forceOpened',
    'closeOnActionTrigger',
    'maxHeight',
    'scrollable',
    'ref'
  ]);

  const theme = useEmpoleonTheme();
  const spotlightState = useSpotlight(local.store!);
  const opened = () => spotlightState().opened;
  const storeQuery = () => spotlightState().query;
  const _query = () => local.query || storeQuery();
  const setQuery = (q: string) => {
    local.onQueryChange?.(q);
    spotlightActions.setQuery(q, local.store!);
  };

  const getStyles = useStyles<SpotlightRootFactory>({
    name: 'Spotlight',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
  });

  useHotkeys(getHotkeys(local.shortcut, local.store!), local.tagsToIgnore, local.triggerOnContentEditable);

  createEffect(on(opened, (isOpened) => {
    isOpened ? local.onSpotlightOpen?.() : local.onSpotlightClose?.();
  }));

  return (
    <SpotlightProvider
      value={{
        getStyles,
        query: _query(),
        setQuery,
        store: local.store!,
        closeOnActionTrigger: local.closeOnActionTrigger,
      }}
    >
      <Modal
        ref={local.ref}
        {...others}
        withCloseButton={false}
        opened={opened() || !!local.forceOpened}
        padding={0}
        onClose={() => spotlightActions.close(local.store!)}
        className={local.className}
        style={local.style}
        classNames={resolveClassNames({
          theme,
          classNames: [classes, local.classNames],
          props,
          stylesCtx: undefined,
        })}
        styles={resolveStyles({ theme, styles: local.styles, props, stylesCtx: undefined })}
        transitionProps={{
          ...local.transitionProps,
          onExited: () => {
            local.clearQueryOnClose && setQuery('');
            spotlightActions.clearSpotlightState({ clearQuery: local.clearQueryOnClose }, local.store!);
            local.transitionProps?.onExited?.();
          },
        }}
        __vars={{ '--spotlight-max-height': local.scrollable ? rem(local.maxHeight) : undefined }}
        __staticSelector="Spotlight"
        data-scrollable={local.scrollable || undefined}
      >
        {local.children}
      </Modal>
    </SpotlightProvider>
  );
});

SpotlightRoot.classes = classes;
SpotlightRoot.displayName = '@empoleon/spotlight/SpotlightRoot';
