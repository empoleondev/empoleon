import { Component, createEffect, createMemo, JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  createScopedKeydownHandler,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '../../../core';
import { UnstyledButton } from '../../UnstyledButton';
import { useAccordionContext } from '../Accordion.context';
import { useAccordionItemContext } from '../AccordionItem.context';
import classes from '../Accordion.module.css';
import { Dynamic } from 'solid-js/web';

export type AccordionControlStylesNames = 'control' | 'chevron' | 'label' | 'itemTitle' | 'icon';

export interface AccordionControlProps
  extends BoxProps,
    CompoundStylesApiProps<AccordionControlFactory>,
    ElementProps<'button'> {
  /** Disables control button */
  disabled?: boolean;

  /** Custom chevron icon */
  chevron?: JSX.Element;

  /** Control label */
  children?: JSX.Element;

  /** Icon displayed next to the label */
  icon?: JSX.Element;
}

export type AccordionControlFactory = Factory<{
  props: AccordionControlProps;
  ref: HTMLButtonElement;
  stylesNames: AccordionControlStylesNames;
  compound: true;
}>;

const defaultProps: Partial<AccordionControlProps> = {};

export const AccordionControl = factory<AccordionControlFactory>(_props => {
  const props = useProps('AccordionControl', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'chevron',
    'icon',
    'onClick',
    'onKeyDown',
    'children',
    'disabled',
    'mod',
    'ref'
  ]);

  const { value } = useAccordionItemContext();
  const ctx = useAccordionContext();
  const isActive = () => ctx.isItemActive(value);
  const shouldWrapWithHeading = typeof ctx.order === 'number';
  const headingTag = `h${ctx.order!}` as const;
  const raw = local.chevron || ctx.chevron;
  const Chevron = typeof raw === 'function' ? raw : () => raw as JSX.Element;

  const content = (
    <UnstyledButton<'button'>
      {...others}
      {...ctx.getStyles('control', { className: local.className, classNames: local.classNames, style: local.style, styles: local.styles, variant: ctx.variant() })}
      unstyled={ctx.unstyled}
      mod={[
        'accordion-control',
        { active: isActive(), 'chevron-position': ctx.chevronPosition(), disabled: local.disabled },
        local.mod,
      ]}
      ref={local.ref}
      onClick={(event: MouseEvent & {
        currentTarget: HTMLButtonElement;
        target: Element;
      }) => {
        typeof local.onClick === "function" && local.onClick?.(event);
        ctx.onChange(value);
      }}
      type="button"
      disabled={local.disabled}
      aria-expanded={isActive()}
      aria-controls={ctx.getRegionId(value)}
      id={ctx.getControlId(value)}
      onKeyDown={createScopedKeydownHandler({
        siblingSelector: '[data-accordion-control]',
        parentSelector: '[data-accordion]',
        activateOnFocus: false,
        loop: ctx.loop,
        orientation: 'vertical',
        onKeyDown: (event) => {
          typeof local.onKeyDown === "function" && local.onKeyDown(event as KeyboardEvent & { currentTarget: HTMLButtonElement; target: Element });
        },
      })}
    >
      <Box
        component="span"
        mod={{ rotate: !ctx.disableChevronRotation() && isActive(), position: ctx.chevronPosition() }}
        {...ctx.getStyles('chevron', { classNames: local.classNames, styles: local.styles  })}
      >
        <Chevron />
      </Box>
      <span {...ctx.getStyles('label', { classNames: local.classNames, styles: local.styles })}>{local.children}</span>
      {local.icon && (
        <Box
          component="span"
          mod={{ 'chevron-position': ctx.chevronPosition() }}
          {...ctx.getStyles('icon', { classNames: local.classNames, styles: local.styles })}
        >
          {local.icon}
        </Box>
      )}
    </UnstyledButton>
  );

  return shouldWrapWithHeading ? (
    <Dynamic component={headingTag} {...ctx.getStyles('itemTitle', { classNames: local.classNames, styles: local.styles })}>{content}</Dynamic>
  ) : (
    content
  );
});

AccordionControl.displayName = '@empoleon/core/AccordionControl';
AccordionControl.classes = classes;
