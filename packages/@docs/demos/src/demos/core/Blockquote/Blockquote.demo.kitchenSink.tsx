import {
  IconAlertCircle,
  IconFlame,
  IconHeart,
  IconInfoCircle,
  IconStar,
} from '@tabler/icons-solidjs';
import { Blockquote } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Blockquote } from '@empoleon/core';
import { IconInfoCircle } from '@tabler/icons-solidjs';

function Demo() {
  const getIcon = () => {
    const iconProps = {
      style: { width: '100%', height: '100%' }
    };

    switch (props.icon) {
      case 'heart':
        return <IconHeart {...iconProps} />;
      case 'flame':
        return <IconFlame {...iconProps} />;
      case 'star':
        return <IconStar {...iconProps} />;
      case 'alert':
        return <IconAlertCircle {...iconProps} />;
      case 'none':
        return undefined;
      default:
        return <IconInfoCircle {...iconProps} />;
    }
  };

  const icon = () => getIcon();

  return (
    <Blockquote{{props}} cite="– Forrest Gump" icon={icon}>
      Life is like an npm install – you never know what you are going to get.
    </Blockquote>
  );
}
`;

function Demo(props: any) {
  const getIcon = () => {
    const iconProps = {
      style: { width: '100%', height: '100%' },
    };

    switch (props.icon) {
      case 'heart':
        return <IconHeart {...iconProps} />;
      case 'flame':
        return <IconFlame {...iconProps} />;
      case 'star':
        return <IconStar {...iconProps} />;
      case 'alert':
        return <IconAlertCircle {...iconProps} />;
      case 'none':
        return undefined;
      default:
        return <IconInfoCircle {...iconProps} />;
    }
  };

  const icon = () => getIcon();

  return (
    <Blockquote
      color={props.color}
      cite={props.cite}
      icon={icon()}
      iconSize={props.iconSize}
      radius={props.radius}
      mt={props.mt}
    >
      {props.children}
    </Blockquote>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 500,
  controls: [
    {
      type: 'color',
      prop: 'color',
      initialValue: 'blue',
      libraryValue: null,
    },
    {
      type: 'size',
      prop: 'radius',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      type: 'number',
      prop: 'iconSize',
      initialValue: 48,
      min: 20,
      max: 80,
      step: 4,
      libraryValue: 48,
    },
    {
      type: 'select',
      prop: 'icon',
      initialValue: 'info',
      libraryValue: 'info',
      data: [
        { label: 'Info Circle', value: 'info' },
        { label: 'Heart', value: 'heart' },
        { label: 'Flame', value: 'flame' },
        { label: 'Star', value: 'star' },
        { label: 'Alert Circle', value: 'alert' },
        { label: 'No Icon', value: 'none' },
      ],
    },
    {
      type: 'string',
      prop: 'cite',
      initialValue: '– Forrest Gump',
      libraryValue: null,
    },
    {
      type: 'string',
      prop: 'children',
      initialValue: 'Life is like an npm install – you never know what you are going to get.',
      libraryValue: null,
    },
  ],
};
