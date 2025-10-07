import { Skeleton, SkeletonProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Wrapper(props: Partial<SkeletonProps>) {
  return (
    <div>
      <Skeleton height="50px" circle mb="xl" {...props} />
      <Skeleton height="8px" radius="xl" {...props} />
      <Skeleton height="8px" mt={6} radius="xl" {...props} />
      <Skeleton height="8px" mt={6} width="70%" radius="xl" {...props} />
    </div>
  );
}

const code = (props: any) => `
  import { Skeleton } from '@empoleon/core';

  function Demo() {
    return (
      <>
        <Skeleton${props.animate ? '' : ' animate={false}'} height={50} circle mb="xl" />
        <Skeleton${props.animate ? '' : ' animate={false}'} height={8} radius="xl" />
        <Skeleton${props.animate ? '' : ' animate={false}'} height={8} mt={6} radius="xl" />
        <Skeleton${
          props.animate ? '' : ' animate={false}'
        } height={8} mt={6} width="70%" radius="xl" />
      </>
    );
  }
  `;

export const configurator: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [{ prop: 'animate', type: 'boolean', initialValue: true, libraryValue: '__' }],
};
