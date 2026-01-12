import type { StandardSchemaV1 } from '@tanstack/react-form';

import { formOptions, revalidateLogic } from '@tanstack/react-form';

export const defaultFormOptions = <T extends Record<string, unknown>>(
  schema: StandardSchemaV1<T>,
  defaultValues: T,
) => {
  return formOptions({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: { onDynamic: schema },
    onSubmitInvalid: () => {
      /* Type assertion with a "safe" function call afterwards */
      const InvalidInput = document.querySelector('[aria-invalid="true"]') as HTMLInputElement;
      InvalidInput?.focus?.();
    },
  });
};
