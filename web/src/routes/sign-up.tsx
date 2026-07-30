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

export const Route = createFileRoute("/sign-up")({ component: Component })

function Component() {
  const navigate = Route.useNavigate()

  return (
    <main className="flex h-screen items-center justify-center">
      <Card className="w-lg gap-12">
        <CardHeader>
          <CardTitle className="text-center text-xl">Sign Up</CardTitle>
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
                placeholder="Create a password"
                className="rounded-md"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm password
              </FieldLabel>
              <FieldInput
                id="confirm-password"
                type="password"
                placeholder="Repeat your password"
                className="rounded-md"
              />
            </Field>
          </FieldGroup>
          <Button
            onClick={() => {
              navigate({ to: "/preferences" })
            }}
            className="w-full rounded-md p-6"
          >
            Sign Up
          </Button>
          <FieldSeparator>OR</FieldSeparator>
          <Button
            variant="secondary"
            onClick={() => {
              navigate({ to: "/preferences" })
            }}
            className="w-full rounded-md p-6"
          >
            Continue with Google
          </Button>
        </CardContent>
        <CardFooter className="justify-center gap-2">
          <p>Already have an account?</p>
          <Link to="/sign-in" className="font-bold">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}
