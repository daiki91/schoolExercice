
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, FileText, Eye } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSubmissionsByStudentId, getExamsByProfessorId, getExamsForStudent } from "@/services/mockData";
import { Submission } from "@/types";

// Données fictives pour les soumissions d'examen des professeurs
const mockAllSubmissions = [
  {
    id: "sub1",
    examId: "exam1",
    studentName: "Sophie Dubois",
    studentId: "student1",
    submittedAt: "2025-04-28T14:30:00Z",
    status: "graded",
    grade: 17,
  },
  {
    id: "sub2",
    examId: "exam2",
    studentName: "Thomas Bernard",
    studentId: "student2",
    submittedAt: "2025-04-29T09:15:00Z",
    status: "pending",
    grade: null,
  },
  {
    id: "sub3",
    examId: "exam1",
    studentName: "Julie Martin",
    studentId: "student3",
    submittedAt: "2025-04-27T16:45:00Z",
    status: "graded",
    grade: 15,
  },
  {
    id: "sub4",
    examId: "exam3",
    studentName: "Lucas Petit",
    studentId: "student4",
    submittedAt: "2025-04-30T11:20:00Z",
    status: "pending",
    grade: null,
  },
  {
    id: "sub5",
    examId: "exam2",
    studentName: "Emma Durand",
    studentId: "student5",
    submittedAt: "2025-04-28T10:00:00Z",
    status: "graded",
    grade: 18,
  },
];

const Submissions: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const isProfessor = user?.role === "professor";
  
  // Pour les étudiants, on récupère leurs soumissions
  const studentSubmissions = getSubmissionsByStudentId(user?.id || "");
  
  // Les données à afficher selon le rôle
  const submissions = isProfessor ? mockAllSubmissions : studentSubmissions;
  
  // Get all exams for reference
  const allExams = useMemo(() => {
    return isProfessor ? getExamsByProfessorId(user?.id || "") : getExamsForStudent();
  }, [isProfessor, user?.id]);
  
  // Get exam title by examId
  const getExamTitle = (examId: string) => {
    const exam = allExams.find(exam => exam.id === examId);
    return exam ? exam.title : "Examen inconnu";
  };

  // Filtrer les soumissions
  const filteredSubmissions = submissions.filter(sub => {
    // Filtre par statut
    if (activeTab === "pending" && sub.status !== "pending") return false;
    if (activeTab === "graded" && sub.status !== "graded") return false;
    
    // Filtre par terme de recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const examTitle = getExamTitle(sub.examId).toLowerCase();
      return (
        examTitle.includes(searchLower) ||
        sub.studentName?.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Formater la date en format lisible
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="mb-6 text-2xl font-bold">
          {isProfessor ? "Toutes les soumissions" : "Mes soumissions"}
        </h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Rechercher</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par titre d'examen..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="pending">En attente</TabsTrigger>
            <TabsTrigger value="graded">Corrigés</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Examen</TableHead>
                    {isProfessor && <TableHead>Étudiant</TableHead>}
                    <TableHead>Date de soumission</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{getExamTitle(submission.examId)}</span>
                        </div>
                      </TableCell>
                      {isProfessor && <TableCell>{submission.studentName}</TableCell>}
                      <TableCell>{formatDate(submission.submittedAt)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          submission.status === "graded" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {submission.status === "graded" ? "Corrigé" : "En attente"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {submission.grade !== null ? `${submission.grade}/20` : "-"}
                      </TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/submission/${submission.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Examen</TableHead>
                    {isProfessor && <TableHead>Étudiant</TableHead>}
                    <TableHead>Date de soumission</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{getExamTitle(submission.examId)}</span>
                        </div>
                      </TableCell>
                      {isProfessor && <TableCell>{submission.studentName}</TableCell>}
                      <TableCell>{formatDate(submission.submittedAt)}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          En attente
                        </span>
                      </TableCell>
                      <TableCell>-</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/submission/${submission.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="graded">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Examen</TableHead>
                    {isProfessor && <TableHead>Étudiant</TableHead>}
                    <TableHead>Date de soumission</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Note</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span>{getExamTitle(submission.examId)}</span>
                        </div>
                      </TableCell>
                      {isProfessor && <TableCell>{submission.studentName}</TableCell>}
                      <TableCell>{formatDate(submission.submittedAt)}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Corrigé
                        </span>
                      </TableCell>
                      <TableCell>{submission.grade}/20</TableCell>
                      <TableCell>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => navigate(`/submission/${submission.id}`)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Voir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Submissions;
