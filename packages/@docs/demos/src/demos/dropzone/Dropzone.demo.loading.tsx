import { EmpoleonDemo } from '@empoleonx/demo';
import { BaseDemo } from './_base';

const code = `
import { Dropzone } from '@empoleon/dropzone';

function Demo() {
  return (
    <Dropzone loading onDrop={() => {}}>
      {/* children */}
    </Dropzone>
  );
}
`;

function Demo() {
  return <BaseDemo loading />;
}

export const loading: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
