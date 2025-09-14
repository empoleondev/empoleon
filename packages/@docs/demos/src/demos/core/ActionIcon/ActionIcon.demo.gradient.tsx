import { IconHeart } from '@tabler/icons-solidjs';
import { ActionIcon } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { gradientControls } from '../../../shared';

const code = (props: any) => `
import { ActionIcon } from '@empoleon/core';
import { IconHeart } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <ActionIcon
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: '${props.gradientFrom}', to: '${props.gradientTo}', deg: ${props.gradientDegree} }}
    >
      <IconHeart />
    </ActionIcon>
  );
}
`;

function Wrapper(props: any) {
  return (
    <ActionIcon
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: props.gradientFrom, to: props.gradientTo, deg: props.gradientDegree }}
    >
      <IconHeart />
    </ActionIcon>
  );
}

export const gradient: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: gradientControls,
};
