import { useFieldContext } from "@/hooks/useAppForm"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FieldError } from "@/components/ui/field"

export interface SelectFieldProps {
  label?: string
  placeholder?: string
  options: { value: string; label: string }[]
  disabled?: boolean
}

export function SelectField({ label, placeholder, options, disabled }: SelectFieldProps) {
  const field = useFieldContext<string>()

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Select
        onValueChange={(value) => {
          field.handleChange(value)
        }}
        value={field.state.value}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError errors={field.state.meta.errors} />
    </div>
  )
}
