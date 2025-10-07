import { createSignal } from 'solid-js';
import { FloatingIndicator, Tabs } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './FloatingIndicator.demo.tabs.module.css';

const cssCode = `
.list {
  position: relative;
  margin-bottom: var(--empoleon-spacing-md);
}

.indicator {
  background-color: var(--empoleon-color-white);
  border-radius: var(--empoleon-radius-md);
  border: 1px solid var(--empoleon-color-gray-2);
  box-shadow: var(--empoleon-shadow-sm);

  @mixin dark {
    background-color: var(--empoleon-color-dark-6);
    border-color: var(--empoleon-color-dark-4);
  }
}

.tab {
  z-index: 1;
  font-weight: 500;
  transition: color 100ms ease;
  color: var(--empoleon-color-gray-7);

  &[data-active] {
    color: var(--empoleon-color-black);
  }

  @mixin dark {
    color: var(--empoleon-color-dark-1);

    &[data-active] {
      color: var(--empoleon-color-white);
    }
  }
}
`;

const code = `
import { createSignal } from 'solid-js';
import { FloatingIndicator, Tabs } from '@empoleon/core';
import classes from './Demo.module.css';

function Demo() {
  const [rootRef, setRootRef] = createSignal<HTMLDivElement | null>(null);
  const [value, setValue] = createSignal<string>('1');
  const [controlsRefs, setControlsRefs] = createSignal<Record<string, HTMLButtonElement | null>>({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs()[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs variant="none" value={value()} onChange={setValue}>
      <Tabs.List ref={setRootRef} className={classes.list}>
        <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
          First tab
        </Tabs.Tab>
        <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
          Second tab
        </Tabs.Tab>
        <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
          Third tab
        </Tabs.Tab>

        <FloatingIndicator
          target={value() ? controlsRefs()[value()] : null}
          parent={rootRef()}
          className={classes.indicator}
        />
      </Tabs.List>

      <Tabs.Panel value="1">First tab content</Tabs.Panel>
      <Tabs.Panel value="2">Second tab content</Tabs.Panel>
      <Tabs.Panel value="3">Third tab content</Tabs.Panel>
    </Tabs>
  );
}
`;

function Demo() {
  const [rootRef, setRootRef] = createSignal<HTMLDivElement | null>(null);
  const [value, setValue] = createSignal<string>('1');
  const [controlsRefs, setControlsRefs] = createSignal<Record<string, HTMLButtonElement | null>>(
    {}
  );
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs()[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs variant="none" value={value()} onChange={setValue}>
      <Tabs.List ref={setRootRef} className={classes.list}>
        <Tabs.Tab value="1" ref={setControlRef('1')} className={classes.tab}>
          First tab
        </Tabs.Tab>
        <Tabs.Tab value="2" ref={setControlRef('2')} className={classes.tab}>
          Second tab
        </Tabs.Tab>
        <Tabs.Tab value="3" ref={setControlRef('3')} className={classes.tab}>
          Third tab
        </Tabs.Tab>

        <FloatingIndicator
          target={value() ? controlsRefs()[value()] : null}
          parent={rootRef()}
          className={classes.indicator}
        />
      </Tabs.List>

      <Tabs.Panel value="1">First tab content</Tabs.Panel>
      <Tabs.Panel value="2">Second tab content</Tabs.Panel>
      <Tabs.Panel value="3">Third tab content</Tabs.Panel>
    </Tabs>
  );
}

export const tabs: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
  ],
};
