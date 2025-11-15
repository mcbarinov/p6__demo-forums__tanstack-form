import { createFileRoute } from "@tanstack/react-router"
import { type } from "arktype"
import { useAppForm } from "@/hooks/useAppForm"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorMessage } from "@/components/shared/ErrorMessage"

export const Route = createFileRoute("/_auth/forums/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const createForumMutation = api.mutations.useCreateForum()

  const form = useAppForm({
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      category: "" as "Technology" | "Science" | "Art",
    },
    validators: {
      onSubmit: type({
        title: "3 <= string <= 100",
        slug: "3 <= string <= 50",
        description: "10 <= string <= 500",
        category: "'Technology' | 'Science' | 'Art'",
      }),
    },
    onSubmit: ({ value }) => {
      createForumMutation.mutate(value, {
        onSuccess: () => {
          toast.success("Forum created successfully!")
          void navigate({ to: "/" })
        },
      })
    },
  })

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Forum</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              void form.handleSubmit()
            }}
            className="space-y-4"
          >
            <form.AppField name="title" children={(field) => <field.TextField label="Title" placeholder="Enter forum title" />} />

            <form.AppField name="slug" children={(field) => <field.TextField label="Slug" placeholder="forum-url-slug" />} />

            <form.AppField
              name="description"
              children={(field) => <field.TextareaField label="Description" placeholder="Describe your forum..." rows={4} />}
            />

            <form.AppField
              name="category"
              children={(field) => (
                <field.SelectField
                  label="Category"
                  placeholder="Select a category"
                  options={[
                    { value: "Technology", label: "Technology" },
                    { value: "Science", label: "Science" },
                    { value: "Art", label: "Art" },
                  ]}
                />
              )}
            />

            {createForumMutation.error && <ErrorMessage error={createForumMutation.error} />}

            <div className="flex gap-2">
              <Button type="submit" disabled={createForumMutation.isPending}>
                {createForumMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Forum
              </Button>
              <Button type="button" variant="outline" onClick={() => void navigate({ to: "/" })}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
