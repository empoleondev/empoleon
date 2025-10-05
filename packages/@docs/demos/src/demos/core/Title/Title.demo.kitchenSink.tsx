import { Title, TitleProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Title } from '@empoleon/core';

function Demo() {
  return (
    <Title{{props}}>
      This is a customizable title
    </Title>
  );
}
`;

function Demo(props: TitleProps & {
  text?: string;
}) {
  return (
    <Title {...props}>
      {props.text}
    </Title>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: [
    {
      prop: 'order',
      type: 'select',
      initialValue: 1,
      libraryValue: 1,
      data: [
        { label: 'H1', value: 1 },
        { label: 'H2', value: 2 },
        { label: 'H3', value: 3 },
        { label: 'H4', value: 4 },
        { label: 'H5', value: 5 },
        { label: 'H6', value: 6 },
      ],
    },
    {
      prop: 'size',
      type: 'select',
      initialValue: undefined,
      libraryValue: undefined,
      data: [
        { label: 'Default (based on order)', value: undefined },
        { label: 'h1', value: 'h1' },
        { label: 'h2', value: 'h2' },
        { label: 'h3', value: 'h3' },
        { label: 'h4', value: 'h4' },
        { label: 'h5', value: 'h5' },
        { label: 'h6', value: 'h6' },
        { label: 'xs', value: 'xs' },
        { label: 'sm', value: 'sm' },
        { label: 'md', value: 'md' },
        { label: 'lg', value: 'lg' },
        { label: 'xl', value: 'xl' },
      ],
    },
    {
      prop: 'textWrap',
      type: 'select',
      initialValue: undefined,
      libraryValue: undefined,
      data: [
        { label: 'Default', value: undefined },
        { label: 'Wrap', value: 'wrap' },
        { label: 'Nowrap', value: 'nowrap' },
        { label: 'Balance', value: 'balance' },
        { label: 'Pretty', value: 'pretty' },
        { label: 'Stable', value: 'stable' },
      ],
    },
    {
      prop: 'lineClamp',
      type: 'number',
      initialValue: 3,
      libraryValue: 3,
      min: 1,
      max: 10,
      step: 1,
    },
    {
      prop: 'text',
      type: 'textarea',
      initialValue: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure doloremque quas dolorum. Quo amet earum alias consequuntur quam accusamus a quae beatae, odio, quod provident consectetur non repudiandae enim adipisci?',
      libraryValue: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure doloremque quas dolorum. Quo amet earum alias consequuntur quam accusamus a quae beatae, odio, quod provident consectetur non repudiandae enim adipisci?',
    },
  ],
};
