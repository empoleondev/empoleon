// import {
//   BoxProps,
//   CompoundStylesApiProps,
//   ElementProps,
//   factory,
//   Factory,
//   useProps,
// } from '../../../core';
// import { Collapse } from '../../Collapse';
// import { useAccordionContext } from '../Accordion.context';
// import { useAccordionItemContext } from '../AccordionItem.context';
// import classes from '../Accordion.module.css';
// import { createEffect, splitProps } from 'solid-js';

// export type AccordionPanelStylesNames = 'panel' | 'content';

// export interface AccordionPanelProps
//   extends BoxProps,
//     CompoundStylesApiProps<AccordionPanelFactory>,
//     ElementProps<'div'> {
//   /** Called when the panel animation completes */
//   onTransitionEnd?: () => void;
// }

// export type AccordionPanelFactory = Factory<{
//   props: AccordionPanelProps;
//   ref: HTMLDivElement;
//   stylesNames: AccordionPanelStylesNames;
//   compound: true;
// }>;

// const defaultProps: Partial<AccordionPanelProps> = {};

// export const AccordionPanel = factory<AccordionPanelFactory>(_props => {
//   const props = useProps('AccordionPanel', defaultProps, _props);
//   const [local, others] = splitProps(props, [
//     'classNames',
//     'className',
//     'style',
//     'styles',
//     'vars',
//     'children',
//     'ref'
//   ]);

//   const { value } = useAccordionItemContext();
//   const ctx = useAccordionContext();

//   const active = () => ctx.isItemActive(value);

//   return (
//     <Collapse
//       ref={local.ref}
//       {...ctx.getStyles('panel', { className: local.className, classNames: local.classNames, style: local.style, styles: local.styles })}
//       {...others}
//       in={active()}
//       transitionDuration={ctx.transitionDuration ?? 200}
//       role="region"
//       id={ctx.getRegionId(value)}
//       aria-labelledby={ctx.getControlId(value)}
//     >
//       <div {...ctx.getStyles('content', { classNames: local.classNames, styles: local.styles })}>{local.children}</div>
//     </Collapse>
//   );
// });

// AccordionPanel.displayName = '@empoleon/core/AccordionPanel';
// AccordionPanel.classes = classes;

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
import { createEffect, createSignal, onMount, splitProps } from 'solid-js';

export type AccordionPanelStylesNames = 'panel' | 'content';

export interface AccordionPanelProps
  extends BoxProps,
    CompoundStylesApiProps<AccordionPanelFactory>,
    ElementProps<'div'> {
  /** Called when the panel animation completes */
  onTransitionEnd?: () => void;

  /** Enable debug mode */
  debug?: boolean;
}

export type AccordionPanelFactory = Factory<{
  props: AccordionPanelProps;
  ref: HTMLDivElement;
  stylesNames: AccordionPanelStylesNames;
  compound: true;
}>;

const defaultProps: Partial<AccordionPanelProps> = {
  debug: false,
};

export const AccordionPanel = factory<AccordionPanelFactory>(_props => {
  const props = useProps('AccordionPanel', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'children',
    'ref',
    'debug',
    'onTransitionEnd'
  ]);

  const { value } = useAccordionItemContext();
  const ctx = useAccordionContext();

  const active = () => ctx.isItemActive(value);
  const [debugLog, setDebugLog] = createSignal('');

  const log = (message: string, data?: any) => {
    if (local.debug) {
      const timestamp = new Date().toISOString().split('T')[1].slice(0, -1);
      const logMessage = `[${timestamp}] Panel(${value}): ${message}`;
      console.log(logMessage, data || '');
      setDebugLog(prev => prev + '\n' + logMessage);
    }
  };

  // Track when the panel becomes active/inactive
  createEffect(() => {
    log(`Panel active state changed: ${active()}`);
  });

  // Handle resize events from nested accordions
  const handleCollapseResize = (event: CustomEvent) => {
    log('Received collapse-resize event', event.detail);

    // Stop propagation to prevent infinite loops
    event.stopPropagation();

    // Dispatch a new event for parent accordions to catch
    setTimeout(() => {
      const parentEvent = new CustomEvent('nested-accordion-resize', {
        detail: {
          source: value,
          newHeight: event.detail.newHeight
        },
        bubbles: true
      });

      if (local.ref) {
        local.ref.dispatchEvent(parentEvent);
        log('Dispatched nested-accordion-resize event');
      }
    }, 20);
  };

  onMount(() => {
    log('AccordionPanel mounted');

    // Listen for resize events from nested content
    if (local.ref) {
      local.ref.addEventListener('collapse-resize', handleCollapseResize);
      local.ref.addEventListener('nested-accordion-resize', handleCollapseResize);
    }
  });

  return (
    <>
      {local.debug && (
        <div style={{
          position: 'fixed',
          top: '220px',
          right: '10px',
          background: 'rgba(0,100,0,0.8)',
          color: 'white',
          padding: '10px',
          'font-size': '10px',
          'max-width': '300px',
          'max-height': '150px',
          overflow: 'auto',
          'z-index': 9998,
          'white-space': 'pre-wrap'
        }}>
          Panel Debug ({value}): {debugLog()}
        </div>
      )}
      <Collapse
        ref={local.ref}
        {...ctx.getStyles('panel', {
          className: local.className,
          classNames: local.classNames,
          style: local.style,
          styles: local.styles
        })}
        {...others}
        in={active()}
        transitionDuration={ctx.transitionDuration ?? 200}
        role="region"
        id={ctx.getRegionId(value)}
        aria-labelledby={ctx.getControlId(value)}
        debug={local.debug}
        onTransitionEnd={() => {
          log('Panel transition ended');
          local.onTransitionEnd?.();
        }}
      >
        <div {...ctx.getStyles('content', {
          classNames: local.classNames,
          styles: local.styles
        })}>
          {local.children}
        </div>
      </Collapse>
    </>
  );
});

AccordionPanel.displayName = '@empoleon/core/AccordionPanel';
AccordionPanel.classes = classes;
