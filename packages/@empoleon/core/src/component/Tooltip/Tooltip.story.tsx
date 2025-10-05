import { Tooltip } from './Tooltip';
import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { createSignal } from 'solid-js';

export default {
  title: 'Tooltip',
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
    <div style={{ padding: '40px' }}>
      <Tooltip
        position="right"
        label="Tooltip label"
        withArrow
        transitionProps={{ duration: 0 }}
        opened
        color="cyan"
        radius="md"
      >
        {(props) => <button type="button" {...props}>target</button>}
      </Tooltip>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: '40px' }}>
      <Tooltip
        position="right"
        label="Tooltip label"
        withArrow
        transitionProps={{ duration: 0 }}
        color="cyan"
        radius="md"
        unstyled
      >
        {(props) => <button type="button" {...props}>target</button>}
      </Tooltip>
    </div>
  );
}

export function Multiline() {
  return (
    <div style={{ padding: '40px' }}>
      <Tooltip
        position="right"
        label="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi, quaerat vero. Tempora reiciendis deserunt tenetur blanditiis velit. Illo, ipsam. Dignissimos fugit tempora iure accusamus, ipsum minima tenetur ex sequi eveniet."
        w={300}
        withArrow
        transitionProps={{ duration: 0 }}
        radius="md"
        multiline
      >
        {(props) => <button type="button" {...props}>target</button>}
      </Tooltip>
    </div>
  );
}

export function MultilineWithJsx() {
  return (
    <div style={{ padding: '40px' }}>
      <Tooltip.Floating
        position="right"
        label={
          <>
            We will attempt to spend the budget according to your allocation for each ad group.{' '}
            <b>Flexible</b> allocation might cause deviation from your specification, but secure
            delivery of the overall budget for the campaign.
            <br />
            <br />
            Allocation is disabled if
            <b> Budget Pacing</b> is turned off for the campaign.
          </>
        }
        w={300}
        // WithArrow
        // TransitionProps={{ duration: 0 }}
        radius="md"
        multiline
      >
        <button type="button">target</button>
      </Tooltip.Floating>
    </div>
  );
}

export const TooltipGroup = () => (
  <Tooltip.Group openDelay={500}>
    <Tooltip label="Tooltip 1">
      {(props) => <button type="button" {...props}>Button 1</button>}
    </Tooltip>
    <Tooltip label="Tooltip 2">
      {(props) => <button type="button" {...props}>Button 2</button>}
    </Tooltip>
    <Tooltip label="Tooltip 3">
      {(props) => <button type="button" {...props}>Button 3</button>}
    </Tooltip>
  </Tooltip.Group>
);

export const Controlled = () => {
  const [opened, setOpened] = createSignal(false);
  return (
    <div style={{ padding: '40px' }}>
      <Tooltip label="Tooltip 1" opened={opened()}>
        {(props) =>
          <button
            type="button"
            onMouseEnter={() => setOpened(true)}
            onMouseLeave={() => setOpened(false)}
            {...props}
          >
            Hover to open both tooltips
          </button>
        }
      </Tooltip>
      <Tooltip label="Tooltip 2" opened={opened()}>
        {(props) => <button type="button" {...props}>Button 2</button>}
      </Tooltip>
    </div>
  );
};

export const Floating = () => (
  <div style={{ padding: 0 }}>
    <Tooltip.Floating label="Tooltip">
      <button type="button" style={{ width: '200px', height: '200px' }}>
        target
      </button>
    </Tooltip.Floating>
  </div>
);

export const Unmount = () => {
  const [mounted, setMounted] = createSignal(true);
  return (
    <div>
      <button type="button" onClick={() => setMounted((c) => !c)}>
        Toggle
      </button>
      <Tooltip opened label="Tooltip">
        {(props) => (
          <button
            type="button"
            style={{ width: '200px', height: '200px', display: mounted() ? 'block' : 'none' }}
            {...props}
          >
            target
          </button>
        )}
      </Tooltip>
    </div>
  );
};

export const HexColor = () => (
  <Tooltip label="Tooltip 2" color="#F0F" keepMounted>
    {(props) => <button {...props} type="button">Button 2</button>}
  </Tooltip>
);

export const WithArrow = () => (
  <Tooltip
    withArrow
    label="Tooltip button with arrow Tooltip button with arrow Tooltip button with arrow"
  >
    {(props) => <button type="button" {...props}>Tooltip button with arrow</button>}
  </Tooltip>
);

export const TooltipAndArrowWithBorder = () => (
  <div style={{ padding: '40px' }}>
    <Tooltip
      opened
      position="right"
      label="Tooltip and arrow with border"
      withArrow
      transitionProps={{ duration: 0 }}
      arrowSize={10}
      styles={{
        tooltip: { border: '4px solid green' },
        arrow: { border: '4px solid green' },
      }}
    >
      {(props) => <button type="button" {...props}>target</button>}
    </Tooltip>
  </div>
);

export const WithArrowRadius = () => (
  <Tooltip
    withArrow
    label="Tooltip button with arrow Tooltip button with arrow Tooltip button with arrow"
    arrowRadius={4}
  >
    {(props) => <button type="button" {...props}>Tooltip button with arrow radius</button>}
  </Tooltip>
);

export function Inline() {
  return (
    <>
      <div style={{ padding: '40px', 'max-width': '400px' }}>
        <b>Via inline prop:</b>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae ipsam in quos aperiam
          magni quas neque{' '}
          <Tooltip label="Inline tooltip" inline>
            {(props) => <span style={{ background: 'pink' }} {...props}>aliquid laboriosam dolorum</span>}
          </Tooltip>
          , eum voluptate, perferendis placeat repudiandae nesciunt explicabo quibusdam deserunt,
          animi dicta.
        </div>
      </div>
      <div style={{ padding: '40px', 'max-width': '400px' }}>
        <b>Via middlewares prop:</b>
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae ipsam in quos aperiam
          magni quas neque{' '}
          <Tooltip label="Inline tooltip" middlewares={{ inline: true }}>
            {(props) => <span style={{ background: 'pink' }} {...props}>aliquid laboriosam dolorum</span>}
          </Tooltip>
          , eum voluptate, perferendis placeat repudiandae nesciunt explicabo quibusdam deserunt,
          animi dicta.
        </div>
      </div>
    </>
  );
}

export function DefaultOpened() {
  return (
    <div style={{ padding: '40px' }}>
      <Tooltip
        position="right"
        label="Tooltip visible by default"
        withArrow
        transitionProps={{ duration: 0 }}
        color="cyan"
        radius="md"
        defaultOpened
      >
        {(props) => <button type="button" {...props}>target</button>}
      </Tooltip>
    </div>
  );
}

export function Fixed() {
  return (
    <div style={{ padding: '40px' }}>
      <Tooltip
        position="right"
        label="Tooltip has fixed position"
        withArrow
        transitionProps={{ duration: 0 }}
        opened
        floatingStrategy="fixed"
      >
        {(props) => <button type="button" {...props}>target</button>}
      </Tooltip>
    </div>
  );
}
