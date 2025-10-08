import { waitFor } from '@solidjs/testing-library';
import { render, tests } from '@empoleon-tests/core';
import { Card, CardProps, CardSection, CardStylesNames } from './Card';

describe('@empoleon/core/Card', () => {
  tests.itSupportsSystemProps<CardProps, CardStylesNames>({
    component: Card,
    props: () => ({
      children: () => <Card.Section />,
    }),
    mod: true,
    polymorphic: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/Card',
    stylesApiSelectors: ['root', 'section'],
  });

  it('sets data-fist-section and data-last-section props to first and last Card.Section components', async () => {
    const { container } = render(() => (
      <Card>
        <Card.Section />
        <div>Content</div>
        <Card.Section />
        <div>Content</div>
        <Card.Section />
      </Card>
    ));

    const sections = container.querySelectorAll('.empoleon-Card-section');

    await waitFor(() => {
      expect(sections[0]).toHaveAttribute('data-first-section');
      expect(sections[0]).not.toHaveAttribute('data-last-section');

      expect(sections[1]).not.toHaveAttribute('data-first-section');
      expect(sections[1]).not.toHaveAttribute('data-last-section');

      expect(sections[2]).not.toHaveAttribute('data-first-section');
      expect(sections[2]).toHaveAttribute('data-last-section');
    });
  });

  it('exports Card.Section component', () => {
    expect(Card.Section).toBe(CardSection);
  });
});
