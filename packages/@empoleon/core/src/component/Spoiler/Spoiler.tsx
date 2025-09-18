import { splitProps, JSX, createEffect, Show } from 'solid-js';
import { Ref } from '@solid-primitives/refs';
import { useElementSize, useId, useUncontrolled } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { Anchor } from '../Anchor';
import classes from './Spoiler.module.css';

export type SpoilerStylesNames = 'root' | 'control' | 'content';
export type SpoilerCssVariables = {
  root: '--spoiler-transition-duration';
};

export interface SpoilerProps
  extends BoxProps,
    StylesApiProps<SpoilerFactory>,
    ElementProps<'div'> {
  /** Maximum height of the visible content, when this point is reached spoiler appears, `100` by default */
  maxHeight?: number;

  /** Label for close spoiler action */
  hideLabel: JSX.Element;

  /** Label for open spoiler action */
  showLabel: JSX.Element;

  /** Get ref of spoiler toggle button */
  controlRef?: Ref<HTMLButtonElement>;

  /** Initial spoiler state, true to wrap content in spoiler, false to show content without spoiler, opened state is updated on mount */
  initialState?: boolean;

  /** Controlled expanded state value */
  expanded?: boolean;

  /** Called when expanded state changes (when spoiler visibility is toggled by the user) */
  onExpandedChange?: (expanded: boolean) => void;

  /** Spoiler reveal transition duration in ms, set 0 or null to turn off animation, `200` by default */
  transitionDuration?: number;
}

export type SpoilerFactory = Factory<{
  props: SpoilerProps;
  ref: HTMLDivElement;
  stylesNames: SpoilerStylesNames;
  vars: SpoilerCssVariables;
}>;

const defaultProps = {
  maxHeight: 100,
  initialState: false,
} satisfies Partial<SpoilerProps>;

const varsResolver = createVarsResolver<SpoilerFactory>((_, { transitionDuration }) => ({
  root: {
    '--spoiler-transition-duration':
      transitionDuration !== undefined ? `${transitionDuration}ms` : undefined,
  },
}));

export const Spoiler = factory<SpoilerFactory>(_props => {
  const props = useProps('Spoiler', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'initialState',
    'maxHeight',
    'hideLabel',
    'showLabel',
    'children',
    'controlRef',
    'transitionDuration',
    'id',
    'expanded',
    'onExpandedChange',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<SpoilerFactory>({
    name: 'Spoiler',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  const _id = useId(local.id);
  const regionId = `${_id}-region`;
  const [show, setShowState] = useUncontrolled({
    value: () => local.expanded,
    defaultValue: local.initialState!,
    finalValue: false,
    onChange: local.onExpandedChange,
  });
  const { ref: contentRef, height } = useElementSize();
  const spoilerMoreContent = () => show() ? local.hideLabel : local.showLabel;
  const spoiler = () => spoilerMoreContent !== null && local.maxHeight! < height();

  return (
    <Box
      {...getStyles('root')}
      id={_id}
      ref={local.ref}
      data-has-spoiler={spoiler() || undefined}
      {...others}
    >
      <Show when={spoiler()}>
        <Anchor
          component="button"
          type="button"
          ref={local.controlRef}
          onClick={() => {
            setShowState(!show())
          }}
          aria-expanded={show()}
          aria-controls={regionId}
          {...getStyles('control')}
        >
          {spoilerMoreContent()}
        </Anchor>
      </Show>
      <Box component='div'
        {...getStyles('content', {
          style: { 'max-height': !show() ? rem(local.maxHeight) : height() ? rem(height()) : undefined },
        })}
        data-reduce-motion
        role="region"
        id={regionId}
      >
        <div ref={contentRef}>{local.children}</div>
      </Box>
    </Box>
  );
});

Spoiler.classes = classes;
Spoiler.displayName = '@empoleon/core/Spoiler';
