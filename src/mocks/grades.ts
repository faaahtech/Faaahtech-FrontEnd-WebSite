import type { Grade, Exam, StudentStats } from '@/types/student'

export const MOCK_GRADES: Grade[] = [
  { subject: 'Engenharia de Software', subjectCode: 'ENG', grade: 8.5, maxGrade: 10, attendance: 90, status: 'ongoing' },
  { subject: 'Banco de Dados I', subjectCode: 'BD1', grade: 9.2, maxGrade: 10, attendance: 95, status: 'ongoing' },
  { subject: 'Sistemas Operacionais', subjectCode: 'SO', grade: 6.0, maxGrade: 10, attendance: 72, status: 'ongoing' },
  { subject: 'Algoritmos e Programação', subjectCode: 'ALG', grade: 7.5, maxGrade: 10, attendance: 88, status: 'ongoing' },
  { subject: 'Design de Interfaces', subjectCode: 'DSG', grade: 9.5, maxGrade: 10, attendance: 98, status: 'ongoing' },
  { subject: 'Matemática Discreta', subjectCode: 'MAT', grade: 8.0, maxGrade: 10, attendance: 85, status: 'ongoing' },
]

export const MOCK_EXAMS: Exam[] = [
  { id: 'ex-001', subject: 'P1 — Algoritmos', date: '2024-11-15', time: '19:00', room: 'Sala 302', type: 'P1' },
  { id: 'ex-002', subject: 'P2 — Banco de Dados', date: '2024-11-20', time: '19:00', room: 'Lab 101', type: 'P2' },
  { id: 'ex-003', subject: 'P1 — Sistemas Operacionais', date: '2024-11-22', time: '19:30', room: 'Sala 204', type: 'P1' },
]

export const MOCK_STUDENT_STATS: StudentStats = {
  gpa: 8.4,
  attendance: 92,
  completedCredits: 48,
  totalCredits: 160,
  pendingItems: 2,
}
