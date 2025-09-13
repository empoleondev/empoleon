import { Demo, MantineDemo } from '@empoleonx/demo';

export function renderDemo(demo: MantineDemo) {
  return () => (
    <div
      style={{
        'padding-top': '40px',
        'padding-bottom': '40px',
        'max-width': '820px',
        'margin-left': 'auto',
        'margin-right': 'auto',
      }}
    >
      <Demo data={demo} />
    </div>
  );
}
