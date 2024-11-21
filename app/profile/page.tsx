'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Book, GraduationCap, MessageCircle, Send, User } from 'lucide-react'
import Link from 'next/link'

// Fake user data
const userData = {
  name: "Alice Johnson",
  email: "alice@example.com",
  role: "Student",
  courses: ["Mathematics 101", "Introduction to Physics", "World History"],
  progress: 65
}

// Fake AI responses
const aiResponses = [
  "That's a great question! Let me help you with that.",
  "Based on your course progress, I'd recommend focusing on chapter 5 next.",
  "Don't forget to check out the additional resources in the course materials.",
  "You're making excellent progress! Keep up the good work.",
  "If you're struggling with this concept, try reviewing the lecture notes from last week."
]

export default function ProfilePage() {
  const [chatMessages, setChatMessages] = useState<{ user: string; ai: string }[]>([])
  const [inputMessage, setInputMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputMessage.trim() === '') return

    const newUserMessage = { user: inputMessage, ai: '' }
    setChatMessages(prev => [...prev, newUserMessage])
    setInputMessage('')

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]
      setChatMessages(prev => [
        ...prev.slice(0, -1),
        { ...prev[prev.length - 1], ai: aiResponse }
      ])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <GraduationCap className="h-8 w-8 mr-2 text-primary" />
            LearnHub
          </h1>
          <nav>
            <Link href="/dashboard"><Button variant="ghost">Dashboard</Button></Link>
            <Link href="/courses"><Button variant="ghost">Courses</Button></Link>
            <Link href="/settings"><Button variant="ghost">Settings</Button></Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-6 sm:px-6 lg:px-8">
        <div className="md:flex md:space-x-8">
          {/* User Profile Section */}
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt={userData.name} />
                    <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{userData.name}</h2>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                    <p className="text-sm text-gray-500">{userData.role}</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div>
                    <Label>Enrolled Courses</Label>
                    <ul className="mt-2 space-y-2">
                      {userData.courses.map((course, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <Book className="h-4 w-4 mr-2 text-primary" />
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <Label>Overall Progress</Label>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${userData.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{userData.progress}% Complete</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Chat Section */}
          <div className="md:w-2/3 mt-6 md:mt-0">
            <Card className="h-full flex flex-col">
              <CardHeader>
                <CardTitle>AI Learning Assistant</CardTitle>
                <CardDescription>Ask questions about your courses or get study tips</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ScrollArea className="h-[400px] w-full pr-4">
                  {chatMessages.map((message, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex items-start mb-2">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                        </Avatar>
                        <div className="bg-primary text-primary-foreground rounded-lg py-2 px-3 max-w-[80%]">
                          {message.user}
                        </div>
                      </div>
                      {message.ai && (
                        <div className="flex items-start">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback><MessageCircle className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                          <div className="bg-secondary text-secondary-foreground rounded-lg py-2 px-3 max-w-[80%]">
                            {message.ai}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form onSubmit={handleSendMessage} className="w-full flex space-x-2">
                  <Input
                    placeholder="Type your message here..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-grow"
                  />
                  <Button type="submit">
                    <Send className="h-4 w-4 mr-2" />
                    Send
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}