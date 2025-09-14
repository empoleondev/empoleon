import { IconArrowRight, IconDownload, IconPhoto } from '@tabler/icons-solidjs';
import { Button, Group } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Group, Button } from '@empoleon/core';
import { IconPhoto, IconDownload, IconArrowRight } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <Group justify="center">
      <Button leftSection={<IconPhoto size={14} />} variant="default">
        Gallery
      </Button>

      <Button rightSection={<IconDownload size={14} />}>Download</Button>

      <Button
        variant="light"
        leftSection={<IconPhoto size={14} />}
        rightSection={<IconArrowRight size={14} />}
      >
        Visit gallery
      </Button>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <Button leftSection={<IconPhoto size={14} />} variant="default">
        Gallery
      </Button>

      <Button rightSection={<IconDownload size={14} />}>Download</Button>
      <Button
        variant="light"
        leftSection={<IconPhoto size={14} />}
        rightSection={<IconArrowRight size={14} class="mantine-rotate-rtl" />}
      >
        Visit gallery
      </Button>
    </Group>
  );
}

export const sections: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
