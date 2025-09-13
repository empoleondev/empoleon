import { onCleanup } from 'solid-js';
import { getPath } from '../../paths';
import { LooseKeys } from '../../paths.types';
import { FormFieldSubscriber, Watch } from '../../types';
import { $FormStatus } from '../use-form-status/use-form-status';
import { SetValuesSubscriberPayload } from '../use-form-values/use-form-values';

interface UseFormWatchInput<Values extends Record<string, any>> {
  $status: $FormStatus<Values>;
  cascadeUpdates?: boolean;
}

export function useFormWatch<Values extends Record<string, any>>(props: UseFormWatchInput<Values>) {
  const subscribersRef: Record<LooseKeys<Values>, FormFieldSubscriber<Values, any>[]> = {} as any;

  const watch: Watch<Values> = (path, callback) => {
    subscribersRef[path] = subscribersRef[path] || [];
    subscribersRef[path].push(callback);

    onCleanup(() => {
      subscribersRef[path] = subscribersRef[path].filter((cb) => cb !== callback);
    });
  };

  const getFieldSubscribers = (path: LooseKeys<Values>) => {
    const result: ((input: SetValuesSubscriberPayload<Values>) => void)[] =
      subscribersRef[path]?.map(
        (callback) => (input: SetValuesSubscriberPayload<Values>) =>
          callback({
            previousValue: getPath(path, input.previousValues) as any,
            value: getPath(path, input.updatedValues) as any,
            touched: props.$status.isTouched(path),
            dirty: props.$status.isDirty(path),
          })
      ) ?? [];

    if (props.cascadeUpdates) {
      for (const subscriptionKey in subscribersRef) {
        if (subscriptionKey.startsWith(`${path}.`) || path.startsWith(`${subscriptionKey}.`)) {
          result.push(
            ...subscribersRef[subscriptionKey].map(
              (cb) => (input: SetValuesSubscriberPayload<Values>) =>
                cb({
                  previousValue: getPath(subscriptionKey, input.previousValues) as any,
                  value: getPath(subscriptionKey, input.updatedValues) as any,
                  touched: props.$status.isTouched(subscriptionKey),
                  dirty: props.$status.isDirty(subscriptionKey),
                })
            )
          );
        }
      }
    }

    return result;
  };

  return {
    subscribers: { current: subscribersRef },
    watch,
    getFieldSubscribers,
  };
}
