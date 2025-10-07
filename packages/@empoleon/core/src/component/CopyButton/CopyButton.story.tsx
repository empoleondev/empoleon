import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { CopyButton } from './CopyButton';

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
