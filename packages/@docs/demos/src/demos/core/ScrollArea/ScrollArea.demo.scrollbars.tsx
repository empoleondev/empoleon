import { Box, ScrollArea } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';
import { Content } from './_content';

const code = `
import { ScrollArea, Box } from '@empoleon/core';

function Demo() {
  return (
    <ScrollArea w={300} h={200} scrollbars="y">
      <Box w={600}>
        {/* ... content */}
      </Box>
    </ScrollArea>
  );
}
`;

function Demo() {
  return (
    <ScrollArea w={300} h={200} scrollbars="y">
      <Box w={600}>
        <Content />
      </Box>
    </ScrollArea>
  );
}

export const scrollbars: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
