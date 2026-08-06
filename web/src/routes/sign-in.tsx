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

export const Route = createFileRoute("/sign-in")({ component: Component })

function Component() {
  const navigate = Route.useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSignIn() {
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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      alert("Error")
      console.error(error)
      return
    }

    console.log(data)

    navigate({ to: "/preferences" })
  }

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
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <FieldInput
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md"
              />
            </Field>
          </FieldGroup>
          <Button onClick={handleSignIn} className="w-full rounded-md p-6">
            {loading ? <Spinner /> : <>Sign In</>}
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
