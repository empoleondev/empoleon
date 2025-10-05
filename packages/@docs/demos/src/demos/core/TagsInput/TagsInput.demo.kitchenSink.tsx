import { TagsInput, TagsInputProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { IconSearch } from '@tabler/icons-solidjs';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { TagsInput } from '@empoleon/core';

function Demo() {
  return (
    <TagsInput
      {{props}}
      placeholder="Enter tags"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
`;

function Demo(props: TagsInputProps & {
  showLabel?: boolean;
  showDescription?: boolean;
  showError?: boolean;
  showLeftSection?: boolean;
  showRightSection?: boolean;
}) {
  const [value, setValue] = createSignal<string[]>(props.value || ['React', 'Vue']);
  const [searchValue, setSearchValue] = createSignal('');

  createEffect(() => {
    if (props.value) {
      setValue(props.value);
    }
  });

  const getLeftSection = () => {
    if (props.showLeftSection) {
      return <IconSearch style={{ width: '16px', height: '16px' }} />;
    }
    return undefined;
  };

  return (
    <TagsInput
      {...props}
      label={props.showLabel ? 'Enter your favorite frameworks' : undefined}
      description={props.showDescription ? 'Pick from suggestions or enter custom values' : undefined}
      error={props.showError ? 'Please enter at least one tag' : undefined}
      placeholder="Enter tags"
      value={value()}
      onChange={setValue}
      searchValue={searchValue()}
      onSearchChange={setSearchValue}
      data={['React', 'Angular', 'Vue', 'Svelte', 'Next.js', 'Remix', 'Gatsby', 'Nuxt']}
      leftSection={getLeftSection()}
      leftSectionPointerEvents={props.showLeftSection ? 'none' : undefined}
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
      prop: 'showLabel',
      type: 'boolean',
      initialValue: true,
      libraryValue: false,
    },
    {
      prop: 'showDescription',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'showError',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
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
      libraryValue: false,
    },
    {
      prop: 'readOnly',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'clearable',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withAsterisk',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    // {
    //   prop: 'maxTags',
    //   type: 'number',
    //   initialValue: undefined,
    //   libraryValue: undefined,
    //   min: 1,
    //   max: 10,
    //   step: 1,
    // },
    {
      prop: 'acceptValueOnBlur',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'allowDuplicates',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'limit',
      type: 'number',
      initialValue: 5,
      libraryValue: Infinity,
      min: 1,
      max: 20,
      step: 1,
    },
    {
      prop: 'maxDropdownHeight',
      type: 'number',
      initialValue: 200,
      libraryValue: 200,
      min: 100,
      max: 500,
      step: 50,
    },
    {
      prop: 'withScrollArea',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'showLeftSection',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    // {
    //   prop: 'leftSectionWidth',
    //   type: 'number',
    //   initialValue: undefined,
    //   libraryValue: undefined,
    //   min: 20,
    //   max: 60,
    //   step: 5,
    // },
    // {
    //   prop: 'rightSectionWidth',
    //   type: 'number',
    //   initialValue: undefined,
    //   libraryValue: undefined,
    //   min: 20,
    //   max: 60,
    //   step: 5,
    // },
  ],
};
