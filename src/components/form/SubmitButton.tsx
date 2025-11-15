import { Button, buttonVariants } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { VariantProps } from "class-variance-authority"

export interface SubmitButtonProps {
  mutation: { isPending: boolean }
  children: React.ReactNode
  pendingText?: string
  disabled?: boolean
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
  className?: string
}

export function SubmitButton({ mutation, children, pendingText, disabled, variant, size, className }: SubmitButtonProps) {
  const isPending = mutation.isPending
  const isDisabled = isPending || disabled

  return (
    <Button type="submit" disabled={isDisabled} variant={variant} size={size} className={className}>
      {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pendingText && isPending ? pendingText : children}
    </Button>
  )
}
