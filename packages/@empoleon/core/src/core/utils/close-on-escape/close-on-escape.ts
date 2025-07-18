import { noop } from '../noop/noop';

interface Options {
  active: boolean | undefined;
  onTrigger?: () => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

export function closeOnEscape(
  callback?: (event: any) => void,
  options: Options = { active: true }
) {
  if (typeof callback !== 'function' || !options.active) {
    return options.onKeyDown || noop;
  }

  return (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      callback(event);
      options.onTrigger?.();
    }
  };
}
