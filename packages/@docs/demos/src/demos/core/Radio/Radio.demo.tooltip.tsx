import { Radio, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Tooltip, Radio } from '@empoleon/core';

function Demo() {
  return (
    <>
      <Tooltip label="Radio with tooltip">
        <Radio label="Tooltip on radio only" />
      </Tooltip>

      <Tooltip label="Radio with tooltip" refProp="rootRef">
        <Radio label="Tooltip the entire element" mt="md" />
      </Tooltip>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Tooltip label="Radio with tooltip">
        {(props) => <Radio label="Tooltip on radio only" {...props} />}
      </Tooltip>

      <Tooltip label="Radio with tooltip" refProp="rootRef">
        {(props) => <Radio label="Tooltip the entire element" mt="md" {...props} />}
      </Tooltip>
    </>
  );
}

export const tooltip: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
