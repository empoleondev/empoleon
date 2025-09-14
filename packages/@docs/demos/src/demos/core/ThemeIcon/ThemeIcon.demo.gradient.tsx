import { IconHeart } from '@tabler/icons-solidjs';
import { ThemeIcon } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { gradientControls } from '../../../shared';

const code = (props: any) => `
import { ThemeIcon } from '@empoleon/core';
import { IconHeart } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <ThemeIcon
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: '${props.gradientFrom}', to: '${props.gradientTo}', deg: ${props.gradientDegree} }}
    >
      <IconHeart />
    </ThemeIcon>
  );
}
`;

function Wrapper(props: any) {
  return (
    <ThemeIcon
      variant="gradient"
      size="xl"
      aria-label="Gradient action icon"
      gradient={{ from: props.gradientFrom, to: props.gradientTo, deg: props.gradientDegree }}
    >
      <IconHeart />
    </ThemeIcon>
  );
}

export const gradient: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: gradientControls,
};
