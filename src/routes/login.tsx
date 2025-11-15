import { type } from "arktype"
import { useAppForm } from "@/hooks/useAppForm"
import { Button } from "@/components/ui/button"
import { ErrorMessage } from "@/components/shared/ErrorMessage"
import { toast } from "sonner"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { api } from "@/lib/api"

export const Route = createFileRoute("/login")({
  validateSearch: type({
    redirect: "string?",
  }),
  component: LoginPage,
})

function LoginPage() {
  const navigate = useNavigate()
  const { redirect } = Route.useSearch()
  const loginMutation = api.mutations.useLogin()

  const form = useAppForm({
    defaultValues: { username: "", password: "" },
    validators: {
      onSubmit: type({
        username: "2 <= string <= 100",
        password: "2 <= string <= 100",
      }),
    },
    onSubmit: ({ value }) => {
      loginMutation.mutate(value, {
        onSuccess: () => {
          toast.success("Logged in successfully")
          void navigate({ to: redirect ?? "/" })
        },
      })
    },
  })

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border rounded p-6 w-80">
        <h1 className="text-xl font-bold mb-4">DemoForums</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
          className="flex flex-col gap-4"
        >
          <form.AppField name="username" children={(field) => <field.TextField placeholder="username" autoFocus />} />
          <form.AppField name="password" children={(field) => <field.TextField placeholder="password" type="password" />} />
          {loginMutation.error && <ErrorMessage error={loginMutation.error} />}
          <Button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
}
