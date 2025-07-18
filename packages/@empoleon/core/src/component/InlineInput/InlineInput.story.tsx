import { JSX } from 'solid-js';
import { InlineInput, InlineInputProps } from './InlineInput';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'InlineInput',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

const defaultProps: InlineInputProps = {
  __staticSelector: 'InlineInput',
  __stylesApiProps: {},
  label: 'Label',
  description: 'Description',
  error: 'Error',
  id: 'id',
  disabled: false,
  size: 'sm',
  labelPosition: 'left',
  children: <input type="checkbox" style={{ order: 2 }} />,
};

export function Usage() {
  return (
    <div style={{ 'padding': '40px' }}>
      <InlineInput {...defaultProps} labelPosition="right" />
      <InlineInput {...defaultProps} labelPosition="left" />
    </div>
  );
}
