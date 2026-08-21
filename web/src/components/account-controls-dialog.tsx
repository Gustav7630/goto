import {
  CircleUserRound,
  ContactRound,
  LinkIcon,
  SlidersHorizontal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldInput,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const genderOptions = [
  { label: "Select a gender", value: null },
  { label: "Woman", value: "woman" },
  { label: "Man", value: "man" },
  { label: "Non-binary", value: "non-binary" },
  { label: "Prefer not to say", value: "prefer-not-to-say" },
]

export function AccountControlsDialogContent() {
  return (
    <DialogContent className="h-5/8 p-0 sm:max-w-1/2">
      <DialogHeader className="sr-only">
        <DialogTitle>Account Controls</DialogTitle>
        <DialogDescription>
          Manage your account, profile and travel preferences
        </DialogDescription>
      </DialogHeader>

      <Tabs
        defaultValue="account"
        orientation="vertical"
        className="flex h-full"
      >
        <TabsList variant="line" className="p-4">
          <TabsTrigger value="account">
            <CircleUserRound data-icon="inline-start" />
            Account
          </TabsTrigger>
          <TabsTrigger value="profile">
            <ContactRound data-icon="inline-start" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <SlidersHorizontal data-icon="inline-start" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <Separator orientation="vertical" />

        <section className="flex-1">
          <TabsContent value="account" className="p-8">
            <FieldSet>
              <FieldLegend>Account</FieldLegend>
              <FieldDescription>
                Manage your sign-in details and connected accounts
              </FieldDescription>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="account-email">Email</FieldLabel>
                  <FieldDescription>
                    This email is used to sign in and receive account updates
                  </FieldDescription>
                  <FieldInput
                    id="account-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="account-password">Password</FieldLabel>
                  <FieldDescription>
                    Leave this blank if you do not want to change your password
                  </FieldDescription>
                  <FieldInput
                    id="account-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Enter a new password"
                  />
                </Field>

                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>Google Account</FieldTitle>
                    <FieldDescription>
                      Connect Google for another way to sign in
                    </FieldDescription>
                  </FieldContent>
                  <Button type="button" variant="outline">
                    <LinkIcon data-icon="inline-start" />
                    Connect to Google
                  </Button>
                </Field>
              </FieldGroup>
            </FieldSet>
          </TabsContent>

          <TabsContent value="profile" className="p-8">
            <FieldSet>
              <FieldLegend>Profile</FieldLegend>
              <FieldDescription>
                Tell us how you would like to be identified
              </FieldDescription>

              <FieldGroup className="grid sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="profile-first-name">
                    First Name
                  </FieldLabel>
                  <FieldInput
                    id="profile-first-name"
                    autoComplete="given-name"
                    placeholder="Enter your first name"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="profile-last-name">Last Name</FieldLabel>
                  <FieldInput
                    id="profile-last-name"
                    autoComplete="family-name"
                    placeholder="Enter your last name"
                  />
                </Field>

                <Field className="sm:col-span-2">
                  <FieldLabel htmlFor="profile-preferred-name">
                    Preferred Name
                  </FieldLabel>
                  <FieldDescription>
                    This is the name that will be shown throughout the app
                  </FieldDescription>
                  <FieldInput
                    id="profile-preferred-name"
                    autoComplete="nickname"
                    placeholder="What should we call you?"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="profile-gender">Gender</FieldLabel>
                  <Select items={genderOptions}>
                    <SelectTrigger id="profile-gender" className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {genderOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="profile-date-of-birth">
                    Date of Birth
                  </FieldLabel>
                  <FieldInput
                    id="profile-date-of-birth"
                    type="date"
                    autoComplete="bday"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </TabsContent>

          <TabsContent value="preferences" className="p-8">
            <FieldSet>
              <FieldLegend>Preferences</FieldLegend>

              <FieldDescription>
                Help us tailor trip suggestions to your needs
              </FieldDescription>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="preferences-accessibility">
                    Accessibility
                  </FieldLabel>
                  <Textarea
                    id="preferences-accessibility"
                    className="min-h-24"
                    placeholder="Share any mobility, vision, hearing, sensory or other accessibility needs"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="preferences-dietary">
                    Dietary Preferences
                  </FieldLabel>
                  <Textarea
                    id="preferences-dietary"
                    className="min-h-24"
                    placeholder="Add allergies, intolerances, diets or religious requirements"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="preferences-other">Other</FieldLabel>
                  <Textarea
                    id="preferences-other"
                    className="min-h-24"
                    placeholder="Share anything else that would improve your trip recommendations"
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </TabsContent>
        </section>
      </Tabs>
    </DialogContent>
  )
}
