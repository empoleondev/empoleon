export { ModalsProvider } from './ModalsProvider';
export { useModals } from './use-modals/use-modals';
export {
  openModal,
  closeModal,
  closeAllModals,
  openConfirmModal,
  openContextModal,
  updateModal,
  updateContextModal,
  modals,
} from './events.js';

export type { ModalsProviderProps } from './ModalsProvider';
export type {
  ContextModalProps,
  EmpoleonModalsOverride,
  EmpoleonModals,
  EmpoleonModal,
} from './context.js';
