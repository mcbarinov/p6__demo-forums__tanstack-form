import { type } from "arktype"
import { useForm } from "@tanstack/react-form"
import { Button } from "@/components/ui/button"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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

  const form = useForm({
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
          <form.Field
            name="username"
            children={(field) => (
              <>
                <Input
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                  }}
                  placeholder="username"
                  autoFocus
                />
                <FieldError errors={field.state.meta.errors} />
              </>
            )}
          />

          <form.Field
            name="password"
            children={(field) => (
              <>
                <Input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value)
                  }}
                  placeholder="password"
                />
                <FieldError errors={field.state.meta.errors} />
              </>
            )}
          />

          {loginMutation.error && <ErrorMessage error={loginMutation.error} />}

          <Button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
}
