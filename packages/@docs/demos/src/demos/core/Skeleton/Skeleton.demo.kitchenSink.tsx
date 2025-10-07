import { Skeleton, SkeletonProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Wrapper(props: Partial<SkeletonProps>) {
  return (
    <div>
      <Skeleton {...props} />
    </div>
  );
}

const code = (props: any) => `
import { Skeleton } from '@empoleon/core';

function Demo() {
  return (
    <>
      <Skeleton
        height={${props.circle ? props.height : 50}}${props.circle ? '\n        circle' : ''}${
          !props.animate ? '\n        animate={false}' : ''
        }${props.visible !== undefined && !props.visible ? '\n        visible={false}' : ''}${
          props.width && props.width !== '100%' ? `\n        width="${props.width}"` : ''
        }${props.radius && props.radius !== 'sm' ? `\n        radius="${props.radius}"` : ''}
        mb="xl"
      />
    </>
  );
}
`;

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'height',
      type: 'number',
      initialValue: 50,
      libraryValue: '__',
      min: 10,
      max: 200,
      step: 5,
    },
    {
      prop: 'width',
      type: 'select',
      initialValue: '100%',
      libraryValue: '__',
      data: [
        { label: '100%', value: '100%' },
        { label: '90%', value: '90%' },
        { label: '80%', value: '80%' },
        { label: '70%', value: '70%' },
        { label: '50%', value: '50%' },
        { label: '200px', value: '200px' },
        { label: '300px', value: '300px' },
      ],
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'circle',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'animate',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'visible',
      type: 'boolean',
      initialValue: true,
      libraryValue: '__',
    },
  ],
};
