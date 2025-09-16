import { Box, ScrollArea } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { Content } from './_content';
import classes from './ScrollArea.demo.stylesApi.module.css';

const code = `
import { ScrollArea, Box } from '@empoleon/core';
import classes from './Demo.module.css';

function Demo() {
  return (
    <ScrollArea w={300} h={200} type="always" offsetScrollbars classNames={classes}>
      <Box w={600}>
        {/* ... content */}
      </Box>
    </ScrollArea>
  );
}
`;

const cssCode = `
.scrollbar {
  &,
  &:hover {
    background-color: light-dark(var(--empoleon-color-gray-0), var(--empoleon-color-dark-6));
  }

  &[data-orientation='vertical'] .thumb {
    background-color: var(--empoleon-color-red-6);
  }

  &[data-orientation='horizontal'] .thumb {
    background-color: var(--empoleon-color-blue-6);
  }
}

.corner {
  background-color: light-dark(var(--empoleon-color-gray-0), var(--empoleon-color-dark-6));
  opacity: 1;
}
`;

function Demo() {
  return (
    <ScrollArea w={300} h={200} type="always" offsetScrollbars classNames={classes}>
      <Box w={600}>
        <Content />
      </Box>
    </ScrollArea>
  );
}

export const stylesApi: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
  ],
};
