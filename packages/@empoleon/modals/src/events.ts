import { createUseExternalEvents } from '@empoleon/core';
import { randomId } from '@empoleon/hooks';
import {
  EmpoleonModal,
  EmpoleonModals,
  ModalSettings,
  OpenConfirmModal,
  OpenContextModal,
} from './context';

type ModalsEvents = {
  openModal: (payload: ModalSettings) => string;
  openConfirmModal: (payload: OpenConfirmModal) => string;
  openContextModal: <TKey extends EmpoleonModal>(
    payload: OpenContextModal<Parameters<EmpoleonModals[TKey]>[0]['innerProps']> & { modal: TKey }
  ) => string;
  closeModal: (id: string) => void;
  closeContextModal: <TKey extends EmpoleonModal>(id: TKey) => void;
  closeAllModals: () => void;
  updateModal: (payload: { modalId: string } & Partial<ModalSettings>) => void;
  updateContextModal: (payload: { modalId: string } & Partial<OpenContextModal<any>>) => void;
};

export const [useModalsEvents, createEvent] =
  createUseExternalEvents<ModalsEvents>('empoleon-modals');

export const openModal: ModalsEvents['openModal'] = (payload) => {
  const id = payload.modalId || randomId();
  createEvent('openModal')({ ...payload, modalId: id });
  return id;
};

export const openConfirmModal: ModalsEvents['openConfirmModal'] = (payload) => {
  const id = payload.modalId || randomId();
  createEvent('openConfirmModal')({ ...payload, modalId: id });
  return id;
};

export const openContextModal: ModalsEvents['openContextModal'] = <TKey extends EmpoleonModal>(
  payload: OpenContextModal<Parameters<EmpoleonModals[TKey]>[0]['innerProps']> & { modal: TKey }
) => {
  const id = payload.modalId || randomId();
  createEvent('openContextModal')({ ...payload, modalId: id });
  return id;
};

export const closeModal = createEvent('closeModal');

export const closeContextModal: ModalsEvents['closeContextModal'] = <TKey extends EmpoleonModal>(
  id: TKey
) => createEvent('closeContextModal')(id);

export const closeAllModals = createEvent('closeAllModals');

export const updateModal = (payload: { modalId: string } & Partial<ModalSettings>) =>
  createEvent('updateModal')(payload);

export const updateContextModal = (payload: { modalId: string } & Partial<OpenContextModal<any>>) =>
  createEvent('updateContextModal')(payload);

export const modals: {
  open: ModalsEvents['openModal'];
  close: ModalsEvents['closeModal'];
  closeAll: ModalsEvents['closeAllModals'];
  openConfirmModal: ModalsEvents['openConfirmModal'];
  openContextModal: ModalsEvents['openContextModal'];
  updateModal: ModalsEvents['updateModal'];
  updateContextModal: ModalsEvents['updateContextModal'];
} = {
  open: openModal,
  close: closeModal,
  closeAll: closeAllModals,
  openConfirmModal,
  openContextModal,
  updateModal,
  updateContextModal,
};
