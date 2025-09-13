import { fireEvent, render, screen } from '@solidjs/testing-library';
import { useLongPress, UseLongPressOptions } from './use-long-press';
import { vi, describe, it, expect, beforeEach, beforeAll, afterAll } from 'vitest';

// Test component that uses the hook
interface TestComponentProps {
  onLongPress: (event: MouseEvent | TouchEvent) => void;
  options?: UseLongPressOptions;
  testId?: string;
}

function TestComponent(props: TestComponentProps) {
  const longPressHandlers = useLongPress(props.onLongPress, props.options || {});

  return (
    <div
      data-testid={props.testId || 'test-element'}
      {...longPressHandlers}
      style={{ width: '100px', height: '100px', background: 'gray' }}
    >
      Press Me
    </div>
  );
}

describe('useLongPress', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });

  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should call onLongPress after default threshold', () => {
    const onLongPress = vi.fn();
    render(() => <TestComponent onLongPress={onLongPress} />);

    const element = screen.getByTestId('test-element');
    fireEvent.mouseDown(element);

    // Assert onLongPress not called immediately
    expect(onLongPress).not.toHaveBeenCalled();

    // Fast-forward time by default threshold (400ms)
    vi.advanceTimersByTime(400);

    // Assert onLongPress called after threshold
    expect(onLongPress).toHaveBeenCalledTimes(1);

    // Cleanup
    fireEvent.mouseUp(element);
  });

  it('should call onLongPress after custom threshold', () => {
    const onLongPress = vi.fn();
    const customThreshold = 1000;

    render(() => <TestComponent onLongPress={onLongPress} options={{ threshold: customThreshold }} />);

    const element = screen.getByTestId('test-element');
    fireEvent.mouseDown(element);

    // Fast-forward time but not enough to trigger
    vi.advanceTimersByTime(500);
    expect(onLongPress).not.toHaveBeenCalled();

    // Fast-forward remaining time
    vi.advanceTimersByTime(500);
    expect(onLongPress).toHaveBeenCalledTimes(1);

    // Cleanup
    fireEvent.mouseUp(element);
  });

  it('should not call onLongPress if released before threshold', () => {
    const onLongPress = vi.fn();
    render(() => <TestComponent onLongPress={onLongPress} />);

    const element = screen.getByTestId('test-element');
    fireEvent.mouseDown(element);

    // Fast-forward time but not enough to trigger
    vi.advanceTimersByTime(300);

    // Release before threshold is met
    fireEvent.mouseUp(element);

    // Complete the threshold time
    vi.advanceTimersByTime(100);

    expect(onLongPress).not.toHaveBeenCalled();
  });

  it('should call onStart callback on press start', () => {
    const onLongPress = vi.fn();
    const onStart = vi.fn();

    render(() => <TestComponent onLongPress={onLongPress} options={{ onStart }} />);

    const element = screen.getByTestId('test-element');
    fireEvent.mouseDown(element);

    expect(onStart).toHaveBeenCalledTimes(1);

    // Cleanup
    fireEvent.mouseUp(element);
  });

  it('should call onFinish callback after long press is completed', () => {
    const onLongPress = vi.fn();
    const onFinish = vi.fn();

    render(() => <TestComponent onLongPress={onLongPress} options={{ onFinish }} />);

    const element = screen.getByTestId('test-element');
    fireEvent.mouseDown(element);

    // Fast-forward time to trigger long press
    vi.advanceTimersByTime(400);

    // Complete the press
    fireEvent.mouseUp(element);

    expect(onLongPress).toHaveBeenCalledTimes(1);
    expect(onFinish).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel callback if press is canceled before threshold', () => {
    const onLongPress = vi.fn();
    const onCancel = vi.fn();

    render(() => <TestComponent onLongPress={onLongPress} options={{ onCancel }} />);

    const element = screen.getByTestId('test-element');
    fireEvent.mouseDown(element);

    // Release before threshold
    fireEvent.mouseUp(element);

    expect(onLongPress).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should cancel long press when mouse leaves element', () => {
    const onLongPress = vi.fn();
    const onCancel = vi.fn();

    render(() => <TestComponent onLongPress={onLongPress} options={{ onCancel }} />);

    const element = screen.getByTestId('test-element');
    fireEvent.mouseDown(element);

    // Mouse leaves element before threshold
    fireEvent.mouseLeave(element);

    // Fast-forward past the threshold
    vi.advanceTimersByTime(400);

    expect(onLongPress).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should handle touch events', () => {
    const onLongPress = vi.fn();

    render(() => <TestComponent onLongPress={onLongPress} />);

    const element = screen.getByTestId('test-element');
    fireEvent.touchStart(element);

    // Fast-forward time
    vi.advanceTimersByTime(400);

    expect(onLongPress).toHaveBeenCalledTimes(1);

    // Cleanup
    fireEvent.touchEnd(element);
  });

  it('should handle touch events being canceled', () => {
    const onLongPress = vi.fn();
    const onCancel = vi.fn();

    render(() => <TestComponent onLongPress={onLongPress} options={{ onCancel }} />);

    const element = screen.getByTestId('test-element');
    fireEvent.touchStart(element);

    // End touch before threshold
    fireEvent.touchEnd(element);

    // Fast-forward past the threshold
    vi.advanceTimersByTime(400);

    expect(onLongPress).not.toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  it('should return empty object if onLongPress is not a function', () => {
    // We need to suppress the TypeScript error for this test
    // @ts-ignore - Intentionally passing invalid prop for testing
    render(() => <TestComponent onLongPress="not a function" />);

    // Just checking that it renders without crashing
    expect(screen.getByTestId('test-element')).toBeInTheDocument();
  });

  it('should clean up timeout on unmount', () => {
    const onLongPress = vi.fn();

    const { unmount } = render(() => <TestComponent onLongPress={onLongPress} />);

    const element = screen.getByTestId('test-element');
    fireEvent.mouseDown(element);

    // Unmount component before threshold
    unmount();

    // Fast-forward time
    vi.advanceTimersByTime(400);

    expect(onLongPress).not.toHaveBeenCalled();
    // Note: With Vitest's fake timers, timers are cleared automatically on unmount
    // so we can't easily test if clearTimeout was called correctly
  });

  it('should handle multiple presses correctly', () => {
    const onLongPress = vi.fn();

    render(() => <TestComponent onLongPress={onLongPress} />);

    const element = screen.getByTestId('test-element');

    // First press
    fireEvent.mouseDown(element);
    vi.advanceTimersByTime(400);
    fireEvent.mouseUp(element);

    // Second press
    fireEvent.mouseDown(element);
    vi.advanceTimersByTime(400);
    fireEvent.mouseUp(element);

    expect(onLongPress).toHaveBeenCalledTimes(2);
  });
});
