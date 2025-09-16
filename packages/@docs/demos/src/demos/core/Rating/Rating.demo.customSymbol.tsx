import {
  IconMoodCrazyHappy,
  IconMoodCry,
  IconMoodHappy,
  IconMoodSad,
  IconMoodSmile,
} from '@tabler/icons-solidjs';
import { Rating } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Rating } from '@empoleon/core';
import {
  IconMoodCry,
  IconMoodSad,
  IconMoodSmile,
  IconMoodHappy,
  IconMoodCrazyHappy,
} from '@tabler/icons-solidjs';

const getIconStyle = (color?: string) => ({
  width: 24,
  height: 24,
  color: color ? \`var(--empoleon-color-\${color}-7)\` : undefined,
});

const getEmptyIcon = (value: number) => {
  const iconStyle = getIconStyle();

  switch (value) {
    case 1:
      return <IconMoodCry style={iconStyle} />;
    case 2:
      return <IconMoodSad style={iconStyle} />;
    case 3:
      return <IconMoodSmile style={iconStyle} />;
    case 4:
      return <IconMoodHappy style={iconStyle} />;
    case 5:
      return <IconMoodCrazyHappy style={iconStyle} />;
    default:
      return null;
  }
};

const getFullIcon = (value: number) => {
  switch (value) {
    case 1:
      return <IconMoodCry style={getIconStyle('red')} />;
    case 2:
      return <IconMoodSad style={getIconStyle('orange')} />;
    case 3:
      return <IconMoodSmile style={getIconStyle('yellow')} />;
    case 4:
      return <IconMoodHappy style={getIconStyle('lime')} />;
    case 5:
      return <IconMoodCrazyHappy style={getIconStyle('green')} />;
    default:
      return null;
  }
};

function Demo() {
  return <Rating emptySymbol={getEmptyIcon} fullSymbol={getFullIcon} highlightSelectedOnly />;
}
`;

const getIconStyle = (color?: string) => ({
  width: 24,
  height: 24,
  color: color ? `var(--empoleon-color-${color}-7)` : undefined,
});

const getEmptyIcon = (value: number) => {
  const iconStyle = getIconStyle();

  switch (value) {
    case 1:
      // @ts-ignore
      return <IconMoodCry style={iconStyle} />;
    case 2:
      // @ts-ignore
      return <IconMoodSad style={iconStyle} />;
    case 3:
      // @ts-ignore
      return <IconMoodSmile style={iconStyle} />;
    case 4:
      // @ts-ignore
      return <IconMoodHappy style={iconStyle} />;
    case 5:
      // @ts-ignore
      return <IconMoodCrazyHappy style={iconStyle} />;
    default:
      return null;
  }
};

const getFullIcon = (value: number) => {
  switch (value) {
    case 1:
      // @ts-ignore
      return <IconMoodCry style={getIconStyle('red')} />;
    case 2:
      // @ts-ignore
      return <IconMoodSad style={getIconStyle('orange')} />;
    case 3:
      // @ts-ignore
      return <IconMoodSmile style={getIconStyle('yellow')} />;
    case 4:
      // @ts-ignore
      return <IconMoodHappy style={getIconStyle('lime')} />;
    case 5:
      // @ts-ignore
      return <IconMoodCrazyHappy style={getIconStyle('green')} />;
    default:
      return null;
  }
};

function Demo() {
  return <Rating emptySymbol={getEmptyIcon} fullSymbol={getFullIcon} highlightSelectedOnly />;
}

export const customSymbol: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
