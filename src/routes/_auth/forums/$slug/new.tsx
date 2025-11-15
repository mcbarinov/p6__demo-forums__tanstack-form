import { createFileRoute } from "@tanstack/react-router"
import { type } from "arktype"
import { useAppForm } from "@/hooks/useAppForm"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

import { api } from "@/lib/api"
import { useForum } from "@/hooks/useCache"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ErrorMessage } from "@/components/shared/ErrorMessage"

export const Route = createFileRoute("/_auth/forums/$slug/new")({
  component: RouteComponent,
})

function RouteComponent() {
  const { slug } = Route.useParams()
  const navigate = Route.useNavigate()
  const forum = useForum(slug)
  const createPostMutation = api.mutations.useCreatePost()

  const form = useAppForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
    validators: {
      onSubmit: type({
        title: "1 <= string <= 200",
        content: "1 <= string <= 10000",
        tags: "string?",
      }),
    },
    onSubmit: ({ value }) => {
      const tags = value.tags
        ? value.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag.length > 0)
        : []

      createPostMutation.mutate(
        {
          slug,
          title: value.title.trim(),
          content: value.content.trim(),
          tags,
        },
        {
          onSuccess: () => {
            toast.success("Post created successfully!")
            void navigate({ to: "/forums/$slug", params: { slug } })
          },
        }
      )
    },
  })

  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Post in {forum.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              void form.handleSubmit()
            }}
            className="space-y-4"
          >
            <form.AppField name="title" children={(field) => <field.TextField label="Title" placeholder="Enter post title" />} />

            <form.AppField
              name="content"
              children={(field) => <field.TextareaField label="Content" placeholder="Write your post content..." rows={10} />}
            />

            <form.AppField
              name="tags"
              children={(field) => <field.TextField label="Tags (optional)" placeholder="Enter tags separated by commas" />}
            />

            {createPostMutation.error && <ErrorMessage error={createPostMutation.error} />}

            <div className="flex gap-2">
              <Button type="submit" disabled={createPostMutation.isPending}>
                {createPostMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Post
              </Button>
              <Button type="button" variant="outline" onClick={() => void navigate({ to: "/forums/$slug", params: { slug } })}>
                Back to Forum
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
