import { Button, buttonVariants } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"

export interface CancelButtonProps {
  onClick: () => void
  children?: React.ReactNode
  variant?: VariantProps<typeof buttonVariants>["variant"]
  size?: VariantProps<typeof buttonVariants>["size"]
  className?: string
}

export function CancelButton({ onClick, children = "Cancel", variant = "outline", size, className }: CancelButtonProps) {
  return (
    <Button type="button" variant={variant} size={size} className={className} onClick={onClick}>
      {children}
    </Button>
  )
}
