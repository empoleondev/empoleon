import { render, screen, tests, userEvent } from '@empoleon-tests/core';
import { SliderStylesNames } from '../Slider.context';
import { Slider, SliderProps } from './Slider';

const defaultProps: SliderProps = {
  marks: [{ value: 0, label: 'test-mark' }],
  labelAlwaysOn: true,
  labelTransitionProps: { duration: 0 },
  thumbLabel: 'test-label',
};

const getInput = (container: HTMLElement) => container.querySelector('input[type="hidden"]');

const expectInputValue = (value: string, container: HTMLElement) =>
  expect(getInput(container)).toHaveValue(value);

const pressArrow = async (kind: 'right' | 'left') => {
  const slider = screen.getByRole('slider');
  slider.focus();
  await userEvent.keyboard(kind === 'right' ? '{ArrowRight}' : '{ArrowLeft}');
};


describe('@empoleon/core/Slider', () => {
  tests.axe([() => <Slider {...defaultProps} />]);
  tests.itSupportsSystemProps<SliderProps, SliderStylesNames>({
    component: Slider,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/Slider',
    stylesApiSelectors: [
      'root',
      'bar',
      'label',
      'mark',
      'markLabel',
      'markWrapper',
      'thumb',
      'track',
      'trackContainer',
    ],
  });

  it('provides name and value to hidden input', () => {
    const { container } = render(() => <Slider name="test-input" value={50} />);
    expectInputValue('50', container);
    expect(getInput(container)).toHaveAttribute('name', 'test-input');
  });

  it('can be controlled with right/left arrows', async () => {
    const spy = vi.fn();
    render(() => <Slider value={50} step={10} onChange={spy} />);
    await pressArrow('right');
    expect(spy).toHaveBeenLastCalledWith(60);
    await pressArrow('left');
    expect(spy).toHaveBeenLastCalledWith(40);
  });

  it('should scale the value', async () => {
    const { container } = render(() => <Slider value={50} scale={(v) => v * 2} />);
    await pressArrow('right');
    expectInputValue('100', container);
  });

  it('supports uncontrolled state', async () => {
    const { container } = render(() => <Slider defaultValue={50} step={10} />);
    expectInputValue('50', container);
    await pressArrow('right');
    expectInputValue('60', container);
    await pressArrow('right');
    expectInputValue('70', container);
    await pressArrow('left');
    expectInputValue('60', container);
    await pressArrow('left');
    expectInputValue('50', container);
  });

  it('does not allow to set value greater than max', async () => {
    const { container } = render(() => <Slider defaultValue={115} step={10} max={120} />);
    expectInputValue('115', container);
    await pressArrow('right');
    expectInputValue('120', container);
  });

  it('does not allow to set value smaller than min', async () => {
    const { container } = render(() => <Slider defaultValue={50} step={10} min={45} />);
    expectInputValue('50', container);
    await pressArrow('left');
    expectInputValue('45', container);
  });

  it('shows label on hover', async () => {
    render(() => <Slider label="test-label" labelTransitionProps={{ duration: 0 }} />);
    expect(screen.queryAllByText('test-label')).toHaveLength(0);

    const trackContainer = document.querySelector('.empoleon-Slider-trackContainer');
    console.log('trackContainer:', trackContainer);

    await userEvent.hover(trackContainer);

    // Debug: check the HTML after hover
    console.log('After hover:', document.body.innerHTML);

    expect(screen.getByText('test-label')).toBeInTheDocument();
  });

  it('renders label with current value based on callback', async () => {
    render(
      () => <Slider
        defaultValue={50}
        step={10}
        label={(val) => `test-label-${val}`}
        labelTransitionProps={{ duration: 0 }}
        labelAlwaysOn
      />
    );
    expect(screen.getByText('test-label-50')).toBeInTheDocument();
    await pressArrow('left');
    expect(screen.getByText('test-label-40')).toBeInTheDocument();
    await pressArrow('right');
    await pressArrow('right');
    expect(screen.getByText('test-label-60')).toBeInTheDocument();
  });

  it('clamps initial value based on min prop', () => {
    const { container } = render(() => <Slider defaultValue={60} min={100} />);
    expectInputValue('100', container);
  });

  it('clamps initial value based on max prop', () => {
    const { container } = render(() => <Slider defaultValue={120} max={100} />);
    expectInputValue('100', container);
  });

  it('will call onChange before onChangeEnd', async () => {
    const changeSpy = vi.fn();
    const endSpy = vi.fn();

    render(
      () => <Slider
        value={50}
        step={10}
        onChange={(value) => changeSpy(performance.now(), value)}
        onChangeEnd={(value) => endSpy(performance.now(), value)}
      />
    );

    await pressArrow('right');

    // Check that both spies were called
    expect(changeSpy).toHaveBeenCalled();
    expect(endSpy).toHaveBeenCalled();

    // Check timing: onChange should be called before onChangeEnd
    expect(changeSpy.mock.calls[0][0]).toBeLessThan(
      endSpy.mock.calls[endSpy.mock.calls.length - 1][0]
    );

    await pressArrow('left');

    // Check that both spies were called again
    expect(changeSpy).toHaveBeenCalledTimes(2);
    expect(endSpy).toHaveBeenCalledTimes(2);

    // Check timing for second call
    expect(changeSpy.mock.calls[1][0]).toBeLessThan(
      endSpy.mock.calls[endSpy.mock.calls.length - 1][0]
    );
  });
});
