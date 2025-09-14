import { Button, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Tooltip, Button } from '@empoleon/core';

function Demo() {
  return (
    <Tooltip label="top" position="top" closeDelay={1500}>
      <Tooltip label="bottom" position="bottom" openDelay={500} closeDelay={1000}>
        <Tooltip label="left" position="left" openDelay={1000} closeDelay={500}>
          <Tooltip label="right" position="right" openDelay={1500}>
            <Button>Nested Tooltips</Button>
          </Tooltip>
        </Tooltip>
      </Tooltip>
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="top" position="top" closeDelay={1500}>
      {(props) => <Tooltip {...props} label="bottom" position="bottom" openDelay={500} closeDelay={1000}>
        {(props) => <Tooltip {...props} label="left" position="left" openDelay={1000} closeDelay={500}>
          {(props) => <Tooltip {...props} label="right" position="right" openDelay={1500}>
            {(props) => <Button {...props}>Nested Tooltips</Button>}
          </Tooltip>}
        </Tooltip>}
      </Tooltip>}
    </Tooltip>
  );
}

export const nested: EmpoleonDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
