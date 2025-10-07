import { onMount, splitProps } from 'solid-js';
import {
  Box,
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

export const AccordionPanel = factory<AccordionPanelFactory>((_props) => {
  const props = useProps('AccordionPanel', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'children',
    'ref',
    'onTransitionEnd',
  ]);

  const { value } = useAccordionItemContext();
  const ctx = useAccordionContext();

  const active = () => ctx.isItemActive(value);

  // Handle resize events from nested accordions
  const handleCollapseResize = (event: CustomEvent) => {
    // Stop propagation to prevent infinite loops
    event.stopPropagation();

    // Dispatch a new event for parent accordions to catch
    setTimeout(() => {
      const parentEvent = new CustomEvent('nested-accordion-resize', {
        detail: {
          source: value,
          newHeight: event.detail.newHeight,
        },
        bubbles: true,
      });

      if (local.ref) {
        local.ref.dispatchEvent(parentEvent);
      }
    }, 20);
  };

  onMount(() => {
    // Listen for resize events from nested content
    setTimeout(() => {
      const element = typeof local.ref === 'function' ? local.ref() : local.ref;

      if (element && typeof element.addEventListener === 'function') {
        element.addEventListener('collapse-resize', handleCollapseResize);
        element.addEventListener('nested-accordion-resize', handleCollapseResize);
      }
    }, 0);
  });

  return (
    <>
      <Collapse
        ref={local.ref}
        {...ctx.getStyles('panel', {
          className: local.className,
          classNames: local.classNames,
          style: local.style,
          styles: local.styles,
        })}
        {...others}
        in={active()}
        transitionDuration={ctx.transitionDuration()}
        keepMounted={false}
        role="region"
        id={ctx.getRegionId(value)}
        aria-labelledby={ctx.getControlId(value)}
        onTransitionEnd={() => {
          local.onTransitionEnd?.();
        }}
      >
        <Box
          component="div"
          {...ctx.getStyles('content', {
            classNames: local.classNames,
            styles: local.styles,
          })}
        >
          {local.children}
        </Box>
      </Collapse>
    </>
  );
});

AccordionPanel.displayName = '@empoleon/core/AccordionPanel';
AccordionPanel.classes = classes;
