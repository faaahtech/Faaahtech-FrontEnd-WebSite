import type { Grade, Exam, StudentStats } from '@/types/student'
import { MOCK_GRADES, MOCK_EXAMS, MOCK_STUDENT_STATS } from '@/mocks/grades'
import { simulateDelay } from '@/utils/cn'

export const studentService = {
  async getGrades(): Promise<Grade[]> {
    await simulateDelay(700)
    return [...MOCK_GRADES]
  },

  async getExams(): Promise<Exam[]> {
    await simulateDelay(500)
    return [...MOCK_EXAMS]
  },

  async getStats(): Promise<StudentStats> {
    await simulateDelay(400)
    return { ...MOCK_STUDENT_STATS }
  },
}
