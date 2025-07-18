type EventHandler<Event = any> =
  | ((event: Event) => void)
  | ((event?: Event) => void)
  | (() => void)
  | undefined;

export function createEventHandler<Event = any>(
  parentEventHandler?: any,
  eventHandler?: any
): (event?: Event) => void {
  return (event?: Event) => {
    // Handle parent event handler
    if (typeof parentEventHandler === 'function') {
      if (parentEventHandler.length === 0) {
        (parentEventHandler as () => void)();
      } else {
        (parentEventHandler as any)(event);
      }
    }

    // Handle event handler
    if (typeof eventHandler === 'function') {
      if (eventHandler.length === 0) {
        (eventHandler as () => void)();
      } else {
        (eventHandler as any)(event);
      }
    }
  };
}
