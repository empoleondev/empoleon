import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { Card } from './Card';

export default {
  title: 'Card',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <div style={{ 'max-width': '400px', padding: '40px', margin: 'auto' }}>
      <Card withBorder>
        <Card.Section inheritPadding py="md" withBorder>
          Card section 1
        </Card.Section>
        <div>Content 1</div>
        <Card.Section inheritPadding withBorder>
          Card section 2
        </Card.Section>
        <div>Content 2</div>
        <Card.Section inheritPadding withBorder>
          Card section 3
        </Card.Section>

        <Card.Section inheritPadding withBorder>
          Card section 4
        </Card.Section>
      </Card>
    </div>
  );
}

export function CustomComponent() {
  return (
    <div style={{ 'max-width': '400px', padding: '40px', margin: 'auto' }}>
      <Card withBorder component="a" href="https://empoleon.dev">
        <Card.Section bg="blue">Card section 1</Card.Section>
        <Card.Section component="button">Card section 2</Card.Section>
        <div>Content</div>
        <Card.Section bg="red">Card section 3</Card.Section>
      </Card>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'max-width': '400px', padding: '40px', margin: 'auto' }}>
      <Card withBorder unstyled>
        <Card.Section inheritPadding py="md" withBorder>
          Card section 1
        </Card.Section>
        <div>Content 1</div>
        <Card.Section inheritPadding withBorder>
          Card section 2
        </Card.Section>
        <div>Content 2</div>
        <Card.Section inheritPadding withBorder>
          Card section 3
        </Card.Section>

        <Card.Section inheritPadding withBorder>
          Card section 4
        </Card.Section>
      </Card>
    </div>
  );
}
