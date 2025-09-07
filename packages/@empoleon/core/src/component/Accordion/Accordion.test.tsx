import { render, screen, tests, userEvent } from '@empoleon-tests/core';
import { Accordion, AccordionProps, AccordionStylesNames } from './Accordion';
import { AccordionChevron } from './AccordionChevron';
import { AccordionControl } from './AccordionControl/AccordionControl';
import { AccordionItem } from './AccordionItem/AccordionItem';
import { AccordionPanel } from './AccordionPanel/AccordionPanel';
import { JSX } from 'solid-js';

describe('@empoleon/core/Accordion', () => {
  tests.axe([
    () => <Accordion
      transitionDuration={0}
      defaultValue='item-1'
      children={
        <>
          <Accordion.Item value="item-1">
            <Accordion.Control icon="$$">Label 1</Accordion.Control>
            <Accordion.Panel>test-item-1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Control>Label 2</Accordion.Control>
            <Accordion.Panel>test-item-2</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Control>Label 3</Accordion.Control>
            <Accordion.Panel>test-item-3</Accordion.Panel>
          </Accordion.Item>
        </>
      }
    />,
    () => <Accordion transitionDuration={0}
      defaultValue='item-1'
      order={2}
      children={
        <>
          <Accordion.Item value="item-1">
            <Accordion.Control icon="$$">Label 1</Accordion.Control>
            <Accordion.Panel>test-item-1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Control>Label 2</Accordion.Control>
            <Accordion.Panel>test-item-2</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Control>Label 3</Accordion.Control>
            <Accordion.Panel>test-item-3</Accordion.Panel>
          </Accordion.Item>
        </>
      }
      />
  ]);

  tests.itSupportsSystemProps<AccordionProps, AccordionStylesNames>({
    component: Accordion,
    props: () => ({
      transitionDuration: 0,
      defaultValue: 'item-1',
      children: (() => (
        <>
          <Accordion.Item value="item-1">
            <Accordion.Control icon="$$">Label 1</Accordion.Control>
            <Accordion.Panel>test-item-1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Control>Label 2</Accordion.Control>
            <Accordion.Panel>test-item-2</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Control>Label 3</Accordion.Control>
            <Accordion.Panel>test-item-3</Accordion.Panel>
          </Accordion.Item>
        </>
      )) as unknown as JSX.Element
    }),
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    displayName: '@empoleon/core/Accordion',
    stylesApiSelectors: ['root', 'chevron', 'content', 'control', 'icon', 'item', 'label'],
  });

  it('renders correct amount of items', () => {
    const { container } = render(() => <Accordion
      transitionDuration={0}
      defaultValue='item-1'
      children={
        <>
          <Accordion.Item value="item-1">
            <Accordion.Control icon="$$">Label 1</Accordion.Control>
            <Accordion.Panel>test-item-1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Control>Label 2</Accordion.Control>
            <Accordion.Panel>test-item-2</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Control>Label 3</Accordion.Control>
            <Accordion.Panel>test-item-3</Accordion.Panel>
          </Accordion.Item>
        </>
      } />
    );
    expect(container.querySelectorAll('.empoleon-Accordion-item')).toHaveLength(3);
  });

  it('support uncontrolled state (multiple: false, default)', async () => {
    render(() => <Accordion
      transitionDuration={0}
      defaultValue='item-2'
      children={
        <>
          <Accordion.Item value="item-1">
            <Accordion.Control icon="$$">Label 1</Accordion.Control>
            <Accordion.Panel>test-item-1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Control>Label 2</Accordion.Control>
            <Accordion.Panel>test-item-2</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Control>Label 3</Accordion.Control>
            <Accordion.Panel>test-item-3</Accordion.Panel>
          </Accordion.Item>
        </>
      }
    />);
    expect(screen.getByText('test-item-2')).toBeInTheDocument();
    expect(screen.queryAllByText('test-item-1')).toHaveLength(0);

    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.queryAllByText('test-item-2')).toHaveLength(0);
    expect(screen.getByText('test-item-1')).toBeInTheDocument();
  });

  it('support uncontrolled state (multiple: true)', async () => {
    render(() => <Accordion transitionDuration={0}
      children={
        <>
          <Accordion.Item value="item-1">
            <Accordion.Control icon="$$">Label 1</Accordion.Control>
            <Accordion.Panel>test-item-1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Control>Label 2</Accordion.Control>
            <Accordion.Panel>test-item-2</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Control>Label 3</Accordion.Control>
            <Accordion.Panel>test-item-3</Accordion.Panel>
          </Accordion.Item>
        </>
      } multiple defaultValue={['item-2']} />);
    expect(screen.queryAllByText('test-item-1').length).toBe(0);
    expect(screen.getByText('test-item-2')).toBeInTheDocument();

    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText('test-item-1')).toBeInTheDocument();
    expect(screen.getByText('test-item-2')).toBeInTheDocument();
  });

  it('supports navigating between items with up and down arrows (loop: true, default)', async () => {
    render(() => <Accordion transitionDuration={0}
      defaultValue='item-1'
      children={
        <>
          <Accordion.Item value="item-1">
            <Accordion.Control icon="$$">Label 1</Accordion.Control>
            <Accordion.Panel>test-item-1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Control>Label 2</Accordion.Control>
            <Accordion.Panel>test-item-2</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Control>Label 3</Accordion.Control>
            <Accordion.Panel>test-item-3</Accordion.Panel>
          </Accordion.Item>
        </>
      } />);

    await userEvent.type(screen.getAllByRole('button')[0], '{arrowdown}');
    expect(screen.getAllByRole('button')[1]).toHaveFocus();

    await userEvent.type(screen.getAllByRole('button')[2], '{arrowup}');
    expect(screen.getAllByRole('button')[1]).toHaveFocus();

    await userEvent.type(screen.getAllByRole('button')[2], '{arrowdown}');
    expect(screen.getAllByRole('button')[0]).toHaveFocus();

    await userEvent.type(screen.getAllByRole('button')[0], '{arrowup}');
    expect(screen.getAllByRole('button')[2]).toHaveFocus();
  });

  it('supports navigating between items with up and down arrows (loop: false)', async () => {
    render(() => <Accordion transitionDuration={0}
      defaultValue='item-1'
      children={
        <>
          <Accordion.Item value="item-1">
            <Accordion.Control icon="$$">Label 1</Accordion.Control>
            <Accordion.Panel>test-item-1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Control>Label 2</Accordion.Control>
            <Accordion.Panel>test-item-2</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Control>Label 3</Accordion.Control>
            <Accordion.Panel>test-item-3</Accordion.Panel>
          </Accordion.Item>
        </>
      } loop={false} />);

    await userEvent.type(screen.getAllByRole('button')[0], '{arrowdown}');
    expect(screen.getAllByRole('button')[1]).toHaveFocus();

    await userEvent.type(screen.getAllByRole('button')[2], '{arrowup}');
    expect(screen.getAllByRole('button')[1]).toHaveFocus();

    await userEvent.type(screen.getAllByRole('button')[2], '{arrowdown}');
    expect(screen.getAllByRole('button')[2]).toHaveFocus();

    await userEvent.type(screen.getAllByRole('button')[0], '{arrowup}');
    expect(screen.getAllByRole('button')[0]).toHaveFocus();
  });

  it('supports controlled state (multiple: false, default)', async () => {
    const spy = vi.fn();
    render(() => <Accordion
      transitionDuration={0}
      defaultValue='item-1'
      children={
        <>
          <Accordion.Item value="item-1">
            <Accordion.Control icon="$$">Label 1</Accordion.Control>
            <Accordion.Panel>test-item-1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Control>Label 2</Accordion.Control>
            <Accordion.Panel>test-item-2</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Control>Label 3</Accordion.Control>
            <Accordion.Panel>test-item-3</Accordion.Panel>
          </Accordion.Item>
        </>
      }
      value="item-2"
      onChange={spy}
    />);

    expect(screen.getByText('test-item-2')).toBeInTheDocument();
    expect(screen.queryAllByText('test-item-1')).toHaveLength(0);

    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(spy).toHaveBeenCalledWith('item-1');

    expect(screen.getByText('test-item-2')).toBeInTheDocument();
    expect(screen.queryAllByText('test-item-1')).toHaveLength(0);
  });

  it('opens items initially based on defaultValue prop (multiple: false, default)', () => {
    render(() => <Accordion transitionDuration={0}
      defaultValue='item-3'
      children={
        <>
          <Accordion.Item value="item-1">
            <Accordion.Control icon="$$">Label 1</Accordion.Control>
            <Accordion.Panel>test-item-1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Control>Label 2</Accordion.Control>
            <Accordion.Panel>test-item-2</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Control>Label 3</Accordion.Control>
            <Accordion.Panel>test-item-3</Accordion.Panel>
          </Accordion.Item>
        </>
      } />);
    expect(screen.getByText('test-item-3')).toBeInTheDocument();
    expect(screen.queryAllByText('test-item-2')).toHaveLength(0);
    expect(screen.queryAllByText('test-item-1')).toHaveLength(0);
  });

  it('opens items initially based on defaultValue prop (multiple: true)', () => {
    render(() => <Accordion transitionDuration={0}
      children={
        <>
          <Accordion.Item value="item-1">
            <Accordion.Control icon="$$">Label 1</Accordion.Control>
            <Accordion.Panel>test-item-1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Control>Label 2</Accordion.Control>
            <Accordion.Panel>test-item-2</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Control>Label 3</Accordion.Control>
            <Accordion.Panel>test-item-3</Accordion.Panel>
          </Accordion.Item>
        </>
      } multiple defaultValue={['item-3', 'item-1']} />);
    expect(screen.getByText('test-item-3')).toBeInTheDocument();
    expect(screen.getByText('test-item-1')).toBeInTheDocument();
    expect(screen.queryAllByText('test-item-2')).toHaveLength(0);
  });

  it('handles tab key correctly', async () => {
    render(() => <Accordion transitionDuration={0}
      defaultValue='item-1'
      children={
        <>
          <Accordion.Item value="item-1">
            <Accordion.Control icon="$$">Label 1</Accordion.Control>
            <Accordion.Panel>test-item-1</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Control>Label 2</Accordion.Control>
            <Accordion.Panel>test-item-2</Accordion.Panel>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.Control>Label 3</Accordion.Control>
            <Accordion.Panel>test-item-3</Accordion.Panel>
          </Accordion.Item>
        </>
      } />);
    expect(document.body).toHaveFocus();

    await userEvent.tab();
    expect(screen.getAllByRole('button')[0]).toHaveFocus();

    await userEvent.tab();
    expect(screen.getAllByRole('button')[1]).toHaveFocus();

    await userEvent.tab();
    expect(screen.getAllByRole('button')[2]).toHaveFocus();

    await userEvent.tab();
    expect(document.body).toHaveFocus();
  });

  it('exposes internal components as static properties', () => {
    expect(Accordion.Item).toBe(AccordionItem);
    expect(Accordion.Control).toBe(AccordionControl);
    expect(Accordion.Panel).toBe(AccordionPanel);
    expect(Accordion.Chevron).toBe(AccordionChevron);
  });
});
