import { Progress, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Progress, Tooltip } from '@empoleon/core';

function Demo() {
  return (
    <Progress.Root size={40}>
      <Tooltip label="Documents – 33Gb">
        <Progress.Section value={33} color="cyan">
          <Progress.Label>Documents</Progress.Label>
        </Progress.Section>
      </Tooltip>

      <Tooltip label="Photos – 28Gb">
        <Progress.Section value={28} color="pink">
          <Progress.Label>Photos</Progress.Label>
        </Progress.Section>
      </Tooltip>

      <Tooltip label="Other – 15Gb">
        <Progress.Section value={15} color="orange">
          <Progress.Label>Other</Progress.Label>
        </Progress.Section>
      </Tooltip>
    </Progress.Root>
  );
}
`;

function Demo() {
  return (
    <Progress.Root size={40}>
      <Tooltip label="Documents – 33Gb">
        {(props) => (
          <Progress.Section {...props} value={33} color="cyan">
            <Progress.Label>Documents</Progress.Label>
          </Progress.Section>
        )}
      </Tooltip>

      <Tooltip label="Photos – 28Gb">
        {(props) => (
          <Progress.Section {...props} value={28} color="pink">
            <Progress.Label>Photos</Progress.Label>
          </Progress.Section>
        )}
      </Tooltip>

      <Tooltip label="Other – 15Gb">
        {(props) => (
          <Progress.Section {...props} value={15} color="orange">
            <Progress.Label>Other</Progress.Label>
          </Progress.Section>
        )}
      </Tooltip>
    </Progress.Root>
  );
}

export const tooltips: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
