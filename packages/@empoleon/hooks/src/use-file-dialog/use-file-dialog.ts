import { createSignal, createEffect, onCleanup } from 'solid-js';

export interface UseFileDialogOptions {
  /** Determines whether multiple files are allowed, `true` by default */
  multiple?: boolean;

  /** `accept` attribute of the file input, '*' by default */
  accept?: string;

  /** `capture` attribute of the file input */
  capture?: string;

  /** Determines whether the user can pick a directory instead of file, `false` by default */
  directory?: boolean;

  /** Determines whether the file input state should be reset when the file dialog is opened, `false` by default */
  resetOnOpen?: boolean;

  /** Initial selected files */
  initialFiles?: FileList | File[];

  /** Called when files are selected */
  onChange?: (files: FileList | null) => void;

  /** Called when file dialog is canceled */
  onCancel?: () => void;
}

const defaultOptions: UseFileDialogOptions = {
  multiple: true,
  accept: '*',
};

function getInitialFilesList(files: UseFileDialogOptions['initialFiles']): FileList | null {
  if (!files) {
    return null;
  }

  if (files instanceof FileList) {
    return files;
  }

  const result = new DataTransfer();
  for (const file of files) {
    result.items.add(file);
  }

  return result.files;
}

function createInput(options: UseFileDialogOptions) {
  if (typeof document === 'undefined') {
    return null;
  }

  const input = document.createElement('input');
  input.type = 'file';

  if (options.accept) {
    input.accept = options.accept;
  }

  if (options.multiple) {
    input.multiple = options.multiple;
  }

  if (options.capture) {
    input.capture = options.capture;
  }

  if (options.directory) {
    input.webkitdirectory = options.directory;
  }

  input.style.display = 'none';
  return input;
}

export function useFileDialog(input: UseFileDialogOptions = {}) {
  const options: UseFileDialogOptions = { ...defaultOptions, ...input };
  const [files, setFiles] = createSignal<FileList | null>(getInitialFilesList(options.initialFiles));
  let inputRef: HTMLInputElement | null = null;

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target?.files) {
      setFiles(target.files);
      options.onChange?.(target.files);
    }
  };

  const createAndSetupInput = () => {
    inputRef?.remove();
    inputRef = createInput(options);

    if (inputRef) {
      inputRef.addEventListener('change', handleChange, { once: true });
      document.body.appendChild(inputRef);
    }
  };

  createEffect(() => {
    createAndSetupInput();
    onCleanup(() => inputRef?.remove());
  });

  const reset = () => {
    setFiles(null);
    options.onChange?.(null);
  };

  const open = () => {
    if (options.resetOnOpen) {
      reset();
    }

    createAndSetupInput();
    inputRef?.click();
  };

  return { files, open, reset };
}
