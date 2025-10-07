import { createContextContainer, render, tests } from '@empoleon-tests/core';
import { Modal, ModalProps, ModalStylesNames } from './Modal';
import { ModalBody, ModalBodyProps } from './ModalBody';
import { ModalCloseButton, ModalCloseButtonProps } from './ModalCloseButton';
import { ModalContent, ModalContentProps } from './ModalContent';
import { ModalHeader, ModalHeaderProps } from './ModalHeader';
import { ModalOverlay, ModalOverlayProps } from './ModalOverlay';
import { ModalRoot, ModalRootProps } from './ModalRoot';
import { ModalTitle, ModalTitleProps } from './ModalTitle';

const createModalContextContainer = (component: any) =>
  createContextContainer(component, ModalRoot, {
    opened: true,
    onClose: () => {},
    title: 'test-title',
    withinPortal: false,
  });

const BodyContainer = createModalContextContainer(ModalBody);
const CloseButtonContainer = createModalContextContainer(ModalCloseButton);
const ContentContainer = createModalContextContainer(ModalContent);
const HeaderContainer = createModalContextContainer(ModalHeader);
const OverlayContainer = createModalContextContainer(ModalOverlay);
const TitleContainer = createModalContextContainer(ModalTitle);

beforeEach(() => {
  window.scrollTo = vi.fn();
});

describe('@empoleon/core/Modal', () => {
  tests.itSupportsSystemProps<ModalProps, ModalStylesNames>({
    component: Modal,
    props: () => ({
      opened: true,
      onClose: () => {},
      title: 'test-title',
      withinPortal: false,
    }),
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/Modal',
    stylesApiSelectors: ['root', 'body', 'close', 'content', 'header', 'inner', 'overlay', 'title'],
    selector: '.empoleon-Modal-root',
    variantSelector: '.empoleon-Modal-root',
    sizeSelector: '.empoleon-Modal-root',
  });

  it('sets data-centered attribute when centered prop is passed', () => {
    const { container, rerender } = render(() => (
      <Modal opened={true} onClose={() => {}} title="test-title" withinPortal={false} centered />
    ));
    expect(container.querySelector('.empoleon-Modal-root')).toHaveAttribute('data-centered');

    rerender(() => (
      <Modal
        opened={true}
        onClose={() => {}}
        title="test-title"
        withinPortal={false}
        centered={false}
      />
    ));
    expect(container.querySelector('.empoleon-Modal-root')).not.toHaveAttribute('data-centered');
  });

  it('sets data-full-screen attribute when fullScreen prop is passed', () => {
    const { container, rerender } = render(() => (
      <Modal
        opened={true}
        onClose={() => {}}
        title="test-title"
        withinPortal={false}
        centered
        fullScreen
      />
    ));
    expect(container.querySelector('.empoleon-Modal-root')).toHaveAttribute('data-full-screen');

    rerender(() => (
      <Modal
        opened={true}
        onClose={() => {}}
        title="test-title"
        withinPortal={false}
        centered
        fullScreen={false}
      />
    ));
    expect(container.querySelector('.empoleon-Modal-root')).not.toHaveAttribute('data-full-screen');
  });

  it('does not render overlay when withOverlay is false', () => {
    const { container, rerender } = render(() => (
      <Modal
        opened={true}
        onClose={() => {}}
        title="test-title"
        withinPortal={false}
        centered
        withOverlay={false}
      />
    ));
    expect(container.querySelector('.empoleon-Modal-overlay')).not.toBeInTheDocument();

    rerender(() => (
      <Modal
        opened={true}
        onClose={() => {}}
        title="test-title"
        withinPortal={false}
        centered
        withOverlay
      />
    ));
    expect(container.querySelector('.empoleon-Modal-overlay')).toBeInTheDocument();
  });

  it('does not render header if title and withCloseButton are not provided', () => {
    const { container, rerender } = render(() => (
      <Modal
        opened={true}
        onClose={() => {}}
        withinPortal={false}
        centered
        title={null}
        withCloseButton
      />
    ));
    expect(container.querySelector('.empoleon-Modal-header')).toBeInTheDocument();

    rerender(() => (
      <Modal
        opened={true}
        onClose={() => {}}
        withinPortal={false}
        centered
        withCloseButton={false}
        title="test-title"
      />
    ));
    expect(container.querySelector('.empoleon-Modal-header')).toBeInTheDocument();

    rerender(() => (
      <Modal
        opened={true}
        onClose={() => {}}
        withinPortal={false}
        centered
        withCloseButton={false}
        title={null}
      />
    ));
    expect(container.querySelector('.empoleon-Modal-header')).not.toBeInTheDocument();
  });

  it('renders given title', () => {
    const { container } = render(() => (
      <Modal opened={true} onClose={() => {}} title="test-title" withinPortal={false} centered />
    ));
    expect(container.querySelector('.empoleon-Modal-title')?.textContent).toBe('test-title');
  });

  it('exposes compound components', () => {
    expect(Modal.Root).toBe(ModalRoot);
    expect(Modal.Overlay).toBe(ModalOverlay);
    expect(Modal.Content).toBe(ModalContent);
    expect(Modal.Body).toBe(ModalBody);
    expect(Modal.Header).toBe(ModalHeader);
    expect(Modal.Title).toBe(ModalTitle);
    expect(Modal.CloseButton).toBe(ModalCloseButton);
  });
});

describe('@empoleon/core/ModalRoot', () => {
  tests.itSupportsSystemProps<ModalRootProps, 'root'>({
    component: ModalRoot,
    props: () => ({
      opened: true,
      onClose: () => {},
      title: 'test-title',
      withinPortal: false,
    }),
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/ModalRoot',
    stylesApiSelectors: ['root'],
    selector: '.empoleon-Modal-root',
    variantSelector: '.empoleon-Modal-root',
    sizeSelector: '.empoleon-Modal-root',
    stylesApiName: 'Modal',
  });
});

describe('@empoleon/core/ModalBody', () => {
  tests.itSupportsSystemProps<ModalBodyProps>({
    component: BodyContainer,
    props: {},
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/ModalBody',
    selector: '.empoleon-Modal-body',
    variantSelector: '.empoleon-Modal-body',
    sizeSelector: '.empoleon-Modal-body',
  });
});

describe('@empoleon/core/ModalCloseButton', () => {
  tests.itSupportsSystemProps<ModalCloseButtonProps>({
    component: CloseButtonContainer,
    props: {},
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLButtonElement,
    displayName: '@empoleon/core/ModalCloseButton',
    selector: '.empoleon-Modal-close',
    variantSelector: '.empoleon-Modal-close',
    sizeSelector: '.empoleon-Modal-close',
  });
});

describe('@empoleon/core/ModalContent', () => {
  tests.itSupportsSystemProps<ModalContentProps>({
    component: ContentContainer,
    props: {},
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLElement,
    displayName: '@empoleon/core/ModalContent',
    selector: '.empoleon-Modal-content',
    variantSelector: '.empoleon-Modal-content',
    sizeSelector: '.empoleon-Modal-content',
  });
});

describe('@empoleon/core/ModalHeader', () => {
  tests.itSupportsSystemProps<ModalHeaderProps>({
    component: HeaderContainer,
    props: {},
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLElement,
    displayName: '@empoleon/core/ModalHeader',
    selector: '.empoleon-Modal-header',
    variantSelector: '.empoleon-Modal-header',
    sizeSelector: '.empoleon-Modal-header',
  });
});

describe('@empoleon/core/ModalOverlay', () => {
  tests.itSupportsSystemProps<ModalOverlayProps>({
    component: OverlayContainer,
    props: {},
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/ModalOverlay',
    selector: '.empoleon-Modal-overlay',
    variantSelector: '.empoleon-Modal-overlay',
    sizeSelector: '.empoleon-Modal-overlay',
  });
});

describe('@empoleon/core/ModalTitle', () => {
  tests.itSupportsSystemProps<ModalTitleProps>({
    component: TitleContainer,
    props: {},
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLHeadingElement,
    displayName: '@empoleon/core/ModalTitle',
    selector: '.empoleon-Modal-title',
    variantSelector: '.empoleon-Modal-title',
    sizeSelector: '.empoleon-Modal-title',
  });
});
