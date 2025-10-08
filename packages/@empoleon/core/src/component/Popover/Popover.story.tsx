import { createSignal, For, JSX } from 'solid-js';
import { Box, EmpoleonProvider, EmpoleonThemeProvider } from '../../core';
import { Group } from '../Group';
import { Tooltip } from '../Tooltip';
import { Popover } from './Popover';

export default {
  title: 'Popover',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

const lorem =
  'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus, facilis rerum molestias voluptatem, quidem sunt, omnis iste ipsa corporis itaque optio. Amet fugiat explicabo, molestias exercitationem consequatur quis dicta unde?';

const createSection = (count = 10) => Array(count).fill(lorem);

export function Uncontrolled() {
  return (
    <EmpoleonThemeProvider
      theme={{
        components: {
          PopoverDropdown: Popover.Dropdown.extend({
            defaultProps: {
              'data-test': 'red',
            },
          }),
        },
      }}
    >
      <div style={{ padding: '40px' }}>
        <Popover
          onClose={() => console.log('closed')}
          onOpen={() => console.log('opened')}
          onExitTransitionEnd={() => console.log('exited')}
          onEnterTransitionEnd={() => console.log('entered')}
        >
          <Popover.Target>
            {(props) => (
              <button type="button" {...props}>
                Toggle popover
              </button>
            )}
          </Popover.Target>

          <Popover.Dropdown>Dropdown</Popover.Dropdown>
        </Popover>
      </div>
    </EmpoleonThemeProvider>
  );
}

export function Scrollable() {
  return (
    <div>
      <For each={createSection()}>{(text) => <p>{text}</p>}</For>
      <For each={createSection()}>{(text) => <p>{text}</p>}</For>
      <For each={createSection()}>{(text) => <p>{text}</p>}</For>

      <Uncontrolled />

      <For each={createSection()}>{(text) => <p>{text}</p>}</For>
      <For each={createSection()}>{(text) => <p>{text}</p>}</For>
      <For each={createSection()}>{(text) => <p>{text}</p>}</For>
    </div>
  );
}

export function AtTheEdge() {
  return (
    <div style={{ display: 'flex', 'justify-content': 'flex-end' }}>
      <Popover position="bottom-end" middlewares={{ shift: { padding: 20 } }}>
        <Popover.Target>
          {(props) => (
            <button type="button" {...props}>
              Toggle popover
            </button>
          )}
        </Popover.Target>

        <Popover.Dropdown>Dropdown</Popover.Dropdown>
      </Popover>
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ padding: '40px' }}>
      <Popover disabled>
        <Popover.Target>
          {(props) => (
            <button type="button" {...props}>
              Toggle popover
            </button>
          )}
        </Popover.Target>

        <Popover.Dropdown>Dropdown</Popover.Dropdown>
      </Popover>
    </div>
  );
}

export function WithArrow() {
  return (
    <div style={{ padding: '40px' }}>
      <Popover withArrow width="400px">
        <Popover.Target>
          {(props) => (
            <button type="button" {...props}>
              arrow popover
            </button>
          )}
        </Popover.Target>

        <Popover.Dropdown>Dropdown with arrow</Popover.Dropdown>
      </Popover>
    </div>
  );
}

export function WithArrowRadius() {
  return (
    <div style={{ padding: '40px' }}>
      <Popover withArrow width="400px" arrowRadius={4}>
        <Popover.Target>
          {(props) => (
            <button type="button" {...props}>
              arrow popover
            </button>
          )}
        </Popover.Target>

        <Popover.Dropdown>Dropdown with arrow radius</Popover.Dropdown>
      </Popover>
    </div>
  );
}

export function Controlled() {
  const [opened, setState] = createSignal(false);

  return (
    <div
      style={{
        padding: '100px',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
      }}
    >
      <Popover
        opened={opened()}
        onChange={setState}
        middlewares={{ shift: false, flip: false }}
        position="bottom"
        withArrow
        trapFocus
        radius="md"
        returnFocus
        onClose={() => console.log('closed')}
        onOpen={() => console.log('opened')}
      >
        <Popover.Target>
          {(props) => (
            <button type="button" onClick={() => setState((c) => !c)} {...props}>
              Toggle popover
            </button>
          )}
        </Popover.Target>

        <Popover.Dropdown>
          <button type="button" onClick={() => setState(false)}>
            Close
          </button>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

export function KeepMounted() {
  const [opened, setState] = createSignal(false);

  return (
    <div
      style={{
        padding: '100px',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
      }}
    >
      <Popover opened={opened()} onChange={setState} keepMounted>
        <Popover.Target>
          {(props) => (
            <button type="button" onClick={() => setState((c) => !c)} {...props}>
              Toggle popover
            </button>
          )}
        </Popover.Target>

        <Popover.Dropdown>
          <button type="button" onClick={() => setState(false)}>
            Close
          </button>
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

export function SameWidth() {
  const [opened, setState] = createSignal(false);

  return (
    <div style={{ padding: '40px' }}>
      <Popover opened={opened()} width="target" onChange={setState}>
        <Popover.Target>
          {(props) => (
            <button type="button" onClick={() => setState((c) => !c)} {...props}>
              Toggle popover
            </button>
          )}
        </Popover.Target>

        <Popover.Dropdown>Dropdown</Popover.Dropdown>
      </Popover>
    </div>
  );
}

export function WithinGroup() {
  return (
    <Group grow>
      <Popover>
        <Popover.Target>
          {(props) => (
            <button type="button" {...props}>
              Toggle popover
            </button>
          )}
        </Popover.Target>

        <Popover.Dropdown>Dropdown</Popover.Dropdown>
      </Popover>
      <button type="button">Regular button</button>
    </Group>
  );
}

export function PopoverTargetWithTooltip() {
  return (
    <div style={{ padding: '40px' }}>
      <Popover>
        <Tooltip label="Tooltip first">
          {(props) => (
            <Popover.Target>
              <button type="button" {...props}>
                Tooltip first
              </button>
            </Popover.Target>
          )}
        </Tooltip>

        <Popover.Dropdown>Dropdown</Popover.Dropdown>
      </Popover>

      <Popover>
        <Popover.Target>
          <Tooltip label="Tooltip last">
            {(props) => (
              <button type="button" {...props}>
                Tooltip last
              </button>
            )}
          </Tooltip>
        </Popover.Target>

        <Popover.Dropdown>Dropdown</Popover.Dropdown>
      </Popover>
    </div>
  );
}

export function Inline() {
  return (
    <div style={{ padding: '40px', 'max-width': '400px' }}>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae ipsam in quos aperiam magni
      quas neque{' '}
      <Popover middlewares={{ shift: true, flip: true, inline: true }} position="top">
        <Popover.Target>
          {(props) => (
            <span style={{ background: 'pink' }} {...props}>
              aliquid laboriosam dolorum
            </span>
          )}
        </Popover.Target>
        <Popover.Dropdown>Inline popover</Popover.Dropdown>
      </Popover>
      , eum voluptate, perferendis placeat repudiandae nesciunt explicabo quibusdam deserunt, animi
      dicta.
    </div>
  );
}

export function Size() {
  const [opened, setState] = createSignal(false);

  return (
    <div style={{ padding: '40px' }}>
      <Popover
        opened={opened()}
        middlewares={{ shift: true, flip: true, size: true }}
        onChange={setState}
      >
        <Popover.Target>
          {(props) => (
            <button type="button" onClick={() => setState((c) => !c)} {...props}>
              Toggle popover
            </button>
          )}
        </Popover.Target>

        <Popover.Dropdown style={{ overflow: 'auto' }}>
          <div style={{ width: '100px', height: '2000px', background: 'pink' }} />
        </Popover.Dropdown>
      </Popover>
    </div>
  );
}

export function PopoverEvents() {
  const [opened, setState] = createSignal(false);
  const [toggle1, setToggle1] = createSignal(false);
  const [toggle2, setToggle2] = createSignal(false);

  return (
    <div
      style={{
        padding: '100px',
        display: 'flex',
        'align-items': 'center',
        'justify-content': 'center',
      }}
    >
      <Group>
        <Popover
          opened={opened()}
          onChange={setState}
          onOpen={() => setToggle1(true)}
          onClose={() => setToggle1(false)}
          middlewares={{ shift: false, flip: false }}
          position="bottom"
          withArrow
          trapFocus
          radius="md"
          returnFocus
        >
          <Popover.Target>
            {(props) => (
              <Box {...props}>
                <button type="button" onClick={() => setState((c) => !c)}>
                  Toggle controlled popover
                </button>
                <br />
                <div>Controlled State: {toggle1() ? 'Open' : 'Closed'}</div>
              </Box>
            )}
          </Popover.Target>

          <Popover.Dropdown>
            <button type="button" onClick={() => setState(false)}>
              Close
            </button>
          </Popover.Dropdown>
        </Popover>
        <Popover onOpen={() => setToggle2(true)} onClose={() => setToggle2(false)}>
          <Popover.Target>
            {(props) => (
              <Box {...props}>
                <button type="button">Toggle uncontrolled popover</button>
                <br />
                <div>Uncontrolled State: {toggle2() ? 'Open' : 'Closed'}</div>
              </Box>
            )}
          </Popover.Target>

          <Popover.Dropdown>Dropdown</Popover.Dropdown>
        </Popover>
      </Group>
    </div>
  );
}

export function AxisOffset() {
  return (
    <div style={{ padding: '40px' }}>
      <Popover offset={{ mainAxis: 50, crossAxis: 50 }}>
        <Popover.Target>
          {(props) => (
            <button type="button" {...props}>
              Toggle popover
            </button>
          )}
        </Popover.Target>

        <Popover.Dropdown>Dropdown</Popover.Dropdown>
      </Popover>
    </div>
  );
}

export function WithOverlay() {
  return (
    <div style={{ padding: '40px' }}>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate enim est, quos
        mollitia, expedita, corrupti molestias consectetur vero temporibus assumenda corporis non
        porro? Iste a, reprehenderit debitis illum at error.
      </p>
      <Popover withOverlay overlayProps={{ blur: '8px', zIndex: 100 }}>
        <Popover.Target>
          {(props) => (
            <button type="button" style={{ position: 'relative', 'z-index': 101 }} {...props}>
              Toggle popover
            </button>
          )}
        </Popover.Target>
        <Popover.Dropdown>Dropdown</Popover.Dropdown>
      </Popover>
    </div>
  );
}

// Commented out
// export function ReferenceHidden() {
//   const [opened, setState] = createSignal(true);
//   return (
//     <div
//       style={{ width: '400px', height: '200px', margin: '100px', border: '1px solid', overflow: 'auto' }}
//       onClick={() => setState((o) => !o)}
//     >
//       <div style={{ padding: '40px', width: '1000px', height: '1000px' }}>
//         <Popover position="top" withArrow opened hideDetached={false} floatingStrategy="fixed">
//           <Popover.Target>
//             <button type="button" style={{ display: opened() ? 'block' : 'none' }}>
//               Toggle popover
//             </button>
//           </Popover.Target>

//           <Popover.Dropdown>Dropdown</Popover.Dropdown>
//         </Popover>
//       </div>
//     </div>
//   );
// }
