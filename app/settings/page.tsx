'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GraduationCap, Bell, Moon, Sun, Grip } from 'lucide-react'
import Link from 'next/link'

// Fake user data
const userData = {
  name: "Alice Johnson",
  email: "alice@example.com",
  avatar: "/placeholder.svg?height=80&width=80"
}

// Fake course priority data
const initialCoursePriorities = [
  { id: 'course1', name: 'Mathematics 101' },
  { id: 'course2', name: 'Introduction to Physics' },
  { id: 'course3', name: 'World History' },
  { id: 'course4', name: 'English Literature' },
]

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [coursePriorities, setCoursePriorities] = useState(initialCoursePriorities)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(coursePriorities)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setCoursePriorities(items)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        <header className="bg-card shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold flex items-center">
              <GraduationCap className="h-8 w-8 mr-2 text-primary" />
              LearnHub
            </h1>
            <nav>
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/profile">Profile</Link>
              </Button>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Settings</h2>
          
          <Tabs defaultValue="account" className="space-y-6">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="priorities">Course Priorities</TabsTrigger>
            </TabsList>

            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Update your account details here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={userData.avatar} alt={userData.name} />
                      <AvatarFallback>{userData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <Button>Change Avatar</Button>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue={userData.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={userData.email} />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                  <CardDescription>Customize your learning experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Toggle dark mode on or off</p>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive course updates and reminders</p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="priorities">
              <Card>
                <CardHeader>
                  <CardTitle>Course Priorities</CardTitle>
                  <CardDescription>Drag and drop to reorder your course priorities.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="courses">
                      {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                          {coursePriorities.map((course, index) => (
                            <Draggable key={course.id} draggableId={course.id} index={index}>
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="flex items-center p-2 bg-card rounded-md shadow"
                                >
                                  <Grip className="h-5 w-5 mr-2 text-muted-foreground" />
                                  {course.name}
                                </li>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </DragDropContext>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}