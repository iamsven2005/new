'use client'

import { useState } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import {format} from 'date-fns/format'
import {parse} from 'date-fns/parse'
import {startOfWeek} from 'date-fns/startOfWeek'
import {getDay} from 'date-fns/getDay'
import {enUS} from 'date-fns/locale/en-US'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, List, CalendarIcon } from 'lucide-react'
import Link from 'next/link'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Fake event data
const events = [
  {
    id: 1,
    title: 'Mathematics 101',
    start: new Date(2024, 10, 22, 10, 0),
    end: new Date(2024, 10, 22, 12, 0),
    type: 'course',
  },
  {
    id: 2,
    title: 'Physics Lab',
    start: new Date(2024, 10, 23, 14, 0),
    end: new Date(2024, 10, 23, 16, 0),
    type: 'course',
  },
  {
    id: 3,
    title: 'Essay Submission',
    start: new Date(2024, 10, 24, 23, 59),
    end: new Date(2024, 10, 24, 23, 59),
    type: 'assignment',
  },
  {
    id: 4,
    title: 'Study Group: History',
    start: new Date(2024, 10, 25, 18, 0),
    end: new Date(2024, 10, 25, 20, 0),
    type: 'study',
  },
]

export default function SchedulePage() {
  const [view, setView] = useState('month')

  const eventStyleGetter = (event: any) => {
    let backgroundColor = ''
    switch (event.type) {
      case 'course':
        backgroundColor = '#3b82f6' // blue
        break
      case 'assignment':
        backgroundColor = '#ef4444' // red
        break
      case 'study':
        backgroundColor = '#10b981' // green
        break
      default:
        backgroundColor = '#6b7280' // gray
    }
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    }
  }

  return (
    <div className="min-h-screen bg-background">
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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Learning Schedule</h2>
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="agenda">Agenda</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="md:col-span-3">
            <CardContent className="p-0">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                view={view as any}
                onView={(newView) => setView(newView)}
                eventPropGetter={eventStyleGetter}
              />
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
                <CardDescription>Your next scheduled activities</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {events.slice(0, 3).map((event) => (
                    <li key={event.id} className="flex items-center space-x-2">
                      {event.type === 'course' && <CalendarIcon className="h-4 w-4 text-blue-500" />}
                      {event.type === 'assignment' && <List className="h-4 w-4 text-red-500" />}
                      {event.type === 'study' && <GraduationCap className="h-4 w-4 text-green-500" />}
                      <span>{event.title}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Study Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Set specific goals for each study session</li>
                  <li>Take regular breaks to maintain focus</li>
                  <li>Review your notes within 24 hours of each class</li>
                  <li>Use active recall techniques to reinforce learning</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}