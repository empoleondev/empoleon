import { render } from '@empoleon-tests/core';
import { InlineStyles } from './InlineStyles';

describe('@empoleon/core/InlineStyles', () => {
  it('renders styles', () => {
    const { container } = render(() => <InlineStyles selector="body" styles={{ color: 'red' }} />);
    const styleElement = container.querySelector('[data-empoleon-styles="inline"]');
    expect(styleElement).toBeInTheDocument();
    expect(styleElement!.innerHTML).toBe('body{color:red;}');
  });

  it('renders media styles', () => {
    const { container } = render(() => (
      <InlineStyles
        selector="body"
        styles={{ color: 'red' }}
        media={[{ query: '(min-width:500px)', styles: { color: 'blue' } }]}
      />
    ));
    const styleElement = container.querySelector('[data-empoleon-styles="inline"]');
    expect(styleElement).toBeInTheDocument();
    expect(styleElement!.innerHTML).toBe(
      'body{color:red;}@media(min-width:500px){body{color:blue;}}'
    );
  });

  it('renders container styles', () => {
    const { container } = render(() => (
      <InlineStyles
        selector="body"
        styles={{ color: 'red' }}
        container={[{ query: 'aside (min-width:500px)', styles: { color: 'blue' } }]}
      />
    ));
    const styleElement = container.querySelector('[data-empoleon-styles="inline"]');
    expect(styleElement).toBeInTheDocument();
    expect(styleElement!.innerHTML).toBe(
      'body{color:red;}@container aside (min-width:500px){body{color:blue;}}'
    );
  });
});
