import { JSX, splitProps } from 'solid-js';
import { useProps } from '../../core';

export interface FileButtonProps<Multiple extends boolean = false> {
  /** Called when files are picked */
  onChange: (payload: Multiple extends true ? File[] : File | null) => void;

  /** Function that receives button props and returns react node that should be rendered */
  children: (props: { onClick: () => void }) => JSX.Element;

  /** Determines whether user can pick more than one file */
  multiple?: Multiple;

  /** File input accept attribute, for example, `"image/png,image/jpeg"` */
  accept?: string;

  /** Input name attribute */
  name?: string;

  /** Input form attribute */
  form?: string;

  /** Reference of the function that should be called when value changes to null or empty array */
  resetRef?: (fn: () => void) => void;

  /** Disables file picker */
  disabled?: boolean;

  /** Specifies that, optionally, a new file should be captured, and which device should be used to capture that new media of a type defined by the accept attribute. */
  capture?: boolean | 'user' | 'environment';

  /** Passes down props to the input element used to capture files */
  inputProps?: JSX.HTMLAttributes<HTMLInputElement>;

  /** Ref callback for the underlying file `<input>` */
  ref?: (el: HTMLInputElement) => void;
}

const defaultProps = {
  multiple: false as any,
} satisfies Partial<FileButtonProps>;

export function FileButton<Multiple extends boolean = false>(_props: FileButtonProps<Multiple>) {
  const props = useProps('FileButton', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'onChange',
    'children',
    'multiple',
    'accept',
    'name',
    'form',
    'resetRef',
    'disabled',
    'capture',
    'inputProps',
    'ref',
  ]);

  let inputRef: HTMLInputElement | undefined;

  const onClick = () => {
    if (!local.disabled && inputRef) {
      inputRef.click();
    }
  };

  const handleChange: JSX.EventHandler<HTMLInputElement, Event> = (event) => {
    const files = (event.currentTarget as HTMLInputElement).files;
    if (!files) {return};

    if (local.multiple) {
      local.onChange(Array.from(files) as any);
    } else {
      local.onChange((files[0] || null) as any);
    }
  };

  // expose reset function
  const reset = () => {
    if (inputRef) {
      inputRef.value = '';
    }
  };
  if (local.resetRef) {
    local.resetRef(reset);
  }

  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        accept={local.accept}
        multiple={local.multiple}
        onChange={handleChange}
        ref={(el) => {
          inputRef = el!;
          local.ref?.(el!);
        }}
        name={local.name}
        form={local.form}
        capture={local.capture === true ? 'environment' : local.capture || undefined}
        {...local.inputProps}
      />

      {local.children({ onClick, ...others })}
    </>
  );
}

FileButton.displayName = '@empoleon/core/FileButton';
