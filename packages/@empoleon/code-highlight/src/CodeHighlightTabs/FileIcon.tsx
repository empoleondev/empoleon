import { JSX } from "solid-js";

interface FileIconProps {
  fileName: string | undefined;
  getFileIcon?: ((fileName: string) => JSX.Element) | undefined;
  fileIcon: JSX.Element | undefined;
  className?: string;
  style?: JSX.CSSProperties;
}

export function FileIcon({ fileIcon, fileName, getFileIcon, className, style }: FileIconProps) {
  if (fileIcon) {
    return (
      <span class={className} style={style}>
        {fileIcon}
      </span>
    );
  }

  if (getFileIcon && fileName) {
    return (
      <span class={className} style={style}>
        {getFileIcon(fileName)}
      </span>
    );
  }

  return null;
}
