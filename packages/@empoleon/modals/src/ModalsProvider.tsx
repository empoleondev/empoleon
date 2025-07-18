import { createSignal, createMemo, JSX } from 'solid-js';
import { getDefaultZIndex, Modal } from '@empoleon/core';
import { randomId } from '@empoleon/hooks';
import { ConfirmModal } from './ConfirmModal';
import {
  ConfirmLabels,
  ContextModalProps,
  ModalsContext,
  ModalsContextProps,
  ModalSettings,
  OpenConfirmModal,
  OpenContextModal,
} from './context';
import { useModalsEvents } from './events';
import { modalsReducer, ModalsState } from './reducer';

export interface ModalsProviderProps {
  /** Your app */
  children?: JSX.Element;

  /** Predefined modals */
  modals?: Record<string, (props: ContextModalProps<any>) => JSX.Element>;

  /** Shared Modal component props, applied for every modal */
  modalProps?: ModalSettings;

  /** Confirm modal labels */
  labels?: ConfirmLabels;
}

function separateConfirmModalProps(props: OpenConfirmModal) {
  if (!props) {
    return { confirmProps: {}, modalProps: {} };
  }

  const {
    id,
    children,
    onCancel,
    onConfirm,
    closeOnConfirm,
    closeOnCancel,
    cancelProps,
    confirmProps,
    groupProps,
    labels,
    ...others
  } = props;

  return {
    confirmProps: {
      id,
      children,
      onCancel,
      onConfirm,
      closeOnConfirm,
      closeOnCancel,
      cancelProps,
      confirmProps,
      groupProps,
      labels,
    },
    modalProps: {
      id,
      ...others,
    },
  };
}

export function ModalsProvider({ children, modalProps, labels, modals }: ModalsProviderProps) {
  const [state, setState] = createSignal<ModalsState>({ modals: [], current: null });

  const closeAll = (canceled?: boolean) => {
    setState(modalsReducer(state(), { type: 'CLOSE_ALL', canceled }));
  };

  const openModal = ({ modalId, ...props }: ModalSettings) => {
  const id = modalId || randomId();

    setState(modalsReducer(state(), {
      type: 'OPEN',
      modal: {
        id,
        type: 'content',
        props,
      },
    }));
    return id;
  };

  const openConfirmModal = ({ modalId, ...props }: OpenConfirmModal) => {
    const id = modalId || randomId();
    setState(modalsReducer(state(), {
      type: 'OPEN',
      modal: {
        id,
        type: 'confirm',
        props,
      },
    }));
    return id;
  };

  const openContextModal = (modal: string, { modalId, ...props }: OpenContextModal) => {
    const id = modalId || randomId();
    setState(modalsReducer(state(), {
      type: 'OPEN',
      modal: {
        id,
        type: 'context',
        props,
        ctx: modal,
      },
    }));
    return id;
  };

  const closeModal = (id: string, canceled?: boolean) => {
    setState(modalsReducer(state(), { type: 'CLOSE', modalId: id, canceled }));
  };

  const updateModal = ({ modalId, ...newProps }: Partial<ModalSettings> & { modalId: string }) => {
    setState(modalsReducer(state(), {
      type: 'UPDATE',
      modalId,
      newProps,
    }));
  };

  const updateContextModal = ({ modalId, ...newProps }: { modalId: string } & Partial<OpenContextModal<any>>) => {
    setState(modalsReducer(state(), { type: 'UPDATE', modalId, newProps }));
  };

  useModalsEvents({
    openModal,
    openConfirmModal,
    openContextModal: ({ modal, ...payload }: any) => openContextModal(modal, payload),
    closeModal,
    closeContextModal: closeModal,
    closeAllModals: closeAll,
    updateModal,
    updateContextModal,
  });

  const ctx: ModalsContextProps = {
    modalProps: modalProps || {},
    modals: state().modals,
    openModal,
    openConfirmModal,
    openContextModal,
    closeModal,
    closeContextModal: closeModal,
    closeAll,
    updateModal,
    updateContextModal,
  };

  const getCurrentModal = () => {
    const currentModal = state().current;
    switch (currentModal?.type) {
      case 'context': {
        const { innerProps, ...rest } = currentModal.props;
        const ContextModal = modals![currentModal.ctx];

        return {
          modalProps: rest,
          content: <ContextModal innerProps={innerProps} context={ctx} id={currentModal.id} />,
        };
      }
      case 'confirm': {
        const { modalProps: separatedModalProps, confirmProps: separatedConfirmProps } =
          separateConfirmModalProps(currentModal.props);

        return {
          modalProps: separatedModalProps,
          content: (
            <ConfirmModal
              {...separatedConfirmProps}
              id={currentModal.id}
              labels={currentModal.props.labels || labels}
            />
          ),
        };
      }
      case 'content': {
        const { children: currentModalChildren, ...rest } = currentModal.props;

        return {
          modalProps: rest,
          content: currentModalChildren,
        };
      }
      default: {
        return {
          modalProps: {},
          content: null,
        };
      }
    }
  };

  const { modalProps: currentModalProps, content } = getCurrentModal();

  return (
    <ModalsContext.Provider value={ctx}>
      <Modal
        zIndex={getDefaultZIndex('modal') + 1}
        {...modalProps}
        {...currentModalProps}
        opened={state().modals.length > 0}
        onClose={() => closeModal(state().current?.id as any)}
      >
        {content}
      </Modal>

      {children}
    </ModalsContext.Provider>
  );
}
