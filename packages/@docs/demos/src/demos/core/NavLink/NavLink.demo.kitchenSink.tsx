import { NavLink, NavLinkProps, Badge } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import {
  IconHome2,
  IconGauge,
  IconActivity,
  IconChevronRight,
  IconHeart,
  IconStar,
} from '@tabler/icons-solidjs';
import { createSignal, createEffect, Show } from 'solid-js';

const code = `
import { NavLink, Badge } from '@empoleon/core';
import { IconHome2, IconChevronRight } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <NavLink{{props}}
      href="#required-for-focus"
      label="Navigation Link"
      description="Optional description"
      leftSection={<IconHome2 size={16} stroke='1.5' />}
      rightSection={<IconChevronRight size={12} stroke='1.5' />}
    />
  );
}
`;

function Demo(props: NavLinkProps & {
  iconType?: string;
  showLeftSection?: boolean;
  showRightSection?: boolean;
  showDescription?: boolean;
  noWrap?: boolean;
}) {
  const [active, setActive] = createSignal(props.active || false);

  createEffect(() => {
    setActive(props.active || false);
  });

  const getLeftIcon = () => {
    const iconProps = {
      size: 16,
      stroke: '1.5'
    };

    switch (props.iconType) {
      case 'gauge':
        return () => <IconGauge {...iconProps} />;
      case 'activity':
        return () => <IconActivity {...iconProps} />;
      case 'heart':
        return () => <IconHeart {...iconProps} />;
      case 'star':
        return () => <IconStar {...iconProps} />;
      case 'badge':
        return () => (
          <Badge size="xs" color="red" circle>
            3
          </Badge>
        );
      default:
        return () => <IconHome2 {...iconProps} />;
    }
  };

  const getRightSection = () => {
    return <IconChevronRight size={12} stroke='1.5' class="empoleon-rotate-rtl" />;
  };

  return (
    <NavLink
      {...props}
      href="#required-for-focus"
      label="Navigation Link"
      description={props.showDescription ? "Additional information" : undefined}
      leftSection={props.showLeftSection ? getLeftIcon()() : undefined}
      rightSection={props.showRightSection ? getRightSection() : undefined}
      active={active()}
      onClick={() => setActive(!active())}
    >
        <NavLink label="First child link" href="#required-for-focus" />
        <NavLink label="Second child link" href="#required-for-focus" />
        <NavLink label="Third child link" href="#required-for-focus" />
    </NavLink>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 300,
  controls: [
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'light',
      libraryValue: 'light',
      data: [
        { label: 'Light', value: 'light' },
        { label: 'Filled', value: 'filled' },
        { label: 'Subtle', value: 'subtle' },
      ],
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue'
    },
    {
      prop: 'active',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'noWrap',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'showLeftSection',
      type: 'boolean',
      initialValue: true,
      libraryValue: false
    },
    {
      prop: 'showRightSection',
      type: 'boolean',
      initialValue: true,
      libraryValue: false
    },
    {
      prop: 'showDescription',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'iconType',
      type: 'select',
      initialValue: 'home',
      libraryValue: 'home',
      data: [
        { label: 'Home', value: 'home' },
        { label: 'Gauge', value: 'gauge' },
        { label: 'Activity', value: 'activity' },
        { label: 'Heart', value: 'heart' },
        { label: 'Star', value: 'star' },
        { label: 'Badge', value: 'badge' },
      ],
    },
    {
      prop: 'opened',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'childrenOffset',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md'
    },
  ],
};
