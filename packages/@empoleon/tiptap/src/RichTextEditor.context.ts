import { Editor } from '@empoleon/solid-tiptap';
import { createSafeContext, GetStylesApi } from '@empoleon/core';
import { RichTextEditorLabels } from './labels';
import type { RichTextEditorFactory } from './RichTextEditor';

interface RichTextEditorContext {
  getStyles: GetStylesApi<RichTextEditorFactory>;
  editor: Editor | null;
  labels: RichTextEditorLabels;
  withCodeHighlightStyles: boolean | undefined;
  withTypographyStyles: boolean | undefined;
  unstyled: boolean | undefined;
  variant: string | undefined;
  onSourceCodeTextSwitch?: (isSourceCodeModeActive: boolean) => void;
}

export const [RichTextEditorProvider, useRichTextEditorContext] =
  createSafeContext<RichTextEditorContext>('RichTextEditor component was not found in tree');
