import { JSX } from 'solid-js';
import { CopyButton } from './CopyButton';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'CopyButton',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <CopyButton value="empoleon.dev" timeout={1000}>
      {({ copied, copy }) => (
        <button type="button" style={{ color: copied ? 'teal' : 'blue' }} onClick={copy}>
          {copied ? 'Copied to clipboard' : 'Copy to clipboard'}
        </button>
      )}
    </CopyButton>
  );
}
