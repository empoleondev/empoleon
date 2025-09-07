import { renderHook } from '@solidjs/testing-library';
import { useHovered } from './use-hovered';

describe('@empoleon/utils/use-hovered', () => {
  it('works correctly', () => {
    const { result } = renderHook(() => useHovered());

    // Get initial state and actions - result is already the tuple
    const [getHovered, actions] = result;

    // Test initial state
    expect(getHovered()).toBe(-1);

    // Test setHovered
    actions.setHovered(5);
    expect(getHovered()).toBe(5);

    // Test resetHovered
    actions.resetHovered();
    expect(getHovered()).toBe(-1);
  });
});
