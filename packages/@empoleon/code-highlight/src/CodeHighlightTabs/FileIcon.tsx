import { JSX } from 'solid-js';

interface FileIconProps {
  fileName: string | undefined;
  getFileIcon?: ((fileName: string) => JSX.Element) | undefined;
  fileIcon: JSX.Element | undefined;
  className?: string;
  style?: JSX.CSSProperties;
}

export function FileIcon(props: FileIconProps) {
  if (props.fileIcon) {
    return (
      <span class={props.className} style={props.style}>
        {props.fileIcon}
      </span>
    );
  }

  if (props.getFileIcon && props.fileName) {
    return (
      <span class={props.className} style={props.style}>
        {props.getFileIcon(props.fileName)}
      </span>
    );
  }

  return null;
}
