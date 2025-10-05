import { Switch, SwitchProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { IconCheck, IconX } from '@tabler/icons-solidjs';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { Switch } from '@empoleon/core';
import { IconCheck, IconX } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <Switch
      defaultChecked
      {{props}}
    />
  );
}
`;

function Demo(props: SwitchProps & {
  withThumbIndicator?: boolean;
  showIconLabels?: boolean;
  onLabel?: string;
  offLabel?: string;
}) {
  const [checked, setChecked] = createSignal(props.defaultChecked || false);

  createEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked);
    }
  });

  const getThumbIcon = () => {
    if (!props.withThumbIndicator) return undefined;
    return checked() ? <IconCheck size={12} color="var(--empoleon-color-teal-6)" stroke='3' /> : <IconX size={12} color="var(--empoleon-color-red-6)" stroke='3' />;
  };

  const getOnLabel = () => {
    if (props.showIconLabels) {
      return <IconCheck style={{ width: '70%', height: '70%' }} stroke="1.5" />;
    }
    return props.onLabel || undefined;
  };

  const getOffLabel = () => {
    if (props.showIconLabels) {
      return <IconX style={{ width: '70%', height: '70%' }} stroke="1.5" />;
    }
    return props.offLabel || undefined;
  };

  return (
    <Switch
      {...props}
      checked={checked()}
      onChange={(event: any) => setChecked(event.currentTarget.checked)}
      thumbIcon={getThumbIcon()}
      onLabel={getOnLabel()}
      offLabel={getOffLabel()}
    />
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: [
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue'
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md'
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'xl',
      libraryValue: 'xl'
    },
    {
      prop: 'label',
      type: 'string',
      initialValue: 'I agree to sell my privacy',
      libraryValue: ''
    },
    {
      prop: 'description',
      type: 'string',
      initialValue: '',
      libraryValue: ''
    },
    {
      prop: 'error',
      type: 'string',
      initialValue: '',
      libraryValue: ''
    },
    {
      prop: 'labelPosition',
      type: 'segmented',
      data: [
        { value: 'right', label: 'Right' },
        { value: 'left', label: 'Left' },
      ],
      initialValue: 'right',
      libraryValue: 'right',
    },
    {
      prop: 'withThumbIndicator',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'onLabel',
      type: 'string',
      initialValue: '',
      libraryValue: ''
    },
    {
      prop: 'offLabel',
      type: 'string',
      initialValue: '',
      libraryValue: ''
    },
    {
      prop: 'showIconLabels',
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
  ],
};
