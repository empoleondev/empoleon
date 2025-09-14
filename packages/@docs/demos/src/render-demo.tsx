import { Demo, EmpoleonDemo } from '@empoleonx/demo';

export function renderDemo(demo: EmpoleonDemo) {
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
