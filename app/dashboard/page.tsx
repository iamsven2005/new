'use client'

import { useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Book, Calendar, GraduationCap, LayoutDashboard, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'

export default function StudentDashboard() {
  const [selectedCourse, setSelectedCourse] = useState('all')

  const gradeData = [
    { name: 'Math', grade: 85 },
    { name: 'Science', grade: 75 },
    { name: 'History', grade: 90 },
    { name: 'English', grade: 80 },
    { name: 'Art', grade: 95 },
  ]

  const upcomingAssignments = [
    { id: 1, title: 'Math Quiz', dueDate: '2024-11-25', course: 'Mathematics' },
    { id: 2, title: 'Science Lab Report', dueDate: '2024-11-27', course: 'Biology' },
    { id: 3, title: 'History Essay', dueDate: '2024-11-30', course: 'World History' },
  ]

  const recentActivity = [
    { id: 1, action: 'Completed assignment', course: 'English Literature', date: '2024-11-20' },
    { id: 2, action: 'Watched lecture', course: 'Physics', date: '2024-11-19' },
    { id: 3, action: 'Participated in discussion', course: 'Psychology', date: '2024-11-18' },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <div className="flex items-center mb-6">
            <GraduationCap className="h-8 w-8 text-primary mr-2" />
            <span className="text-2xl font-bold">LearnHub</span>
          </div>
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Link href={"/courses"}>
            <Button variant="ghost" className="w-full justify-start">
              <Book className="mr-2 h-4 w-4" />
              Courses
            </Button>
            </Link>
            <Link href={"/schedule"}>
            <Button variant="ghost" className="w-full justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule
            </Button>
            </Link>
            <Link href={"/profile"}>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            </Link>
            <Link href={"/settings"}>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Link href={"/profile"}>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Student" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            </Link>
            <Link href={"/"}>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Overall Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Overall Progress</CardTitle>
              <CardDescription>Your progress across all courses</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={75} className="w-full" />
              <p className="mt-2 text-sm text-gray-600">75% Complete</p>
            </CardContent>
          </Card>

          {/* Grade Distribution */}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>Your grades across different subjects</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={gradeData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="grade" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Upcoming Assignments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Assignments</CardTitle>
              <CardDescription>Your next deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {upcomingAssignments.map((assignment) => (
                  <li key={assignment.id} className="flex justify-between items-center">
                    <span>{assignment.title}</span>
                    <span className="text-sm text-gray-500">{assignment.dueDate}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest actions on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="text-sm">
                    <span className="font-medium">{activity.action}</span> in {activity.course}
                    <p className="text-xs text-gray-500">{activity.date}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Course Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
              <CardDescription>Select a course to view details</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="history">History</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}