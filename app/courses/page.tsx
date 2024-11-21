'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, CheckCircle, GraduationCap, PlayCircle, User } from 'lucide-react'
import Link from 'next/link'

// Fake course data
const courseData = {
  title: "Introduction to Machine Learning",
  description: "Learn the fundamentals of machine learning, including supervised and unsupervised learning, model evaluation, and practical applications.",
  instructor: "Dr. Jane Smith",
  duration: "8 weeks",
  level: "Intermediate",
  rating: 4.8,
  enrolledStudents: 1234,
  progress: 35,
  modules: [
    {
      title: "Introduction to ML Concepts",
      lessons: ["What is Machine Learning?", "Types of Machine Learning", "ML Workflow"],
      duration: "1 week"
    },
    {
      title: "Supervised Learning",
      lessons: ["Linear Regression", "Logistic Regression", "Decision Trees"],
      duration: "2 weeks"
    },
    {
      title: "Unsupervised Learning",
      lessons: ["Clustering", "Dimensionality Reduction", "Anomaly Detection"],
      duration: "2 weeks"
    },
    {
      title: "Model Evaluation",
      lessons: ["Cross-Validation", "Metrics for Classification", "Metrics for Regression"],
      duration: "1 week"
    },
    {
      title: "Practical Applications",
      lessons: ["Image Classification", "Natural Language Processing", "Recommender Systems"],
      duration: "2 weeks"
    }
  ],
  recentlyLearned: [
    { title: "Types of Machine Learning", completion: 100 },
    { title: "ML Workflow", completion: 75 },
    { title: "Linear Regression", completion: 50 }
  ]
}

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
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

      <main className="flex-grow container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>{courseData.title}</CardTitle>
                <CardDescription>{courseData.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="modules">Modules</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="space-y-4 mt-4">
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-gray-500" />
                        <span>Instructor: {courseData.instructor}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Book className="h-5 w-5 text-gray-500" />
                        <span>Duration: {courseData.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="h-5 w-5 text-gray-500" />
                        <span>Level: {courseData.level}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-gray-500" />
                        <span>{courseData.enrolledStudents} students enrolled</span>
                      </div>
                      <div>
                        <span className="font-semibold">Rating: </span>
                        <span>{courseData.rating} / 5</span>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="modules">
                    <ScrollArea className="h-[400px] w-full pr-4 mt-4">
                      {courseData.modules.map((module, index) => (
                        <div key={index} className="mb-6">
                          <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                          <p className="text-sm text-gray-500 mb-2">Duration: {module.duration}</p>
                          <ul className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="flex items-center text-sm">
                                <PlayCircle className="h-4 w-4 mr-2 text-primary" />
                                {lesson}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Continue Learning</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Recently Learned and Progress */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={courseData.progress} className="w-full" />
                <p className="text-sm text-gray-500 mt-2">{courseData.progress}% Complete</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recently Learned</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {courseData.recentlyLearned.map((item, index) => (
                    <li key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>{item.title}</span>
                      </div>
                      <Progress value={item.completion} className="w-20" />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}