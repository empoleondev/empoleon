import { MultiSelect, MultiSelectProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { inputControls } from '../../../shared';
import { createSignal, createEffect } from 'solid-js';
import { IconSearch } from '@tabler/icons-solidjs';

const code = `
import { MultiSelect } from '@empoleon/core';

function Demo() {
  return (
    <MultiSelect
      {{props}}
      placeholder="MultiSelect placeholder"
      data={['React', 'Angular', 'Vue', 'Svelte']}
    />
  );
}
`;

function Demo(props: MultiSelectProps & {
  dataFormat?: string;
  withGroups?: boolean;
  hasLeftSection?: boolean;
  hasRightSection?: boolean;
}) {
  const [searchValue, setSearchValue] = createSignal('');

  const getLeftSection = () => {
    if (!props.hasLeftSection) return undefined;
    return <IconSearch style={{ width: '16px', height: '16px' }} />;
  };

  const getRightSection = () => {
    if (!props.hasRightSection) return undefined;
    return '🔍';
  };

  const getDataByFormat = () => {
    if (props.withGroups) {
      if (props.dataFormat === 'objects') {
        return [
          {
            group: 'Frontend Frameworks',
            items: [
              { value: 'react', label: 'React' },
              { value: 'angular', label: 'Angular' },
              { value: 'vue', label: 'Vue' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'ember', label: 'Ember' },
              { value: 'backbone', label: 'Backbone' },
              { value: 'preact', label: 'Preact' },
              { value: 'solid', label: 'Solid' },
              { value: 'qwik', label: 'Qwik' },
              { value: 'alpine', label: 'Alpine.js' },
              { value: 'lit', label: 'Lit' },
              { value: 'aurelia', label: 'Aurelia' },
              { value: 'mithril', label: 'Mithril' },
            ],
          },
          {
            group: 'Meta-Frameworks',
            items: [
              { value: 'nextjs', label: 'Next.js' },
              { value: 'nuxt', label: 'Nuxt' },
              { value: 'sveltekit', label: 'SvelteKit' },
              { value: 'remix', label: 'Remix' },
              { value: 'astro', label: 'Astro' },
              { value: 'gatsby', label: 'Gatsby' },
            ],
          },
          {
            group: 'Full-Stack',
            items: [
              { value: 'meteor', label: 'Meteor' },
            ],
          },
        ];
      }
      return [
        {
          group: 'Frontend Frameworks',
          items: ['React', 'Angular', 'Vue', 'Svelte', 'Ember', 'Backbone', 'Preact', 'Solid', 'Qwik', 'Alpine.js', 'Lit', 'Aurelia', 'Mithril'],
        },
        {
          group: 'Meta-Frameworks',
          items: ['Next.js', 'Nuxt', 'SvelteKit', 'Remix', 'Astro', 'Gatsby'],
        },
        {
          group: 'Full-Stack',
          items: ['Meteor'],
        },
      ];
    }

    if (props.dataFormat === 'objects') {
      return [
        { value: 'react', label: 'React' },
        { value: 'angular', label: 'Angular' },
        { value: 'vue', label: 'Vue' },
        { value: 'svelte', label: 'Svelte' },
        { value: 'nextjs', label: 'Next.js' },
        { value: 'nuxt', label: 'Nuxt' },
        { value: 'ember', label: 'Ember' },
        { value: 'backbone', label: 'Backbone' },
        { value: 'preact', label: 'Preact' },
        { value: 'solid', label: 'Solid' },
        { value: 'qwik', label: 'Qwik' },
        { value: 'alpine', label: 'Alpine.js' },
        { value: 'lit', label: 'Lit' },
        { value: 'astro', label: 'Astro' },
        { value: 'remix', label: 'Remix' },
        { value: 'sveltekit', label: 'SvelteKit' },
        { value: 'gatsby', label: 'Gatsby' },
        { value: 'meteor', label: 'Meteor' },
        { value: 'aurelia', label: 'Aurelia' },
        { value: 'mithril', label: 'Mithril' },
      ];
    }

    return ['React', 'Angular', 'Vue', 'Svelte', 'Next.js', 'Nuxt', 'Ember', 'Backbone', 'Preact', 'Solid', 'Qwik', 'Alpine.js', 'Lit', 'Astro', 'Remix', 'SvelteKit', 'Gatsby', 'Meteor', 'Aurelia', 'Mithril'];
  };

  return (
    <MultiSelect
      {...props}
      searchValue={props.searchable ? searchValue() : undefined}
      onSearchChange={props.searchable ? setSearchValue : undefined}
      placeholder="MultiSelect placeholder"
      label="Select frameworks"
      description="Choose your favorite frameworks"
      data={getDataByFormat()}
      leftSection={getLeftSection()}
      rightSection={getRightSection()}
    />
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
  controls: [
    // Input.Wrapper Props
    {
      prop: 'label',
      type: 'string',
      initialValue: 'Select frameworks',
      libraryValue: '',
    },
    {
      prop: 'description',
      type: 'string',
      initialValue: 'Choose your favorite frameworks',
      libraryValue: '',
    },
    {
      prop: 'error',
      type: 'string',
      initialValue: '',
      libraryValue: '',
    },
    {
      prop: 'withAsterisk',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'required',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },

    // Base Input Props
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
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
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
      prop: 'placeholder',
      type: 'string',
      initialValue: 'MultiSelect placeholder',
      libraryValue: '',
    },
    {
      prop: 'pointer',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withErrorStyles',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },

    // Left/Right Sections
    {
      prop: 'hasLeftSection',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'hasRightSection',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },

    // MultiSelect Specific Props
    {
      prop: 'searchable',
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
      prop: 'maxValues',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined,
      min: 1,
      max: 10,
    },
    {
      prop: 'hidePickedOptions',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withCheckIcon',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'checkIconPosition',
      type: 'select',
      initialValue: 'left',
      libraryValue: 'left',
      data: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
    {
      prop: 'nothingFoundMessage',
      type: 'string',
      initialValue: 'Nothing found...',
      libraryValue: '',
    },
    {
      prop: 'maxDropdownHeight',
      type: 'number',
      initialValue: 250,
      libraryValue: 250,
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
      prop: 'limit',
      type: 'number',
      initialValue: undefined,
      libraryValue: undefined,
      min: 5,
      max: 100,
      step: 5,
    },
    {
      prop: 'dropdownOpened',
      type: 'boolean',
      initialValue: undefined,
      libraryValue: undefined,
    },

    // Chevron styling
    {
      prop: 'chevronColor',
      type: 'color',
      initialValue: undefined,
      libraryValue: undefined,
    },
  ],
};
