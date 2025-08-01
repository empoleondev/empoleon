import { render, tests } from '@empoleon-tests/core';
import { Flex, FlexProps, FlexStylesNames } from './Flex';

const defaultProps: FlexProps = {};

describe('@empoleon/core/Flex', () => {
  tests.itSupportsSystemProps<FlexProps, FlexStylesNames>({
    component: Flex,
    props: defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/Flex',
    stylesApiSelectors: ['root'],
  });

  it('supports gap style prop', () => {
    const { container } = render(() => <Flex gap="2em" />);
    expect(container.querySelector('.empoleon-Flex-root')).toHaveStyle({ gap: '2em' });
  });

  it('supports rowGap style prop', () => {
    const { container } = render(() => <Flex rowGap="2em" />);
    expect(container.querySelector('.empoleon-Flex-root')).toHaveStyle({ rowGap: '2em' });
  });

  it('supports columnGap style prop', () => {
    const { container } = render(() => <Flex columnGap="2em" />);
    expect(container.querySelector('.empoleon-Flex-root')).toHaveStyle({ columnGap: '2em' });
  });

  it('supports align style prop', () => {
    const { container } = render(() => <Flex align="center" />);
    expect(container.querySelector('.empoleon-Flex-root')).toHaveStyle({ alignItems: 'center' });
  });

  it('supports justify style prop', () => {
    const { container } = render(() => <Flex justify="center" />);
    expect(container.querySelector('.empoleon-Flex-root')).toHaveStyle({
      justifyContent: 'center',
    });
  });

  it('supports wrap style prop', () => {
    const { container } = render(() => <Flex wrap="wrap" />);
    expect(container.querySelector('.empoleon-Flex-root')).toHaveStyle({ flexWrap: 'wrap' });
  });

  it('supports direction style prop', () => {
    const { container } = render(() => <Flex direction="column" />);
    expect(container.querySelector('.empoleon-Flex-root')).toHaveStyle({
      flexDirection: 'column',
    });
  });
});
