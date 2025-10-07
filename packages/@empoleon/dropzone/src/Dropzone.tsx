import { JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  EmpoleonColor,
  EmpoleonRadius,
  factory,
  Factory,
  getRadius,
  LoaderProps,
  LoadingOverlay,
  StylesApiProps,
  useProps,
  useStyles,
} from '@empoleon/core';
import { assignRef } from '@empoleon/hooks';
import {
  Accept,
  DropEvent,
  FileError,
  FileRejection,
  FileWithPath,
  useDropzone,
} from '@empoleon/solid-dropzone';
import { DropzoneProvider } from './Dropzone.context';
import type { DropzoneFullScreenType } from './DropzoneFullScreen';
import { DropzoneAccept, DropzoneIdle, DropzoneReject } from './DropzoneStatus';
import classes from './Dropzone.module.css';

export type DropzoneStylesNames = 'root' | 'inner';
export type DropzoneVariant = 'filled' | 'light';
export type DropzoneCssVariables = {
  root:
    | '--dropzone-radius'
    | '--dropzone-accept-color'
    | '--dropzone-accept-bg'
    | '--dropzone-reject-color'
    | '--dropzone-reject-bg';
};

export interface DropzoneProps
  extends BoxProps,
    StylesApiProps<DropzoneFactory>,
    ElementProps<'div', 'onDrop'> {
  /** Key of `theme.colors` or any valid CSS color to set colors of `Dropzone.Accept`, `theme.primaryColor` by default */
  acceptColor?: EmpoleonColor;

  /** Key of `theme.colors` or any valid CSS color to set colors of `Dropzone.Reject`, `'red'` by default */
  rejectColor?: EmpoleonColor;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Determines whether files capturing should be disabled, `false` by default */
  disabled?: boolean;

  /** Called when any files are dropped to the dropzone */
  onDropAny?: (files: FileWithPath[], fileRejections: FileRejection[]) => void;

  /** Called when valid files are dropped to the dropzone */
  onDrop: (files: FileWithPath[]) => void;

  /** Called when dropped files do not meet file restrictions */
  onReject?: (fileRejections: FileRejection[]) => void;

  /** Determines whether a loading overlay should be displayed over the dropzone, `false` by default */
  loading?: boolean;

  /** Mime types of the files that dropzone can accepts. By default, dropzone accepts all file types. */
  accept?: Accept | string[];

  /** A ref function which when called opens the file system file picker */
  openRef?: (ref: () => void | undefined) => void;

  /** Determines whether multiple files can be dropped to the dropzone or selected from file system picker, `true` by default */
  multiple?: boolean;

  /** Maximum file size in bytes */
  maxSize?: number;

  /** Name of the form control. Submitted with the form as part of a name/value pair. */
  name?: string;

  /** Maximum number of files that can be picked at once */
  maxFiles?: number;

  /** Set to autofocus the root element */
  autoFocus?: boolean;

  /** If `false`, disables click to open the native file selection dialog */
  activateOnClick?: boolean;

  /** If `false`, disables drag 'n' drop */
  activateOnDrag?: boolean;

  /** If `false`, disables Space/Enter to open the native file selection dialog. Note that it also stops tracking the focus state. */
  activateOnKeyboard?: boolean;

  /** If `false`, stops drag event propagation to parents */
  dragEventsBubbling?: boolean;

  /** Called when the `dragenter` event occurs */
  onDragEnter?: (event: DragEvent) => void;

  /** Called when the `dragleave` event occurs */
  onDragLeave?: (event: DragEvent) => void;

  /** Called when the `dragover` event occurs */
  onDragOver?: (event: DragEvent) => void;

  /** Called when user closes the file selection dialog with no selection */
  onFileDialogCancel?: () => void;

  /** Called when user opens the file selection dialog */
  onFileDialogOpen?: () => void;

  /** If `false`, allow dropped items to take over the current browser window */
  preventDropOnDocument?: boolean;

  /** Set to true to use the File System Access API to open the file picker instead of using an <input type="file"> click event, defaults to true */
  useFsAccessApi?: boolean;

  /** Use this to provide a custom file aggregator */
  getFilesFromEvent?: (event: DropEvent) => Promise<FileWithPath[]>;

  /** Custom validation function. It must return null if there's no errors. */
  validator?: <T extends File>(file: T) => FileError | FileError[] | null;

  /** Determines whether pointer events should be enabled on the inner element, `false` by default */
  enablePointerEvents?: boolean;

  /** Props passed down to the Loader component */
  loaderProps?: LoaderProps;

  /** Props passed down to the internal Input component */
  inputProps?: JSX.InputHTMLAttributes<HTMLInputElement>;
}

export type DropzoneFactory = Factory<{
  props: DropzoneProps;
  ref: HTMLDivElement;
  stylesNames: DropzoneStylesNames;
  vars: DropzoneCssVariables;
  staticComponents: {
    Accept: typeof DropzoneAccept;
    Idle: typeof DropzoneIdle;
    Reject: typeof DropzoneReject;
    FullScreen: DropzoneFullScreenType;
  };
}>;

const defaultProps = {
  multiple: true,
  maxSize: Infinity,
  activateOnClick: true,
  activateOnDrag: true,
  dragEventsBubbling: true,
  activateOnKeyboard: true,
  useFsAccessApi: true,
  variant: 'light',
  rejectColor: 'red',
} satisfies Partial<DropzoneProps>;

const varsResolver = createVarsResolver<DropzoneFactory>((theme, props) => {
  const acceptColors = theme.variantColorResolver({
    color: props.acceptColor || theme.primaryColor,
    theme,
    variant: props.variant!,
  });

  const rejectColors = theme.variantColorResolver({
    color: props.rejectColor || 'red',
    theme,
    variant: props.variant!,
  });

  return {
    root: {
      '--dropzone-radius': getRadius(props.radius),
      '--dropzone-accept-color': acceptColors.color,
      '--dropzone-accept-bg': acceptColors.background,
      '--dropzone-reject-color': rejectColors.color,
      '--dropzone-reject-bg': rejectColors.background,
    },
  };
});

export const Dropzone = factory<DropzoneFactory>((_props) => {
  const props = useProps('Dropzone', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'radius',
    'disabled',
    'loading',
    'multiple',
    'maxSize',
    'accept',
    'children',
    'onDropAny',
    'onDrop',
    'onReject',
    'openRef',
    'name',
    'maxFiles',
    'autoFocus',
    'activateOnClick',
    'activateOnDrag',
    'dragEventsBubbling',
    'activateOnKeyboard',
    'onDragEnter',
    'onDragLeave',
    'onDragOver',
    'onFileDialogCancel',
    'onFileDialogOpen',
    'preventDropOnDocument',
    'useFsAccessApi',
    'getFilesFromEvent',
    'validator',
    'rejectColor',
    'acceptColor',
    'enablePointerEvents',
    'loaderProps',
    'inputProps',
    'mod',
    'attributes',
    'ref',
  ]);

  const getStyles = useStyles<DropzoneFactory>({
    name: 'Dropzone',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  const dropzone = useDropzone({
    onDrop: local.onDropAny,
    onDropAccepted: local.onDrop,
    onDropRejected: local.onReject,
    disabled: local.disabled || local.loading,
    accept: Array.isArray(local.accept)
      ? local.accept.reduce((r, key) => ({ ...r, [key]: [] }), {})
      : local.accept,
    multiple: local.multiple,
    maxSize: local.maxSize,
    maxFiles: local.maxFiles,
    autoFocus: local.autoFocus,
    noClick: !local.activateOnClick,
    noDrag: !local.activateOnDrag,
    noDragEventsBubbling: !local.dragEventsBubbling,
    noKeyboard: !local.activateOnKeyboard,
    onDragEnter: local.onDragEnter,
    onDragLeave: local.onDragLeave,
    onDragOver: local.onDragOver,
    onFileDialogCancel: local.onFileDialogOpen,
    onFileDialogOpen: local.onFileDialogOpen,
    preventDropOnDocument: local.preventDropOnDocument,
    useFsAccessApi: local.useFsAccessApi,
    validator: local.validator,
    ...(local.getFilesFromEvent ? { getFilesFromEvent: local.getFilesFromEvent } : null),
  });

  assignRef(local.openRef, dropzone.open);

  const isIdle = !dropzone.isDragAccept() && !dropzone.isDragReject();

  return (
    <DropzoneProvider
      value={{ accept: dropzone.isDragAccept(), reject: dropzone.isDragReject(), idle: isIdle }}
    >
      <Box
        {...dropzone.getRootProps()}
        {...getStyles('root', { focusable: true })}
        {...others}
        mod={[
          {
            accept: dropzone.isDragAccept(),
            reject: dropzone.isDragReject(),
            idle: isIdle,
            disabled: local.disabled,
            loading: local.loading,
            'activate-on-click': local.activateOnClick,
          },
          local.mod,
        ]}
      >
        <LoadingOverlay
          visible={local.loading}
          overlayProps={{ radius: local.radius }}
          unstyled={local.unstyled}
          loaderProps={local.loaderProps}
        />
        <input {...dropzone.getInputProps(local.inputProps)} name={local.name} />
        <div
          {...getStyles('inner')}
          ref={local.ref}
          data-enable-pointer-events={local.enablePointerEvents || undefined}
        >
          {local.children}
        </div>
      </Box>
    </DropzoneProvider>
  );
});

Dropzone.classes = classes;
Dropzone.displayName = '@empoleon/dropzone/Dropzone';
Dropzone.Accept = DropzoneAccept;
Dropzone.Idle = DropzoneIdle;
Dropzone.Reject = DropzoneReject;
