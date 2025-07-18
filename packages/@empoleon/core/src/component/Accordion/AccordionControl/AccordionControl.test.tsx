import { createContextContainer, tests } from '@empoleon-tests/core';
import { Accordion } from '../Accordion';
import { AccordionItem } from '../AccordionItem/AccordionItem';
import {
  AccordionControl,
  AccordionControlProps,
  AccordionControlStylesNames,
} from './AccordionControl';

const defaultProps: AccordionControlProps = {
  icon: '$',
};

const _ContextContainer = createContextContainer(AccordionControl, AccordionItem, {
  value: 'test',
});
const ContextContainer = createContextContainer(_ContextContainer, Accordion, {});

describe('@empoleon/core/AccordionControl', () => {
  tests.itSupportsSystemProps<AccordionControlProps, AccordionControlStylesNames>({
    component: ContextContainer,
    props: defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLButtonElement,
    displayName: '@empoleon/core/AccordionControl',
    stylesApiSelectors: ['control', 'chevron', 'label', 'icon'],
    stylesApiName: 'Accordion',
    selector: '.empoleon-Accordion-control',
    providerStylesApi: false,
    compound: true,
  });

  tests.itThrowsContextError(
    {
      component: AccordionControl,
      props: defaultProps,
      error: 'Accordion.Item component was not found in the tree',
    },
    'throws error when rendered outside of Accordion.Item context'
  );

  tests.itThrowsContextError(
    {
      component: _ContextContainer,
      props: defaultProps,
      error: 'Accordion component was not found in the tree',
    },
    'throws error when rendered outside of Accordion context'
  );
});
