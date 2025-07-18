import { createSignal, onCleanup } from 'solid-js';
import { getPath } from '../../paths';
import { LooseKeys } from '../../paths.types';
import { FormFieldSubscriber, Watch } from '../../types';
import { $FormStatus } from '../use-form-status/use-form-status';
import { SetValuesSubscriberPayload } from '../use-form-values/use-form-values';

interface UseFormWatchInput<Values extends Record<string, any>> {
  $status: $FormStatus<Values>;
}

export function useFormWatch<Values extends Record<string, any>>({
  $status,
}: UseFormWatchInput<Values>) {
  let subscribers: Record<LooseKeys<Values>, FormFieldSubscriber<Values, any>[]> = {} as any;

  const watch: Watch<Values> = (path, callback) => {
    subscribers[path] = subscribers[path] || [];
    subscribers[path].push(callback);

    onCleanup(() => {
      subscribers[path] = subscribers[path].filter((cb) => cb !== callback);
    });
  };

  const getFieldSubscribers = (path: LooseKeys<Values>) => {
    if (!subscribers[path]) {
      return [];
    }

    return subscribers[path].map(
      (callback) => (input: SetValuesSubscriberPayload<Values>) =>
        callback({
          previousValue: getPath(path, input.previousValues) as any,
          value: getPath(path, input.updatedValues) as any,
          touched: $status.isTouched(path),
          dirty: $status.isDirty(path),
        })
    );
  };

  return {
    subscribers,
    watch,
    getFieldSubscribers,
  };
}
