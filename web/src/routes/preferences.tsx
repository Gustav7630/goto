import { createFileRoute } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

export const Route = createFileRoute("/preferences")({
  component: Component,
})

function Component() {
  const navigate = Route.useNavigate()

  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-lg gap-12">
        <CardHeader>
          <CardTitle className="text-center text-xl">Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-12">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="dietary">Dietary</FieldLabel>
                <Textarea
                  id="dietary"
                  placeholder="e.g. vegan, halal, no eggs, etc."
                  className="rounded-md"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="accessibility">Accessibility</FieldLabel>
                <Textarea
                  id="accessibility"
                  placeholder="e.g. wheelchair, blind, etc."
                  className="rounded-md"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="other">Other</FieldLabel>
                <Textarea
                  id="other"
                  placeholder="e.g. prefer green areas, not at night, etc."
                  className="rounded-md"
                />
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => navigate({ to: "/", replace: true })}
            className="w-full rounded-md p-6"
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
