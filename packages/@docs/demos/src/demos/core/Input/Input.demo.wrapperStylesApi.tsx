import { Input } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { InputWrapperStylesApi } from '@docs/styles-api';

const code = `
import { Input } from '@empoleon/core';

function Demo() {
  return <Input.Wrapper{{props}} label="Input label" description="Input description" error="Input error" withAsterisk />;
}
`;

function Demo(props: any) {
  return (
    <Input.Wrapper
      label="Input label"
      description="Input description"
      error="Input error"
      withAsterisk
      {...props}
    >
      <Input placeholder="Input" />
    </Input.Wrapper>
  );
}

export const wrapperStylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: InputWrapperStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
