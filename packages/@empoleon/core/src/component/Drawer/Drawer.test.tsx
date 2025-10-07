import { createContextContainer, render, tests } from '@empoleon-tests/core';
import { Drawer, DrawerProps, DrawerStylesNames } from './Drawer';
import { DrawerBody, DrawerBodyProps } from './DrawerBody';
import { DrawerCloseButton, DrawerCloseButtonProps } from './DrawerCloseButton';
import { DrawerContent, DrawerContentProps } from './DrawerContent';
import { DrawerHeader, DrawerHeaderProps } from './DrawerHeader';
import { DrawerOverlay, DrawerOverlayProps } from './DrawerOverlay';
import { DrawerRoot, DrawerRootProps } from './DrawerRoot';
import { DrawerTitle, DrawerTitleProps } from './DrawerTitle';

const defaultProps: DrawerProps = {
  opened: true,
  onClose: () => {},
  title: 'test-title',
  withinPortal: false,
};

const createDrawerContextContainer = (component: any) =>
  createContextContainer(component, DrawerRoot, defaultProps);

const BodyContainer = createDrawerContextContainer(DrawerBody);
const CloseButtonContainer = createDrawerContextContainer(DrawerCloseButton);
const ContentContainer = createDrawerContextContainer(DrawerContent);
const HeaderContainer = createDrawerContextContainer(DrawerHeader);
const OverlayContainer = createDrawerContextContainer(DrawerOverlay);
const TitleContainer = createDrawerContextContainer(DrawerTitle);

describe('@empoleon/core/Drawer', () => {
  tests.itSupportsSystemProps<DrawerProps, DrawerStylesNames>({
    component: Drawer,
    props: defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/Drawer',
    stylesApiSelectors: ['root', 'body', 'close', 'content', 'header', 'inner', 'overlay', 'title'],
    selector: '.empoleon-Drawer-root',
    variantSelector: '.empoleon-Drawer-root',
    sizeSelector: '.empoleon-Drawer-root',
  });

  it('does not render overlay when withOverlay is false', () => {
    const { container, rerender } = render(() => <Drawer {...defaultProps} withOverlay={false} />);
    expect(container.querySelector('.empoleon-Drawer-overlay')).not.toBeInTheDocument();

    rerender(() => <Drawer {...defaultProps} withOverlay />);
    expect(container.querySelector('.empoleon-Drawer-overlay')).toBeInTheDocument();
  });

  it('does not render header if title and withCloseButton are not provided', () => {
    const { container, rerender } = render(() => (
      <Drawer {...defaultProps} title={null} withCloseButton />
    ));
    expect(container.querySelector('.empoleon-Drawer-header')).toBeInTheDocument();

    rerender(() => <Drawer {...defaultProps} withCloseButton={false} title="test-title" />);
    expect(container.querySelector('.empoleon-Drawer-header')).toBeInTheDocument();

    rerender(() => <Drawer {...defaultProps} withCloseButton={false} title={null} />);
    expect(container.querySelector('.empoleon-Drawer-header')).not.toBeInTheDocument();
  });

  // mock otherwise will get an error
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });
  it('renders given title', () => {
    const { container } = render(() => <Drawer {...defaultProps} title="test-title" />);
    const titleElement = container.querySelector('.empoleon-Drawer-title');
    expect(titleElement?.textContent).toBe('test-title');
  });

  it('exposes compound components', () => {
    expect(Drawer.Root).toBe(DrawerRoot);
    expect(Drawer.Overlay).toBe(DrawerOverlay);
    expect(Drawer.Content).toBe(DrawerContent);
    expect(Drawer.Body).toBe(DrawerBody);
    expect(Drawer.Header).toBe(DrawerHeader);
    expect(Drawer.Title).toBe(DrawerTitle);
    expect(Drawer.CloseButton).toBe(DrawerCloseButton);
  });
});

describe('@empoleon/core/DrawerRoot', () => {
  tests.itSupportsSystemProps<DrawerRootProps, 'root'>({
    component: DrawerRoot,
    props: defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/DrawerRoot',
    stylesApiSelectors: ['root'],
    selector: '.empoleon-Drawer-root',
    variantSelector: '.empoleon-Drawer-root',
    sizeSelector: '.empoleon-Drawer-root',
    stylesApiName: 'Drawer',
  });
});

describe('@empoleon/core/DrawerBody', () => {
  tests.itSupportsSystemProps<DrawerBodyProps>({
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
    displayName: '@empoleon/core/DrawerBody',
    selector: '.empoleon-Drawer-body',
    variantSelector: '.empoleon-Drawer-body',
    sizeSelector: '.empoleon-Drawer-body',
  });
});

describe('@empoleon/core/DrawerCloseButton', () => {
  tests.itSupportsSystemProps<DrawerCloseButtonProps>({
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
    displayName: '@empoleon/core/DrawerCloseButton',
    selector: '.empoleon-Drawer-close',
    variantSelector: '.empoleon-Drawer-close',
    sizeSelector: '.empoleon-Drawer-close',
  });
});

describe('@empoleon/core/DrawerContent', () => {
  tests.itSupportsSystemProps<DrawerContentProps>({
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
    displayName: '@empoleon/core/DrawerContent',
    selector: '.empoleon-Drawer-content',
    variantSelector: '.empoleon-Drawer-content',
    sizeSelector: '.empoleon-Drawer-content',
  });
});

describe('@empoleon/core/DrawerHeader', () => {
  tests.itSupportsSystemProps<DrawerHeaderProps>({
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
    displayName: '@empoleon/core/DrawerHeader',
    selector: '.empoleon-Drawer-header',
    variantSelector: '.empoleon-Drawer-header',
    sizeSelector: '.empoleon-Drawer-header',
  });
});

describe('@empoleon/core/DrawerOverlay', () => {
  tests.itSupportsSystemProps<DrawerOverlayProps>({
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
    displayName: '@empoleon/core/DrawerOverlay',
    selector: '.empoleon-Drawer-overlay',
    variantSelector: '.empoleon-Drawer-overlay',
    sizeSelector: '.empoleon-Drawer-overlay',
  });
});

describe('@empoleon/core/DrawerTitle', () => {
  tests.itSupportsSystemProps<DrawerTitleProps>({
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
    displayName: '@empoleon/core/DrawerTitle',
    selector: '.empoleon-Drawer-title',
    variantSelector: '.empoleon-Drawer-title',
    sizeSelector: '.empoleon-Drawer-title',
  });
});
