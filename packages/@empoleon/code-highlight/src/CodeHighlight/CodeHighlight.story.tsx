import { IconBrandCodesandbox } from '@tabler/icons-solidjs';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { createEffect, createSignal, JSX } from 'solid-js';
import { EmpoleonProvider, useEmpoleonColorScheme } from '@empoleon/core';
import { getCodeFileIcon } from '@empoleonx/dev-icons';
import { createHighlightJsAdapter } from '../CodeHighlightProvider/adapters/highlight-js-adapter';
import { createShikiAdapter } from '../CodeHighlightProvider/adapters/shiki-adapter';
import {
  CodeHighlightAdapterProvider,
  CodeHighlightProvider,
} from '../CodeHighlightProvider/CodeHighlightProvider';
import { CodeHighlightTabs } from '../CodeHighlightTabs/CodeHighlightTabs';
import { CodeHighlight } from './CodeHighlight';
import { InlineCodeHighlight } from './InlineCodeHighlight';

const shikiAdapter = createShikiAdapter();

function ColorSchemeWrapper(props: { children: JSX.Element; globals: any }) {
  const { setColorScheme } = useEmpoleonColorScheme();

  createEffect(() => {
    const theme = props.globals?.theme || 'light';
    setColorScheme(theme);
  });

  return <>{props.children}</>;
}

export default {
  title: 'CodeHighlight',
  decorators: [
    (Story: () => JSX.Element, context: any) => (
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        <EmpoleonProvider>
          <ColorSchemeWrapper globals={context.globals}>
            <Story />
          </ColorSchemeWrapper>
        </EmpoleonProvider>
      </CodeHighlightAdapterProvider>
    ),
  ],
};

const tsxCode = `
import { forwardRef } from 'react';
import { Group, Avatar, Text, Select } from '@empoleon/core';

// Data for select
// You can use any data structure you want

const data = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Bender Bending Rodríguez',
    value: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking',
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    label: 'Carol Miller',
    value: 'Carol Miller',
    description: 'One of the richest people on Earth',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    label: 'Homer Simpson',
    value: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    label: 'Spongebob Squarepants',
    value: 'Spongebob Squarepants',
    description: 'Not just a sponge',
  },
];

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

function Demo() {
  return (
    <Select
      label="Choose employee of the month"
      placeholder="Pick one"
      itemComponent={SelectItem}
      data={data}
      searchable
      maxDropdownHeight={400}
      nothingFound="Nobody here"
      filter={(value, item) =>
        item.label.toLowerCase().includes(value.toLowerCase().trim()) ||
        item.description.toLowerCase().includes(value.toLowerCase().trim())
      }
    />
  );
}
`;

const cssCode = `.root {
  --ai-size-xs: rem(18px);
  --ai-size-sm: rem(22px);
  --ai-size-md: rem(28px);
  --ai-size-lg: rem(34px);
  --ai-size-xl: rem(44px);

  --bg: var(--ai-bg);
  --color: var(--ai-color);
  --cursor: pointer;

  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  user-select: none;

  width: var(--ai-size);
  height: var(--ai-size);
  min-width: var(--ai-size);
  min-height: var(--ai-size);
  border-radius: var(--ai-radius);
  background: var(--bg);
  color: var(--color);
  border: var(--ai-bd);
  cursor: var(--cursor);

  @mixin hover {
    &:not([data-loading]):not(:disabled):not([data-disabled]) {
      --bg: var(--ai-hover);
    }
  }

  @mixin light {
    --loading-overlay-bg: rgba(255, 255, 255, 0.35);
    --disabled-bg: var(--empoleon-color-gray-1);
    --disabled-color: var(--empoleon-color-gray-5);
  }

  @mixin dark {
    --loading-overlay-bg: rgba(0, 0, 0, 0.35);
    --disabled-bg: var(--empoleon-color-dark-6);
    --disabled-color: var(--empoleon-color-dark-3);
  }

  &[data-loading] {
    --cursor: not-allowed;

    &::before {
      content: '';
      position: absolute;
      inset: rem(-1px);
      border-radius: var(--ai-radius);
      background-color: var(--loading-overlay_bg);
    }
  }

  &:disabled:not([data-loading]),
  &[data-disabled]:not([data-loading]) {
    --cursor: not-allowed;
    --bg: var(--disabled-bg);
    --color: var(--disabled-color);
  }
}

.loader {
  z-index: 1;
}
`;

const htmlCode = `<button>test-button</button>`;

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <CodeHighlight
        code={tsxCode}
        withExpandButton
        defaultExpanded={false}
        radius="md"
        withBorder
      />
    </div>
  );
}
export function HTMLCode() {
  return (
    <div style={{ padding: '40px' }}>
      <CodeHighlight code={htmlCode} radius="md" withBorder />
    </div>
  );
}

export function ShikiAdapter() {
  return (
    <div style={{ padding: '40px' }}>
      <CodeHighlightProvider adapter={shikiAdapter}>
        <CodeHighlight
          code={tsxCode}
          withExpandButton
          defaultExpanded={false}
          radius="md"
          withBorder
          language="tsx"
        />
      </CodeHighlightProvider>
    </div>
  );
}

const highlightJSAdapter = createHighlightJsAdapter(hljs);

export function HighlightJsAdapter() {
  return (
    <div style={{ padding: '40px' }}>
      <CodeHighlightAdapterProvider adapter={highlightJSAdapter}>
        <CodeHighlight
          code={tsxCode}
          withExpandButton
          defaultExpanded={false}
          radius="md"
          withBorder
          language="tsx"
          background="var(--empoleon-color-dark-8)"
          codeColorScheme="dark"
        />
      </CodeHighlightAdapterProvider>
    </div>
  );
}

export function ExtraControls() {
  return (
    <div style={{ padding: '40px' }}>
      <CodeHighlight
        code={tsxCode}
        withExpandButton
        defaultExpanded={false}
        radius="md"
        withBorder
        controls={() => [
          <CodeHighlight.Control
            tooltipLabel="Open in codesandbox"
            component="a"
            href="https://codesandbox.io"
            target="_blank"
          >
            <IconBrandCodesandbox />
          </CodeHighlight.Control>,
        ]}
      />
    </div>
  );
}

export function Tabs() {
  const code = [
    { fileName: 'Component.tsx', code: tsxCode, language: 'tsx' },
    { fileName: 'Component.module.css', code: cssCode, language: 'scss' },
    {
      fileName: 'Long-file-name-that-will-break-to-another-line.css',
      code: cssCode,
      language: 'scss',
    },
  ];
  const [numberOfTabs, setNumberOfTabs] = createSignal(code.length);

  return (
    <div style={{ padding: '40px' }}>
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          getFileIcon={getCodeFileIcon}
          code={code.slice(0, numberOfTabs())}
        />
      </CodeHighlightAdapterProvider>

      <button onClick={() => setNumberOfTabs((val) => val - 1)}>Remove tab</button>
      <button onClick={() => setNumberOfTabs((val) => val + 1)}>Add tab</button>
    </div>
  );
}

export function TabsWithColorScheme() {
  return (
    <div style={{ padding: '40px' }}>
      <CodeHighlightAdapterProvider adapter={highlightJSAdapter}>
        <CodeHighlightTabs
          withExpandButton
          defaultExpanded={false}
          radius="md"
          getFileIcon={getCodeFileIcon}
          codeColorScheme="dark"
          background="var(--empoleon-color-dark-8)"
          code={[
            { fileName: 'Component.tsx', code: tsxCode, language: 'tsx' },
            { fileName: 'Component.module.css', code: cssCode, language: 'scss' },
          ]}
        />
      </CodeHighlightAdapterProvider>
    </div>
  );
}

export function Inline() {
  return (
    <div style={{ padding: '40px' }}>
      <CodeHighlightAdapterProvider adapter={shikiAdapter}>
        <p>
          Here is some text <InlineCodeHighlight code="const a = 5;" language="tsx" withBorder />{' '}
          surrounding the code
        </p>
      </CodeHighlightAdapterProvider>
    </div>
  );
}
