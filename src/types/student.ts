export interface Grade {
  subject: string
  subjectCode: string
  grade: number
  maxGrade: number
  attendance: number // percentage
  status: 'approved' | 'failed' | 'ongoing'
}

export interface Schedule {
  id: string
  subject: string
  professor: string
  room: string
  dayOfWeek: number // 0 = Monday
  startTime: string
  endTime: string
}

export interface Exam {
  id: string
  subject: string
  date: string
  time: string
  room: string
  type: 'P1' | 'P2' | 'P3' | 'SUB' | 'EX'
}

export interface StudentStats {
  gpa: number
  attendance: number
  completedCredits: number
  totalCredits: number
  pendingItems: number
}
