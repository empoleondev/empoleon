import { JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  rem,
  useProps,
} from '@empoleon/core';
import { useRichTextEditorContext } from '../RichTextEditor.context';
import classes from '../RichTextEditor.module.css';

export type RichTextEditorToolbarStylesNames = 'toolbar';

export interface RichTextEditorToolbarProps
  extends BoxProps,
    CompoundStylesApiProps<RichTextEditorToolbarFactory>,
    ElementProps<'div'> {
  /** Determines whether `position: sticky` styles should be added to the toolbar, `false` by default */
  sticky?: boolean;

  /** Sets top style to offset elements with fixed position, `0` by default */
  stickyOffset?: JSX.CSSProperties['top'];
}

export type RichTextEditorToolbarFactory = Factory<{
  props: RichTextEditorToolbarProps;
  ref: HTMLDivElement;
  stylesNames: RichTextEditorToolbarStylesNames;
  compound: true;
}>;

const defaultProps: Partial<RichTextEditorToolbarProps> = {};

export const RichTextEditorToolbar = factory<RichTextEditorToolbarFactory>(_props => {
  const props = useProps('RichTextEditorToolbar', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'sticky',
    'stickyOffset',
    'mod',
    'variant',
    'ref'
  ]);
  const ctx = useRichTextEditorContext();

  return (
    <Box
      ref={local.ref}
      mod={[{ sticky: local.sticky }, local.mod]}
      variant={local.variant || ctx.variant}
      {...ctx.getStyles('toolbar', { className: local.className, style: local.style, styles: local.styles, classNames: local.classNames })}
      {...others}
      __vars={{ '--rte-sticky-offset': rem(local.stickyOffset) }}
    />
  );
});

RichTextEditorToolbar.classes = classes;
RichTextEditorToolbar.displayName = '@empoleon/tiptap/RichTextEditorToolbar';
