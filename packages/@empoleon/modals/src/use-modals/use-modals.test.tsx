import { render, renderHook, screen } from '@solidjs/testing-library';
import { createEffect, onMount, ParentProps } from 'solid-js';
import { EmpoleonProvider } from '@empoleon/core';
import { ContextModalProps } from '../context';
import { ModalsProvider } from '../ModalsProvider';
import { useModals } from './use-modals';

describe('@empoleon/modals/use-modals', () => {
  // mock otherwise will get an error
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  it('returns context value of ModalsProvider', () => {
    const wrapper = (props: ParentProps) => (
      <EmpoleonProvider>
        <ModalsProvider>{props.children}</ModalsProvider>
      </EmpoleonProvider>
    );

    const hook = renderHook(() => useModals(), { wrapper });
    const current = hook.result;

    expect(current.closeAll).toBeDefined();
    expect(current.closeModal).toBeDefined();
    expect(current.closeContextModal).toBeDefined();
    expect(current.modals).toBeDefined();
    expect(current.openConfirmModal).toBeDefined();
    expect(current.openContextModal).toBeDefined();
    expect(current.openModal).toBeDefined();
  });

  it('correctly passes innerProps to a context modal', () => {
    const ContextModal = ({ innerProps }: ContextModalProps<{ text: string }>) => (
      <div>{innerProps.text}</div>
    );

    const testContent = 'context-modal-test-content';
    const Component = () => {
      const modals = useModals();

      onMount(() => {
        modals.openContextModal('contextTest', {
          innerProps: { text: testContent },
          transitionProps: { duration: 0 },
        });
      });

      return <div>Empty</div>;
    };

    render(() => (
      <EmpoleonProvider>
        <ModalsProvider modals={{ contextTest: ContextModal }}>
          <Component />
        </ModalsProvider>
      </EmpoleonProvider>
    ));

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it('correctly renders a confirm modal with labels from the provider', () => {
    const Component = () => {
      const modals = useModals();

      onMount(() => {
        modals.openConfirmModal({ transitionProps: { duration: 0 } });
      });

      return <div>Empty</div>;
    };

    render(() => (
      <EmpoleonProvider>
        <ModalsProvider labels={{ cancel: 'ProviderCancel', confirm: 'ProviderConfirm' }}>
          <Component />
        </ModalsProvider>
      </EmpoleonProvider>
    ));

    expect(screen.getByText('ProviderCancel')).toBeInTheDocument();
    expect(screen.getByText('ProviderConfirm')).toBeInTheDocument();
  });

  it('correctly renders a confirm modal with overwritten provider labels', () => {
    const Component = () => {
      const modals = useModals();

      onMount(() => {
        modals.openConfirmModal({
          labels: { confirm: 'Confirm', cancel: 'Cancel' },
          transitionProps: { duration: 0 },
        });
      });

      return <div>Empty</div>;
    };

    render(() => (
      <EmpoleonProvider>
        <ModalsProvider labels={{ cancel: 'ProviderCancel', confirm: 'ProviderConfirm' }}>
          <Component />
        </ModalsProvider>
      </EmpoleonProvider>
    ));

    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('correctly renders a confirm modal with labels as HTMLElement', () => {
    const Component = () => {
      const modals = useModals();

      onMount(() => {
        modals.openConfirmModal({
          labels: {
            confirm: <span>Confirm</span>,
            cancel: <span>Cancel</span>,
          },
          transitionProps: { duration: 0 },
        });
      });

      return <div>Empty</div>;
    };

    render(() => (
      <EmpoleonProvider>
        <ModalsProvider>
          <Component />
        </ModalsProvider>
      </EmpoleonProvider>
    ));

    expect(screen.getByText('Confirm')).toContainHTML('span');
    expect(screen.getByText('Cancel')).toContainHTML('span');
  });

  it('correctly renders a regular modal with children and a title', () => {
    const Component = () => {
      const modals = useModals();

      onMount(() => {
        modals.openModal({
          title: 'Test title',
          children: <h1>Children</h1>,
          transitionProps: { duration: 0 },
        });
      });

      return <div>Empty</div>;
    };

    render(() => (
      <EmpoleonProvider>
        <ModalsProvider>
          <Component />
        </ModalsProvider>
      </EmpoleonProvider>
    ));

    expect(screen.getByText('Test title')).toBeInTheDocument();
    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
