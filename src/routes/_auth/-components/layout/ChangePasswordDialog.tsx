import { type } from "arktype"
import { useAppForm } from "@/hooks/useAppForm"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import { ErrorMessage } from "@/components/shared/ErrorMessage"
import { api } from "@/lib/api"

export function ChangePasswordDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const changePasswordMutation = api.mutations.useChangePassword()

  const form = useAppForm({
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
          <form.AppField
            name="currentPassword"
            children={(field) => <field.TextField label="Current Password" type="password" />}
          />

          <form.AppField name="newPassword" children={(field) => <field.TextField label="New Password" type="password" />} />

          <form.AppField
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
            children={(field) => <field.TextField label="Confirm New Password" type="password" />}
          />

          {changePasswordMutation.error && <ErrorMessage error={changePasswordMutation.error} />}

          <DialogFooter>
            <form.SubmitButton mutation={changePasswordMutation} pendingText="Changing...">
              Change Password
            </form.SubmitButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
