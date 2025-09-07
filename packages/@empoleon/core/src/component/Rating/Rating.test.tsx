import { tests } from '@empoleon-tests/core';
import { Rating, RatingProps, RatingStylesNames } from './Rating';

const defaultProps: RatingProps = {};

describe('@empoleon/core/Rating', () => {
  tests.itSupportsSystemProps<RatingProps, RatingStylesNames>({
    component: Rating,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/Rating',
    stylesApiSelectors: ['root', 'starSymbol', 'input', 'label', 'symbolBody', 'symbolGroup'],
  });
});
