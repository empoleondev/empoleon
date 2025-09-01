import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '@empoleon/core';
import { useRichTextEditorContext } from '../RichTextEditor.context';
import classes from '../RichTextEditor.module.css';
import { splitProps } from 'solid-js';

export type RichTextEditorControlsGroupStylesNames = 'controlsGroup';
export interface RichTextEditorControlsGroupProps
  extends BoxProps,
    CompoundStylesApiProps<RichTextEditorControlsGroupFactory>,
    ElementProps<'div'> {}

export type RichTextEditorControlsGroupFactory = Factory<{
  props: RichTextEditorControlsGroupProps;
  ref: HTMLDivElement;
  stylesNames: RichTextEditorControlsGroupStylesNames;
  compound: true;
}>;

export const RichTextEditorControlsGroup = factory<RichTextEditorControlsGroupFactory>(_props => {
  const props = useProps('RichTextEditorControlsGroup', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'variant',
    'ref'
  ]);
  const ctx = useRichTextEditorContext();
  return (
    <Box
      ref={local.ref}
      variant={local.variant || ctx.variant}
      {...ctx.getStyles('controlsGroup', { className: local.className, style: local.style, styles: local.styles, classNames: local.classNames })}
      {...others}
    />
  );
});

RichTextEditorControlsGroup.classes = classes;
RichTextEditorControlsGroup.displayName = '@empoleon/tiptap/RichTextEditorControlsGroup';
