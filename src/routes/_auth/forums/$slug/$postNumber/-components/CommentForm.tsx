import { type } from "arktype"
import { useAppForm } from "@/hooks/useAppForm"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { ErrorMessage } from "@/components/shared/ErrorMessage"

export function CommentForm({ slug, postNumber }: { slug: string; postNumber: string }) {
  const createCommentMutation = api.mutations.useCreateComment()

  const form = useAppForm({
    defaultValues: {
      content: "",
    },
    validators: {
      onSubmit: type({
        content: "1 <= string <= 5000",
      }),
    },
    onSubmit: ({ value }) => {
      createCommentMutation.mutate(
        {
          slug,
          postNumber,
          content: value.content.trim(),
        },
        {
          onSuccess: () => {
            toast.success("Comment added successfully!")
            form.reset()
          },
        }
      )
    },
  })

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">Add a Comment</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            void form.handleSubmit()
          }}
          className="space-y-4"
        >
          <form.AppField
            name="content"
            children={(field) => (
              <field.TextareaField placeholder="Share your thoughts..." rows={3} disabled={createCommentMutation.isPending} />
            )}
          />
          {createCommentMutation.error && <ErrorMessage error={createCommentMutation.error} />}
          <form.Subscribe
            selector={(state) => state.values.content}
            children={(content) => (
              <Button type="submit" disabled={createCommentMutation.isPending || !content.trim()}>
                {createCommentMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Post Comment
              </Button>
            )}
          />
        </form>
      </CardContent>
    </Card>
  )
}
