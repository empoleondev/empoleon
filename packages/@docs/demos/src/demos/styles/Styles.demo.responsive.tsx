import { EmpoleonDemo } from '@empoleonx/demo';
import classes from './Styles.demo.responsive.module.css';

const code = `
import classes from './Demo.module.css';

function Demo() {
  return <div class={classes.demo}>Demo</div>;
}
`;

const cssCode = `
.demo {
  background-color: var(--empoleon-color-blue-filled);
  color: var(--empoleon-color-white);
  padding: var(--empoleon-spacing-md);
  text-align: center;

  @media (min-width: em(750px)) {
    background-color: var(--empoleon-color-red-filled);
  }
}
`;

function Demo() {
  return <div class={classes.demo}>Demo</div>;
}

export const responsive: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
    { fileName: 'Demo.tsx', code, language: 'tsx' },
  ],
};
