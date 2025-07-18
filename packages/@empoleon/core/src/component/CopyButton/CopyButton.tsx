import { JSX } from 'solid-js';
import { useClipboard } from '@empoleon/hooks';
import { useProps } from '../../core';

export interface CopyButtonProps {
  /** Children callback, provides current status and copy function as an argument */
  children: (payload: { copied: boolean; copy: () => void }) => JSX.Element;

  /** Value that will be copied to the clipboard when the button is clicked */
  value: string;

  /** Copied status timeout in ms, `1000` by default */
  timeout?: number;
}

const defaultProps: Partial<CopyButtonProps> = {
  timeout: 1000,
};

export function CopyButton(props: CopyButtonProps) {
  const { children, timeout, value, ...others } = useProps('CopyButton', defaultProps, props);
  const clipboard = useClipboard({ timeout });
  const copy = () => clipboard.copy(value);
  return <>{children({ copy, copied: clipboard.copied(), ...others })}</>;
}

CopyButton.displayName = '@empoleon/core/CopyButton';
