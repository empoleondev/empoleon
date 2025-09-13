import { Text } from '@empoleon/core';
import { TimeValue } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Text } from '@empoleon/core';
import { TimeValue } from '@empoleon/dates';

function Demo() {
  return (
    <div>
      <Text>
        24h format: <TimeValue value="18:45:34" />
      </Text>
      <Text>
        12h format: <TimeValue value="18:45:34" format="12h" />
      </Text>
    </div>
  );
}
`;

function Demo() {
  return (
    <div>
      <Text>
        24h format: <TimeValue value="18:45:34" />
      </Text>
      <Text>
        12h format: <TimeValue value="18:45:34" format="12h" />
      </Text>
    </div>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
