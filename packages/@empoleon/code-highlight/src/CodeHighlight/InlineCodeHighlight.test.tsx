import { tests } from '@empoleon-tests/core';
import {
  InlineCodeHighlight,
  InlineCodeHighlightProps,
  InlineCodeHighlightStylesNames,
} from './InlineCodeHighlight';

const defaultProps: InlineCodeHighlightProps = {
  code: 'const a = 5',
  language: 'tsx',
};

describe('@empoleon/code-highlight/InlineCodeHighlight', () => {
  tests.itSupportsSystemProps<InlineCodeHighlightProps, InlineCodeHighlightStylesNames>({
    component: InlineCodeHighlight,
    props: defaultProps,
    polymorphic: true,
    styleProps: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLElement,
    selector: '.empoleon-InlineCodeHighlight-inlineCodeHighlight',
    displayName: '@empoleon/code-highlight/InlineCodeHighlight',
    stylesApiSelectors: ['inlineCodeHighlight'],
  });
});
