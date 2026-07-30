import { createFileRoute, Link } from "@tanstack/react-router"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldInput,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"

export const Route = createFileRoute("/sign-in")({ component: Component })

function Component() {
  const navigate = Route.useNavigate()

  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-lg gap-12">
        <CardHeader>
          <CardTitle className="text-center text-xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-12">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <FieldInput
                id="email"
                type="email"
                placeholder="Enter your email"
                className="rounded-md"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldInput
                id="password"
                type="password"
                placeholder="Enter your password"
                className="rounded-md"
              />
            </Field>
          </FieldGroup>
          <Button
            onClick={() => navigate({ to: "/preferences" })}
            className="w-full rounded-md p-6"
          >
            Sign In
          </Button>
          <FieldSeparator>OR</FieldSeparator>
          <Button
            variant="secondary"
            onClick={() => navigate({ to: "/preferences" })}
            className="w-full rounded-md p-6"
          >
            Continue with Google
          </Button>
        </CardContent>
        <CardFooter className="justify-center gap-2">
          <p>New to Goto?</p>
          <Link to="/sign-up" className="font-bold">
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}
