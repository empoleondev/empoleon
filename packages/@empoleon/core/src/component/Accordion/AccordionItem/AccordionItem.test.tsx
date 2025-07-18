import { createContextContainer, tests } from '@empoleon-tests/core';
import { Accordion } from '../Accordion';
import { AccordionItem, AccordionItemProps, AccordionItemStylesNames } from './AccordionItem';

const defaultProps: AccordionItemProps = {
  value: 'test',
};

const ContextContainer = createContextContainer(AccordionItem, Accordion, {});

describe('@empoleon/core/AccordionItem', () => {
  tests.itSupportsSystemProps<AccordionItemProps, AccordionItemStylesNames>({
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
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/AccordionItem',
    stylesApiSelectors: ['item'],
    stylesApiName: 'Accordion',
    selector: '.empoleon-Accordion-item',
    providerStylesApi: false,
    compound: true,
  });

  tests.itThrowsContextError({
    component: AccordionItem,
    props: defaultProps,
    error: 'Accordion component was not found in the tree',
  });
});
