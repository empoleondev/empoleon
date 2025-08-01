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

export function ConfirmModal({
  id,
  cancelProps,
  confirmProps,
  labels = { cancel: '', confirm: '' },
  closeOnConfirm = true,
  closeOnCancel = true,
  groupProps,
  onCancel,
  onConfirm,
  children,
}: ConfirmModalProps) {
  const { cancel: cancelLabel, confirm: confirmLabel } = labels;
  const ctx = useModals();

  const handleCancel = (event: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }) => {
    typeof cancelProps?.onClick === 'function' && cancelProps?.onClick(event);
    typeof onCancel === 'function' && onCancel();
    closeOnCancel && ctx.closeModal(id!);
  };

  const handleConfirm = (event: MouseEvent & { currentTarget: HTMLButtonElement; target: Element }) => {
    typeof confirmProps?.onClick === 'function' && confirmProps?.onClick(event);
    typeof onConfirm === 'function' && onConfirm();
    closeOnConfirm && ctx.closeModal(id!);
  };

  return (
    <>
      {children && <Box mb="md">{children}</Box>}

      <Group mt={children ? 0 : 'md'} justify="flex-end" {...groupProps}>
        <Button variant="default" {...cancelProps} onClick={handleCancel}>
          {cancelProps?.children || cancelLabel}
        </Button>

        <Button {...confirmProps} onClick={handleConfirm}>
          {confirmProps?.children || confirmLabel}
        </Button>
      </Group>
    </>
  );
}
