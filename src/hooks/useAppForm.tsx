import { createFormHook, createFormHookContexts } from "@tanstack/react-form"
import { TextField } from "@/components/form/TextField"

// Create contexts for form composition
export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

// Create custom form hook with pre-bound components
export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {},
})
