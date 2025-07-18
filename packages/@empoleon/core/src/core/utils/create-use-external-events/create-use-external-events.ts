import { createEffect, onCleanup } from 'solid-js';

function dispatchEvent<T>(type: string, detail?: T) {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}

export function createUseExternalEvents<Handlers extends Record<string, (detail: any) => void>>(
  prefix: string
) {
  function _useExternalEvents(events: Handlers) {
    const handlers = Object.keys(events).reduce<any>((acc, eventKey) => {
      acc[`${prefix}:${eventKey}`] = (event: CustomEvent) => events[eventKey](event.detail);
      return acc;
    }, {});

    createEffect(() => {
      Object.keys(handlers).forEach((eventKey) => {
        window.removeEventListener(eventKey, handlers[eventKey]);
        window.addEventListener(eventKey, handlers[eventKey]);
      });

      onCleanup(() =>
        Object.keys(handlers).forEach((eventKey) => {
          window.removeEventListener(eventKey, handlers[eventKey]);
        })
      );
    });
  }

  function createEvent<EventKey extends keyof Handlers>(event: EventKey) {
    type Parameter = Parameters<Handlers[EventKey]>[0];

    return (...payload: Parameter extends undefined ? [undefined?] : [Parameter]) =>
      dispatchEvent(`${prefix}:${String(event)}`, payload[0]);
  }

  return [_useExternalEvents, createEvent] as const;
}
