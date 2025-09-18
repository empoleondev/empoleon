import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '../../../core';
import { useAccordionContext } from '../Accordion.context';
import { AccordionItemProvider } from '../AccordionItem.context';
import classes from '../Accordion.module.css';
import { splitProps } from 'solid-js';

export type AccordionItemStylesNames = 'item';

export interface AccordionItemProps
  extends BoxProps,
    CompoundStylesApiProps<AccordionItemFactory>,
    ElementProps<'div'> {
  /** Value that is used to manage accordion state */
  value: string;
}

export type AccordionItemFactory = Factory<{
  props: AccordionItemProps;
  ref: HTMLDivElement;
  stylesNames: AccordionItemStylesNames;
  compound: true;
}>;

const defaultProps: Partial<AccordionItemProps> = {};

export const AccordionItem = factory<AccordionItemFactory>(_props => {
  const props = useProps('AccordionItem', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'value',
    'mod',
    'ref'
  ]);
  const ctx = useAccordionContext();

  return (
    <AccordionItemProvider value={{ value: local.value }}>
      <Box
        ref={local.ref}
        mod={[{ active: ctx.isItemActive(local.value) }, local.mod]}
        {...ctx.getStyles('item', { className: local.className, classNames: local.classNames, styles: local.styles, style: local.style, variant: ctx.variant() })}
        {...others}
      />
    </AccordionItemProvider>
  );
});

AccordionItem.displayName = '@empoleon/core/AccordionItem';
AccordionItem.classes = classes;
