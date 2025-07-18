import { ScrollArea } from '@empoleon/core';
import { useTimePickerContext } from '../TimePicker.context';
import { TimeControl } from './TimeControl';
import { createEffect, createSignal, For } from 'solid-js';

function isElementVisibleInScrollContainer(
  element: HTMLElement | null | undefined,
  container: HTMLElement | null | undefined
) {
  if (!element || !container) {
    return false;
  }

  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  // Check if element is within container's visible bounds
  const isVisible =
    elementRect.top >= containerRect.top &&
    elementRect.bottom <= containerRect.bottom &&
    elementRect.left >= containerRect.left &&
    elementRect.right <= containerRect.right;

  return isVisible;
}

function getValuesRange(min: number, max: number, step: number) {
  const range = [];
  for (let i = min; i <= max; i += step) {
    range.push(i);
  }
  return range;
}

interface TimeControlsListProps {
  min: number;
  max: number;
  step: number;
  value: number | null;
  onSelect: (value: number) => void;
}

export function TimeControlsList(props: TimeControlsListProps) {
  const ctx = useTimePickerContext();
  let refElement: HTMLDivElement | undefined;
  const range = getValuesRange(props.min, props.max, props.step);
  const controls = (
    <For each={range}>
      {(control) => (
        <TimeControl
          value={control}
          active={props.value === control}
          onSelect={props.onSelect}
        />
      )}
    </For>
  );

  createEffect(() => {
    if (props.value) {
      const target = refElement?.querySelector<HTMLButtonElement>(`[data-value="${props.value}"]`);
      if (!isElementVisibleInScrollContainer(target, refElement)) {
        target?.scrollIntoView({ block: 'nearest' });
      }
    }
  });

  return (
    <ScrollArea
      h={ctx.maxDropdownContentHeight}
      type="never"
      viewportRef={refElement}
      {...ctx.getStyles('scrollarea')}
      {...ctx.scrollAreaProps}
    >
      <div {...ctx.getStyles('controlsList')}>{controls}</div>
    </ScrollArea>
  );
}

TimeControlsList.displayName = '@empoleon/dates/TimeControlsList';
