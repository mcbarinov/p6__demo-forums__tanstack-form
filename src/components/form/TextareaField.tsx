import { useFieldContext } from "@/hooks/useAppForm"
import { Textarea } from "@/components/ui/textarea"
import { FieldError } from "@/components/ui/field"

export interface TextareaFieldProps {
  label?: string
  placeholder?: string
  rows?: number
  autoFocus?: boolean
  disabled?: boolean
}

export function TextareaField({ label, placeholder, rows = 4, autoFocus, disabled }: TextareaFieldProps) {
  const field = useFieldContext<string>()

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Textarea
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value)
        }}
        onBlur={() => {
          field.handleBlur()
        }}
        placeholder={placeholder}
        rows={rows}
        autoFocus={autoFocus}
        disabled={disabled}
      />
      <FieldError errors={field.state.meta.errors} />
    </div>
  )
}
