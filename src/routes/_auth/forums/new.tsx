import { createFileRoute } from "@tanstack/react-router"
import { type } from "arktype"
import { useForm } from "@tanstack/react-form"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ErrorMessage } from "@/components/shared/ErrorMessage"

export const Route = createFileRoute("/_auth/forums/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = Route.useNavigate()
  const createForumMutation = api.mutations.useCreateForum()

  const form = useForm({
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
            <form.Field
              name="title"
              children={(field) => (
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    placeholder="Enter forum title"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            />

            <form.Field
              name="slug"
              children={(field) => (
                <div>
                  <label className="text-sm font-medium">Slug</label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    placeholder="forum-url-slug"
                  />
                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            />

            <form.Field
              name="description"
              children={(field) => (
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value)
                    }}
                    placeholder="Describe your forum..."
                    rows={4}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </div>
              )}
            />

            <form.Field
              name="category"
              children={(field) => (
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select
                    onValueChange={(value) => {
                      field.handleChange(value as "Technology" | "Science" | "Art")
                    }}
                    value={field.state.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Art">Art</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={field.state.meta.errors} />
                </div>
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
