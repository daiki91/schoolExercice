
import { Exam, Submission, Statistics, GradeModel } from "@/types";

// Mock exams data
export const mockExams: Exam[] = [
  {
    id: "exam1",
    title: "Algèbre Linéaire - Examen Final",
    description: "Examen couvrant les espaces vectoriels, transformations linéaires et diagonalisation.",
    createdAt: "2023-11-15T10:00:00Z",
    dueDate: "2023-12-15T23:59:59Z",
    professorId: "prof1",
    professorName: "Dr. Martin Bernard",
    attachments: [
      {
        id: "att1",
        fileName: "algebre_examen.pdf",
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-11-15T10:05:00Z",
      },
    ],
    gradeScale: 100,
  },
  {
    id: "exam2",
    title: "Analyse Numérique - Contrôle Continu",
    description: "Évaluation sur les méthodes d'intégration numérique et résolution d'équations différentielles.",
    createdAt: "2023-11-20T14:30:00Z",
    dueDate: "2023-12-05T23:59:59Z",
    professorId: "prof1",
    professorName: "Dr. Martin Bernard",
    attachments: [
      {
        id: "att2",
        fileName: "analyse_controle.pdf",
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-11-20T14:35:00Z",
      },
    ],
    gradeScale: 20,
  },
  {
    id: "exam3",
    title: "Programmation Orientée Objet - Projet Final",
    description: "Projet d'implémentation d'un système de gestion utilisant les principes de la POO.",
    createdAt: "2023-11-25T09:15:00Z",
    dueDate: "2023-12-20T23:59:59Z",
    professorId: "prof1",
    professorName: "Dr. Martin Bernard",
    attachments: [
      {
        id: "att3",
        fileName: "projet_poo_instructions.pdf",
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-11-25T09:20:00Z",
      },
    ],
    gradeScale: 20,
  },
];

// Mock submissions data
export const mockSubmissions: Submission[] = [
  {
    id: "sub1",
    examId: "exam1",
    studentId: "student1",
    studentName: "Sophie Dubois",
    submittedAt: "2023-12-14T18:45:22Z",
    status: "graded",
    grade: 85,
    feedback: "Bon travail sur les transformations linéaires. Quelques erreurs dans la diagonalisation.",
    attachments: [
      {
        id: "subatt1",
        fileName: "sophie_algebre_reponses.pdf",
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-12-14T18:45:22Z",
      },
    ],
  },
  {
    id: "sub2",
    examId: "exam2",
    studentId: "student1",
    studentName: "Sophie Dubois",
    submittedAt: "2023-12-04T21:30:15Z",
    status: "graded",
    grade: 17,
    feedback: "Excellent travail sur les méthodes d'intégration.",
    attachments: [
      {
        id: "subatt2",
        fileName: "sophie_analyse_controle.pdf",
        fileType: "application/pdf",
        fileUrl: "#",
        uploadedAt: "2023-12-04T21:30:15Z",
      },
    ],
  },
  {
    id: "sub3",
    examId: "exam3",
    studentId: "student1",
    studentName: "Sophie Dubois",
    submittedAt: "2023-12-19T22:55:30Z",
    status: "pending",
    attachments: [
      {
        id: "subatt3",
        fileName: "sophie_projet_poo.zip",
        fileType: "application/zip",
        fileUrl: "#",
        uploadedAt: "2023-12-19T22:55:30Z",
      },
    ],
  },
];

// Mock grade models
export const mockGradeModels: GradeModel[] = [
  {
    id: "model1",
    examId: "exam1",
    exerciseNumber: 1,
    modelAnswer: "Démonstration du théorème de la dimension pour les espaces vectoriels de dimension finie.",
    maxPoints: 25,
  },
  {
    id: "model2",
    examId: "exam1",
    exerciseNumber: 2,
    modelAnswer: "Calcul du noyau et de l'image d'une transformation linéaire définie par sa matrice.",
    maxPoints: 25,
  },
  {
    id: "model3",
    examId: "exam1",
    exerciseNumber: 3,
    modelAnswer: "Diagonalisation d'une matrice 3x3 et calcul de ses valeurs propres et vecteurs propres.",
    maxPoints: 25,
  },
  {
    id: "model4",
    examId: "exam1",
    exerciseNumber: 4,
    modelAnswer: "Application des transformations linéaires à un problème concret de géométrie.",
    maxPoints: 25,
  },
];

// Mock statistics
export const mockProfessorStats: Statistics = {
  averageGrade: 78.5,
  totalSubmissions: 45,
  gradedSubmissions: 40,
  pendingSubmissions: 5,
  highestGrade: 98,
  lowestGrade: 45,
};

export const mockStudentStats: Statistics = {
  averageGrade: 82.7,
  totalSubmissions: 12,
  gradedSubmissions: 10,
  pendingSubmissions: 2,
  highestGrade: 95,
  lowestGrade: 68,
};

// Service functions
export const getExamsByProfessorId = (professorId: string): Exam[] => {
  return mockExams.filter(exam => exam.professorId === professorId);
};

export const getExamsForStudent = (): Exam[] => {
  return mockExams;
};

export const getSubmissionsByExamId = (examId: string): Submission[] => {
  return mockSubmissions.filter(sub => sub.examId === examId);
};

export const getSubmissionsByStudentId = (studentId: string): Submission[] => {
  return mockSubmissions.filter(sub => sub.studentId === studentId);
};

export const getGradeModelsByExamId = (examId: string): GradeModel[] => {
  return mockGradeModels.filter(model => model.examId === examId);
};

export const getStatisticsByProfessorId = (professorId: string): Statistics => {
  return mockProfessorStats;
};

export const getStatisticsByStudentId = (studentId: string): Statistics => {
  return mockStudentStats;
};
