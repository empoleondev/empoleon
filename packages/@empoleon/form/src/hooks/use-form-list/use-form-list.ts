// import { changeErrorIndices, reorderErrors } from '../../lists';
// import { insertPath, removePath, reorderPath, replacePath } from '../../paths';
// import { InsertListItem, RemoveListItem, ReorderListItem, ReplaceListItem } from '../../types';
// import type { $FormErrors } from '../use-form-errors/use-form-errors';
// import type { $FormStatus } from '../use-form-status/use-form-status';
// import type { $FormValues } from '../use-form-values/use-form-values';

// interface UseFormListInput<Values extends Record<string, any>> {
//   $values: $FormValues<Values>;
//   $errors: $FormErrors<Values>;
//   $status: $FormStatus<Values>;
// }

// export function useFormList<Values extends Record<string, any>>(props: UseFormListInput<Values>) {
//   const reorderListItem: ReorderListItem<Values> = (path, payload) => {
//     props.$status.clearFieldDirty(path);
//     props.$errors.setErrors((errs) => reorderErrors(path, payload, errs));
//     props.$values.setValues({
//       values: reorderPath(path, payload, props.$values.refValues.current),
//       updateState: true,
//     });
//   };

//   const removeListItem: RemoveListItem<Values> = (path, index) => {
//     props.$status.clearFieldDirty(path);
//     props.$errors.setErrors((errs) => changeErrorIndices(path, index, errs, -1));
//     props.$values.setValues({
//       values: removePath(path, index, props.$values.refValues.current),
//       updateState: true,
//     });
//   };

//   const insertListItem: InsertListItem<Values> = (path, item, index) => {
//     props.$status.clearFieldDirty(path);
//     props.$errors.setErrors((errs) => changeErrorIndices(path, index, errs, 1));
//     props.$values.setValues({
//       values: insertPath(path, item, index, props.$values.refValues.current),
//       updateState: true,
//     });
//   };

//   const replaceListItem: ReplaceListItem<Values> = (path, index, item) => {
//     props.$status.clearFieldDirty(path);
//     props.$values.setValues({
//       values: replacePath(path, item, index, props.$values.refValues.current),
//       updateState: true,
//     });
//   };

//   return { reorderListItem, removeListItem, insertListItem, replaceListItem };
// }

import { changeErrorIndices, reorderErrors } from '../../lists';
import { insertPath, removePath, reorderPath, replacePath } from '../../paths';
import { InsertListItem, RemoveListItem, ReorderListItem, ReplaceListItem } from '../../types';
import type { $FormErrors } from '../use-form-errors/use-form-errors';
import type { $FormStatus } from '../use-form-status/use-form-status';
import type { $FormValues } from '../use-form-values/use-form-values';

interface UseFormListInput<Values extends Record<string, any>> {
  $values: $FormValues<Values>;
  $errors: $FormErrors<Values>;
  $status: $FormStatus<Values>;
}

export function useFormList<Values extends Record<string, any>>(props: UseFormListInput<Values>) {
  const reorderListItem: ReorderListItem<Values> = (path, payload) => {
    props.$status.clearFieldDirty(path);
    props.$errors.setErrors((errs) => reorderErrors(path, payload, errs));
    props.$values.setValues({
      values: reorderPath(path, payload, props.$values.refValues.current),
      updateState: true,
    });
  };

  const removeListItem: RemoveListItem<Values> = (path, index) => {
    props.$status.clearFieldDirty(path);
    props.$errors.setErrors((errs) => changeErrorIndices(path, index, errs, -1));
    props.$values.setValues({
      values: removePath(path, index, props.$values.refValues.current),
      updateState: true,
    });
  };

  const insertListItem: InsertListItem<Values> = (path, item, index) => {
    props.$status.clearFieldDirty(path);
    props.$errors.setErrors((errs) => changeErrorIndices(path, index, errs, 1));
    props.$values.setValues({
      values: insertPath(path, item, index, props.$values.refValues.current),
      updateState: true,
    });
  };

  const replaceListItem: ReplaceListItem<Values> = (path, index, item) => {
    props.$status.clearFieldDirty(path);
    props.$values.setValues({
      values: replacePath(path, item, index, props.$values.refValues.current),
      updateState: true,
    });
  };

  return { reorderListItem, removeListItem, insertListItem, replaceListItem };
}
