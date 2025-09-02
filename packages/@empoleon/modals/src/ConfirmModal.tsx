import { JSX } from 'solid-js';
import { Box, Button, ButtonProps, Group, GroupProps } from '@empoleon/core';
import { ConfirmLabels } from './context';
import { useModals } from './use-modals/use-modals';

export interface ConfirmModalProps {
  id?: string;
  children?: JSX.Element;
  onCancel?: () => void;
  onConfirm?: () => void;
  closeOnConfirm?: boolean;
  closeOnCancel?: boolean;
  cancelProps?: ButtonProps &
    JSX.ButtonHTMLAttributes<HTMLButtonElement> &
    Record<`data-${string}`, string>;
  confirmProps?: ButtonProps &
    JSX.ButtonHTMLAttributes<HTMLButtonElement> &
    Record<`data-${string}`, string>;
  groupProps?: GroupProps;
  labels?: ConfirmLabels;
}

export function ConfirmModal(props: ConfirmModalProps) {
  const labels = props.labels || { cancel: '', confirm: '' };

  const { cancel: cancelLabel, confirm: confirmLabel } = labels;
  const ctx = useModals();

  const handleCancel = (event: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }) => {
    typeof props.cancelProps?.onClick === 'function' && props.cancelProps?.onClick(event);
    typeof props.onCancel === 'function' && props.onCancel();
    (props.closeOnCancel !== false) && ctx.closeModal(props.id!);
  };

  const handleConfirm = (event: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }) => {
    typeof props.confirmProps?.onClick === 'function' && props.confirmProps?.onClick(event);
    typeof props.onConfirm === 'function' && props.onConfirm();
    (props.closeOnConfirm !== false) && ctx.closeModal(props.id!);
  };

  // No styling with children otherwise on transition will hide the content
  return (
    <>
      {props.children && <>{props.children}</>}

      <Group mt={props.children ? 0 : 'md'} justify="flex-end" {...props.groupProps}>
        <Button variant="default" {...props.cancelProps} onClick={handleCancel}>
          {props.cancelProps?.children || cancelLabel}
        </Button>

        <Button {...props.confirmProps} onClick={handleConfirm}>
          {props.confirmProps?.children || confirmLabel}
        </Button>
      </Group>
    </>
  );
}
