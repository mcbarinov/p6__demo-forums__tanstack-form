import { type } from "arktype"
import { useForm } from "@tanstack/react-form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { ErrorMessage } from "@/components/shared/ErrorMessage"
import { api } from "@/lib/api"

export function ChangePasswordDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const changePasswordMutation = api.mutations.useChangePassword()

  const form = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: type({
        currentPassword: "string>=2",
        newPassword: "string>=2",
        confirmPassword: "string>=2",
      }),
    },
    onSubmit: ({ value }) => {
      changePasswordMutation.mutate(
        {
          currentPassword: value.currentPassword,
          newPassword: value.newPassword,
        },
        {
          onSuccess: () => {
            toast.success("Password changed successfully")
            form.reset()
            onOpenChange(false)
          },
        }
      )
    },
  })

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      form.reset()
      changePasswordMutation.reset()
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Enter your current password and choose a new password.</DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
          className="space-y-4"
        >
          <form.Field
            name="currentPassword"
            children={(field) => (
              <div>
                <label className="text-sm font-medium">Current Password</label>
                <Input
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                  }}
                  type="password"
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          />

          <form.Field
            name="newPassword"
            children={(field) => (
              <div>
                <label className="text-sm font-medium">New Password</label>
                <Input
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                  }}
                  type="password"
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          />

          <form.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value, fieldApi }) => {
                const newPassword = fieldApi.form.getFieldValue("newPassword")
                if (value && newPassword && value !== newPassword) {
                  return { message: "Passwords don't match" }
                }
                return undefined
              },
            }}
            children={(field) => (
              <div>
                <label className="text-sm font-medium">Confirm New Password</label>
                <Input
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                  }}
                  type="password"
                />
                <FieldError errors={field.state.meta.errors} />
              </div>
            )}
          />

          {changePasswordMutation.error && <ErrorMessage error={changePasswordMutation.error} />}

          <DialogFooter>
            <Button type="submit" disabled={changePasswordMutation.isPending}>
              {changePasswordMutation.isPending ? "Changing..." : "Change Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
