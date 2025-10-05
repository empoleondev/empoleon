import { Autocomplete, AutocompleteProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { IconSearch, IconStar, IconUser, IconMail } from '@tabler/icons-solidjs';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { Autocomplete } from '@empoleon/core';
import { IconSearch } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <Autocomplete{{props}}
      label="Your favorite library"
      placeholder="Pick value or enter anything"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
`;

interface DemoProps extends AutocompleteProps {
  iconType?: string;
  withLeftSection?: boolean;
  withRightSection?: boolean;
}

function Demo(props: DemoProps) {
  const [value, setValue] = createSignal(props.value || '');

  createEffect(() => {
    setValue(props.value || '');
  });

  const getIcon = () => {
    const iconProps = {
      style: { width: '70%', height: '70%' },
      stroke: '1.5'
    };

    switch (props.iconType) {
      case 'star':
        return () => <IconStar {...iconProps} />;
      case 'user':
        return () => <IconUser {...iconProps} />;
      case 'mail':
        return () => <IconMail {...iconProps} />;
      default:
        return () => <IconSearch {...iconProps} />;
    }
  };

  const data = [
    { group: 'Frontend', items: ['React', 'Angular', 'Vue', 'Svelte'] },
    { group: 'Backend', items: ['Express', 'Django', 'FastAPI', 'Rails'] },
  ];

  return (
    <Autocomplete
      {...props}
      value={value()}
      onChange={setValue}
      data={data}
      leftSection={props.withLeftSection ? getIcon()() : undefined}
      rightSection={props.withRightSection ? getIcon()() : undefined}
      aria-label="Demo Autocomplete"
    />
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
  controls: [
    {
      prop: 'label',
      type: 'string',
      initialValue: 'Your favorite library',
      libraryValue: undefined
    },
    {
      prop: 'description',
      type: 'string',
      initialValue: '',
      libraryValue: undefined
    },
    {
      prop: 'error',
      type: 'string',
      initialValue: '',
      libraryValue: undefined
    },
    {
      prop: 'placeholder',
      type: 'string',
      initialValue: 'Pick value or enter anything',
      libraryValue: undefined
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm'
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm'
    },
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'default',
      libraryValue: 'default',
      data: [
        { label: 'Default', value: 'default' },
        { label: 'Filled', value: 'filled' },
        { label: 'Unstyled', value: 'unstyled' },
      ],
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'readOnly',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'required',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'clearable',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'withAsterisk',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'selectFirstOptionOnChange',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'autoSelectOnBlur',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'withScrollArea',
      type: 'boolean',
      initialValue: true,
      libraryValue: true
    },
    {
      prop: 'limit',
      type: 'number',
      initialValue: 5,
      libraryValue: Infinity,
      min: 1,
      max: 20,
      step: 1
    },
    {
      prop: 'maxDropdownHeight',
      type: 'number',
      initialValue: 220,
      libraryValue: 220,
      min: 100,
      max: 500,
      step: 20
    },
    {
      prop: 'dropdownOpened',
      type: 'boolean',
      initialValue: undefined,
      libraryValue: undefined
    },
    {
      prop: 'withLeftSection',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'withRightSection',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'iconType',
      type: 'select',
      initialValue: 'search',
      libraryValue: 'search',
      data: [
        { label: 'Search', value: 'search' },
        { label: 'Star', value: 'star' },
        { label: 'User', value: 'user' },
        { label: 'Mail', value: 'mail' },
      ],
    },
    {
      prop: 'leftSectionPointerEvents',
      type: 'select',
      initialValue: 'none',
      libraryValue: 'none',
      data: [
        { label: 'None', value: 'none' },
        { label: 'Auto', value: 'auto' },
      ],
    },
    {
      prop: 'rightSectionPointerEvents',
      type: 'select',
      initialValue: 'none',
      libraryValue: 'none',
      data: [
        { label: 'None', value: 'none' },
        { label: 'Auto', value: 'auto' },
      ],
    },
  ],
};
