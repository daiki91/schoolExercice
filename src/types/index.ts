
export type UserRole = "professor" | "student";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  dueDate: string;
  professorId: string;
  professorName: string;
  attachments: Attachment[];
  gradeScale?: number;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface Submission {
  id: string;
  examId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: "pending" | "graded";
  grade?: number;
  feedback?: string;
  attachments: Attachment[];
}

export interface GradeModel {
  id: string;
  examId: string;
  exerciseNumber: number;
  modelAnswer: string;
  maxPoints: number;
}

export interface Statistics {
  averageGrade: number;
  totalSubmissions: number;
  gradedSubmissions: number;
  pendingSubmissions: number;
  highestGrade: number;
  lowestGrade: number;
}
