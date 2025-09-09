import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('removes list item with given index (root property)', () => {
    const hook = renderHook(() =>
      useForm({ mode, initialValues: { a: [{ b: 1 }, { b: 2 }, { b: 3 }] } })
    );

    hook.result.removeListItem('a', 1);
    expect(hook.result.getValues()).toStrictEqual({ a: [{ b: 1 }, { b: 3 }] });
  });

  it('does not change values if given path does not exist', () => {
    const hook = renderHook(() =>
      useForm({ mode, initialValues: { a: [{ b: 1 }, { b: 2 }, { b: 3 }] } })
    );

    hook.result.removeListItem('does.not.exist', 1);
    expect(hook.result.getValues()).toStrictEqual({ a: [{ b: 1 }, { b: 2 }, { b: 3 }] });
  });

  it('removes list item with given index (nested list)', () => {
    const hook = renderHook(() =>
      useForm({
        mode,
        initialValues: {
          a: [
            { b: [{ c: [{ d: 1 }, { d: 2 }, { d: 3 }] }, { c: [{ d: 1 }, { d: 2 }, { d: 3 }] }] },
          ],
        },
      })
    );

    hook.result.removeListItem('a.0.b.1.c', 1);
    expect(hook.result.getValues()).toStrictEqual({
      a: [{ b: [{ c: [{ d: 1 }, { d: 2 }, { d: 3 }] }, { c: [{ d: 1 }, { d: 3 }] }] }],
    });
  });

  it('updates errors of associated fields when list item is removed', () => {
    const hook = renderHook(() =>
      useForm({
        mode,
        initialValues: {
          name: '',
          a: [{ b: 1 }, { b: 2 }, { b: 3 }],
        },
        initialErrors: {
          name: 'name-error',
          'a.0.b': 'error-1',
          'a.1.b': 'error-2',
          'a.2.b': 'error-3',
        },
      })
    );

    expect(hook.result.errors).toStrictEqual({
      name: 'name-error',
      'a.0.b': 'error-1',
      'a.1.b': 'error-2',
      'a.2.b': 'error-3',
    });

    hook.result.removeListItem('a', 1);
    expect(hook.result.errors).toStrictEqual({
      name: 'name-error',
      'a.0.b': 'error-1',
      'a.1.b': 'error-3',
    });
  });

  it('calls onValuesChange when removeListItem is called', () => {
    const spy = vi.fn();
    const hook = renderHook(() =>
      useForm({
        mode,
        onValuesChange: spy,
        initialValues: {
          a: [{ b: 1 }, { b: 2 }, { b: 3 }],
        },
      })
    );

    hook.result.removeListItem('a', 1);
    expect(spy).toHaveBeenCalledWith(
      { a: [{ b: 1 }, { b: 3 }] },
      { a: [{ b: 1 }, { b: 2 }, { b: 3 }] }
    );
  });
}

describe('@empoleon/form/removeListItem-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/removeListItem-uncontrolled', () => {
  tests('uncontrolled');
});
