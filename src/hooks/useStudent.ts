import { useState, useEffect } from 'react'
import type { Grade, Exam, StudentStats } from '@/types/student'
import { studentService } from '@/services/studentService'

export function useStudent() {
  const [grades, setGrades] = useState<Grade[]>([])
  const [exams, setExams] = useState<Exam[]>([])
  const [stats, setStats] = useState<StudentStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setIsLoading(true)
      try {
        const [g, e, s] = await Promise.all([
          studentService.getGrades(),
          studentService.getExams(),
          studentService.getStats(),
        ])
        if (!cancelled) {
          setGrades(g)
          setExams(e)
          setStats(s)
        }
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return { grades, exams, stats, isLoading }
}
