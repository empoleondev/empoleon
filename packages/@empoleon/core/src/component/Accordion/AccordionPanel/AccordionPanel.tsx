import {
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '../../../core';
import { Collapse } from '../../Collapse';
import { useAccordionContext } from '../Accordion.context';
import { useAccordionItemContext } from '../AccordionItem.context';
import classes from '../Accordion.module.css';
import { splitProps } from 'solid-js';

export type AccordionPanelStylesNames = 'panel' | 'content';

export interface AccordionPanelProps
  extends BoxProps,
    CompoundStylesApiProps<AccordionPanelFactory>,
    ElementProps<'div'> {
  /** Called when the panel animation completes */
  onTransitionEnd?: () => void;
}

export type AccordionPanelFactory = Factory<{
  props: AccordionPanelProps;
  ref: HTMLDivElement;
  stylesNames: AccordionPanelStylesNames;
  compound: true;
}>;

const defaultProps: Partial<AccordionPanelProps> = {};

export const AccordionPanel = factory<AccordionPanelFactory>(_props => {
  const props = useProps('AccordionPanel', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'children',
    'ref'
  ]);

  const { value } = useAccordionItemContext();
  const ctx = useAccordionContext();

  return (
    <Collapse
      ref={local.ref}
      {...ctx.getStyles('panel', { className: local.className, classNames: local.classNames, style: local.style, styles: local.styles })}
      {...others}
      in={ctx.isItemActive(value)}
      transitionDuration={ctx.transitionDuration ?? 200}
      role="region"
      id={ctx.getRegionId(value)}
      aria-labelledby={ctx.getControlId(value)}
    >
      <div {...ctx.getStyles('content', { classNames: local.classNames, styles: local.styles })}>{local.children}</div>
    </Collapse>
  );
});

AccordionPanel.displayName = '@empoleon/core/AccordionPanel';
AccordionPanel.classes = classes;
