import { useFieldContext } from "@/hooks/useAppForm"
import { Input } from "@/components/ui/input"
import { FieldError } from "@/components/ui/field"

export function TextField({
  label,
  placeholder,
  type = "text",
  autoFocus,
  disabled,
}: {
  label?: string
  placeholder?: string
  type?: "text" | "password" | "email"
  autoFocus?: boolean
  disabled?: boolean
}) {
  const field = useFieldContext<string>()

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Input
        value={field.state.value}
        onChange={(e) => {
          field.handleChange(e.target.value)
        }}
        onBlur={() => {
          field.handleBlur()
        }}
        placeholder={placeholder}
        type={type}
        autoFocus={autoFocus}
        disabled={disabled}
      />
      <FieldError errors={field.state.meta.errors} />
    </div>
  )
}
