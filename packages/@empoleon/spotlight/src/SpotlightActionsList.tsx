import { createEffect, splitProps } from 'solid-js';
import {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  ScrollArea,
  useProps,
} from '@empoleon/core';
import { useId } from '@empoleon/hooks';
import { useSpotlightContext } from './Spotlight.context';
import { spotlightActions } from './spotlight.store';
import classes from './Spotlight.module.css';

export type SpotlightActionsListStylesNames = 'actionsList' | 'actionsListInner';

export interface SpotlightActionsListProps
  extends BoxProps,
    CompoundStylesApiProps<SpotlightActionsListFactory>,
    ElementProps<'div'> {}

export type SpotlightActionsListFactory = Factory<{
  props: SpotlightActionsListProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightActionsListStylesNames;
  compound: true;
}>;

export const SpotlightActionsList = factory<SpotlightActionsListFactory>((_props) => {
  const props = useProps('SpotlightActionsList', null, _props);
  const [local, others] = splitProps(props, [
    'className',
    'style',
    'id',
    'children',
    'vars',
    'classNames',
    'styles',
    'ref',
  ]);
  const ctx = useSpotlightContext();
  const generatedId = `empoleon-${useId().replace(/:/g, '')}`;
  const listId = local.id || generatedId;

  createEffect(() => {
    spotlightActions.setListId(listId, ctx.store);
    return () => spotlightActions.setListId('', ctx.store);
  }, []);

  return (
    <ScrollArea.Autosize
      {...ctx.getStyles('actionsList', {
        className: local.className,
        style: local.style,
        classNames: local.classNames,
        styles: local.styles,
      })}
      ref={local.ref}
      type="scroll"
      scrollbarSize="var(--spotlight-actions-list-padding)"
      offsetScrollbars="y"
      id={listId}
      {...others}
    >
      {local.children}
    </ScrollArea.Autosize>
  );
});

SpotlightActionsList.classes = classes;
SpotlightActionsList.displayName = '@empoleon/spotlight/SpotlightActionsList';
