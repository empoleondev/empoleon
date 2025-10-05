import { RingProgress, RingProgressProps, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, createEffect, JSX } from 'solid-js';

const code = `
import { RingProgress, Text } from '@empoleon/core';

function Demo() {
  return (
    <RingProgress
      {{props}}
      sections={[
        { value: 40, color: 'cyan' },
        { value: 15, color: 'orange' },
        { value: 15, color: 'grape' },
      ]}
      label={
        <Text size="xs" ta="center">
          40%
        </Text>
      }
    />
  );
}
`;

function Demo(props: RingProgressProps & {
  showLabel?: boolean;
  labelText?: string;
  section1Value?: number;
  section2Value?: number;
  section3Value?: number;
  section1Color?: string;
  section2Color?: string;
  section3Color?: string;
}) {
  const [sections, setSections] = createSignal([
    { value: props.section1Value || 40, color: props.section1Color || 'cyan' },
    { value: props.section2Value || 15, color: props.section2Color || 'orange' },
    { value: props.section3Value || 15, color: props.section3Color || 'grape' },
  ]);

  createEffect(() => {
    setSections([
      { value: props.section1Value || 40, color: props.section1Color || 'cyan' },
      { value: props.section2Value || 15, color: props.section2Color || 'orange' },
      { value: props.section3Value || 15, color: props.section3Color || 'grape' },
    ]);
  });

  const getLabel = (): JSX.Element | undefined => {
    if (!props.showLabel) return undefined;

    const totalValue = sections().reduce((sum, section) => sum + section.value, 0);
    return (
      <Text size="xs" ta="center">
        {props.labelText || `${totalValue}%`}
      </Text>
    );
  };

  return (
    <RingProgress
      {...props}
      sections={sections()}
      label={getLabel()}
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
      prop: 'size',
      type: 'number',
      initialValue: 120,
      step: 10,
      min: 60,
      max: 400,
      libraryValue: 120,
    },
    {
      prop: 'thickness',
      type: 'number',
      initialValue: 12,
      step: 1,
      min: 1,
      max: 40,
      libraryValue: 12,
    },
    {
      prop: 'roundCaps',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'rootColor',
      type: 'color',
      initialValue: 'gray',
      libraryValue: 'gray',
    },
    {
      prop: 'transitionDuration',
      type: 'number',
      initialValue: 0,
      step: 50,
      min: 0,
      max: 2000,
      libraryValue: 0,
    },
    {
      prop: 'showLabel',
      type: 'boolean',
      initialValue: true,
      libraryValue: false,
    },
    {
      prop: 'labelText',
      type: 'string',
      initialValue: '70%',
      libraryValue: '',
    },
    {
      prop: 'section1Value',
      type: 'number',
      initialValue: 40,
      step: 5,
      min: 0,
      max: 100,
      libraryValue: 40,
    },
    {
      prop: 'section1Color',
      type: 'color',
      initialValue: 'cyan',
      libraryValue: 'cyan',
    },
    {
      prop: 'section2Value',
      type: 'number',
      initialValue: 15,
      step: 5,
      min: 0,
      max: 100,
      libraryValue: 15,
    },
    {
      prop: 'section2Color',
      type: 'color',
      initialValue: 'orange',
      libraryValue: 'orange',
    },
    {
      prop: 'section3Value',
      type: 'number',
      initialValue: 15,
      step: 5,
      min: 0,
      max: 100,
      libraryValue: 15,
    },
    {
      prop: 'section3Color',
      type: 'color',
      initialValue: 'grape',
      libraryValue: 'grape',
    },
  ],
};
