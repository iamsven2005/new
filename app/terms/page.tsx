import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GraduationCap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="flex justify-center">
          <GraduationCap className="h-12 w-12 text-primary" />
        </div>
        <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Terms and Conditions
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please read these terms carefully before using our platform.
        </p>
      </div>

      <Card className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
        <CardHeader>
          <CardTitle>LearnHub Terms of Service</CardTitle>
          <CardDescription>Last updated: November 21, 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full rounded-md border p-4">
            <div className="space-y-4">
              <section>
                <h2 className="text-lg font-semibold">1. Acceptance of Terms</h2>
                <p>By accessing or using the LearnHub platform, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">2. User Accounts</h2>
                <p>You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">3. Intellectual Property</h2>
                <p>The content on LearnHub, including text, graphics, logos, and software, is the property of LearnHub or its content suppliers and is protected by copyright laws.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">4. User Conduct</h2>
                <p>You agree not to use the platform to:</p>
                <ul className="list-disc pl-5">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Distribute spam or malicious content</li>
                  <li>Attempt to gain unauthorized access to other user accounts or system data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold">5. Content Submission</h2>
                <p>By submitting content to LearnHub, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute that content in connection with the service.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">6. Termination</h2>
                <p>We reserve the right to terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">7. Limitation of Liability</h2>
                <p>LearnHub shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">8. Changes to Terms</h2>
                <p>We reserve the right to modify or replace these Terms at any time. It is your responsibility to check the Terms periodically for changes.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">9. Contact Information</h2>
                <p>If you have any questions about these Terms, please contact us at support@learnhub.com.</p>
              </section>
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <Button>I Agree</Button>

          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}