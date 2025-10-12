import { Component, createMemo, JSX, splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  UnstyledButton,
  useProps,
} from '@empoleon/core';
import { RichTextEditorLabels } from '../labels';
import { useRichTextEditorContext } from '../RichTextEditor.context';
import classes from '../RichTextEditor.module.css';

export type RichTextEditorControlStylesNames = 'control';

export interface RichTextEditorControlProps
  extends BoxProps,
    CompoundStylesApiProps<RichTextEditorControlFactory>,
    ElementProps<'button'> {
  /** Determines whether the control should have active state, false by default */
  active?: boolean;

  /** Determines whether the control can be interacted with, set `false` to make the control to act as a label */
  interactive?: boolean;
}

export type RichTextEditorControlFactory = Factory<{
  props: RichTextEditorControlProps;
  ref: HTMLButtonElement;
  stylesNames: RichTextEditorControlStylesNames;
  compound: true;
}>;

const defaultProps = {
  interactive: true,
} satisfies Partial<RichTextEditorControlProps>;

export const RichTextEditorControl = factory<RichTextEditorControlFactory>((_props) => {
  const props = useProps('RichTextEditorControl', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'interactive',
    'active',
    'onMouseDown',
    'disabled',
    'ref',
  ]);

  const ctx = useRichTextEditorContext();

  return (
    <UnstyledButton
      {...others}
      {...ctx.getStyles('control', {
        className: local.className,
        style: local.style,
        classNames: local.classNames,
        styles: local.styles,
      })}
      disabled={local.disabled}
      data-rich-text-editor-control
      tabIndex={local.interactive ? 0 : -1}
      data-interactive={local.interactive || undefined}
      data-disabled={local.disabled || undefined}
      data-active={local.active || undefined}
      aria-pressed={(local.active && local.interactive) || undefined}
      aria-hidden={!local.interactive || undefined}
      ref={local.ref}
      unstyled={ctx.unstyled}
      variant={ctx.variant || 'default'}
      onMouseDown={(event) => {
        event.preventDefault();
        typeof local.onMouseDown === 'function' && local.onMouseDown?.(event);
      }}
    />
  );
});

RichTextEditorControl.classes = classes;
RichTextEditorControl.displayName = '@empoleon/tiptap/RichTextEditorControl';

export interface RichTextEditorControlBaseProps extends RichTextEditorControlProps {
  icon?: Component<{ style: JSX.CSSProperties }>;
}

export const RichTextEditorControlBase = (props: RichTextEditorControlBaseProps) => {
  const [local, others] = splitProps(props, ['className', 'icon']);
  const ctx = useRichTextEditorContext();

  return (
    <RichTextEditorControl {...others}>
      {/* @ts-ignore */}
      <Dynamic component={local.icon} {...ctx.getStyles('controlIcon')} />
    </RichTextEditorControl>
  );
};

RichTextEditorControlBase.displayName = '@empoleon/tiptap/RichTextEditorControlBase';

export interface CreateControlProps {
  label: keyof RichTextEditorLabels;
  icon: Component<{ style: JSX.CSSProperties }>;
  isActive?: { name: string; attributes?: Record<string, any> | string };
  isDisabled?: (editor: any) => boolean;
  operation: { name: string; attributes?: Record<string, any> | string };
}

export function createControl(config: CreateControlProps) {
  const Control = (props: RichTextEditorControlBaseProps) => {
    const context = useRichTextEditorContext();
    const _label = () => context.labels[config.label] as string;

    const active = createMemo(() =>
      config.isActive?.name
        ? context.editor?.isActive(config.isActive.name, config.isActive.attributes)
        : false
    );

    const disabled = createMemo(() => config.isDisabled?.(context.editor) || false);

    /* eslint-disable no-unexpected-multiline */
    const handleClick = () => {
      (context.editor as any)
        ?.chain()
        .focus()
        [config.operation.name](config.operation.attributes)
        .run();
    };
    /* eslint-enable no-unexpected-multiline */

    return (
      <RichTextEditorControlBase
        {...props}
        aria-label={_label()}
        title={_label()}
        active={active()}
        onClick={handleClick}
        icon={props.icon || config.icon}
        disabled={disabled()}
      />
    );
  };

  // SolidJS doesn't have displayName, but you can add it as a property if needed
  Control.displayName = `@empoleon/tiptap/${config.label}`;

  return Control;
}
