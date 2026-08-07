import { useState } from "react"

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
import { Spinner } from "@/components/ui/spinner"

import { supabase } from "@/lib/supabase"

export const Route = createFileRoute("/sign-up")({ component: Component })

function Component() {
  const navigate = Route.useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSignUp() {
    setLoading(true)

    if (!email) {
      setLoading(false)
      alert("No email provided")
      return
    }

    if (!password) {
      setLoading(false)
      alert("No password provided")
      return
    }

    if (!confirmPassword) {
      setLoading(false)
      alert("No confirm password provided")
      return
    }

    if (password !== confirmPassword) {
      setLoading(false)
      alert("Password is different from confirm password")
      return
    }

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      setLoading(false)
      alert("Error")
      console.error(error)
      return
    }

    setLoading(false)
    console.log(data)

    navigate({ to: "/preferences" })
  }

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
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldInput
                id="password"
                type="password"
                placeholder="Create a password"
                className="rounded-md"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Field>
          </FieldGroup>
          <Button onClick={handleSignUp} className="w-full rounded-md p-6">
            {loading ? <Spinner /> : <>Sign Up</>}
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
