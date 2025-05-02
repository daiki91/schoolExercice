import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { ChevronRight, FileText, Upload, Users, BarChart3, Clock } from "lucide-react";
import Layout from "@/components/Layout";
import StatCard from "@/components/StatCard";
import { useAuth } from "@/context/AuthContext";
import { 
  mockProfessorStats, 
  mockStudentStats, 
  getExamsByProfessorId, 
  getSubmissionsByStudentId, 
  getExamsForStudent
} from "@/services/mockData";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const isProfessor = user?.role === "professor";
  const stats = isProfessor ? mockProfessorStats : mockStudentStats;
  
  const recentExams = isProfessor 
    ? getExamsByProfessorId(user?.id || "")
    : getExamsForStudent();
  
  const recentSubmissions = isProfessor 
    ? [] // Professors would see different submissions
    : getSubmissionsByStudentId(user?.id || "");

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Bienvenue, {user?.name}. Voici un aperçu de votre activité.
          </p>
        </div>

        <div className="dashboard-stats">
          <StatCard
            title="Note moyenne"
            value={`${stats.averageGrade}${isProfessor ? '/100' : '/100'}`}
            icon={<BarChart3 className="h-5 w-5" />}
            description={isProfessor ? "Tous les étudiants" : "Tous vos examens"}
          />
          <StatCard
            title={isProfessor ? "Soumissions" : "Examens complétés"}
            value={stats.gradedSubmissions}
            icon={<FileText className="h-5 w-5" />}
            description="Corrigés"
          />
          <StatCard
            title="En attente"
            value={stats.pendingSubmissions}
            icon={<Clock className="h-5 w-5" />}
            description={isProfessor ? "Soumissions à corriger" : "Examens en attente de correction"}
          />
          <StatCard
            title={isProfessor ? "Étudiants actifs" : "Prochains examens"}
            value={isProfessor ? "45" : "2"}
            icon={isProfessor ? <Users className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
            description={isProfessor ? "Ce mois-ci" : "À rendre cette semaine"}
          />
        </div>

        <Tabs defaultValue="recent" className="mt-8">
          <TabsList>
            <TabsTrigger value="recent">
              {isProfessor ? "Examens récents" : "Mes examens"}
            </TabsTrigger>
            <TabsTrigger value="activity">
              {isProfessor ? "Activité récente" : "Mes soumissions"}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isProfessor ? "Examens récents" : "Mes examens"}
                </CardTitle>
                <CardDescription>
                  {isProfessor 
                    ? "Vos examens les plus récemment créés" 
                    : "Examens disponibles pour vous"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {recentExams.map((exam) => (
                      <Card key={exam.id} className="card-hover">
                        <CardHeader className="p-4">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{exam.title}</CardTitle>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => navigate(`/exams/${exam.id}`)}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                          <CardDescription>{exam.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0">
                          <div className="flex w-full items-center justify-between text-sm">
                            <span className="text-muted-foreground">
                              Date limite: {new Date(exam.dueDate).toLocaleDateString()}
                            </span>
                            {!isProfessor && (
                              <div className="flex items-center gap-2">
                                <span className="text-muted-foreground">Progression:</span>
                                <Progress value={0} className="h-2 w-20" />
                              </div>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => navigate("/exams")}
                >
                  {isProfessor ? "Gérer tous les examens" : "Voir tous les examens"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isProfessor ? "Activité récente" : "Mes soumissions"}
                </CardTitle>
                <CardDescription>
                  {isProfessor 
                    ? "Les dernières activités sur vos examens" 
                    : "Vos soumissions récentes"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {!isProfessor && recentSubmissions.map((submission) => (
                      <Card key={submission.id} className="card-hover">
                        <CardHeader className="p-4">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              {recentExams.find(e => e.id === submission.examId)?.title || "Examen"}
                            </CardTitle>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => navigate(`/submissions/${submission.id}`)}
                            >
                              <ChevronRight className="h-5 w-5" />
                            </Button>
                          </div>
                          <CardDescription>
                            Soumis le {new Date(submission.submittedAt).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0">
                          <div className="flex w-full items-center justify-between text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              submission.status === "graded" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-yellow-100 text-yellow-800"
                            }`}>
                              {submission.status === "graded" ? "Corrigé" : "En attente"}
                            </span>
                            {submission.status === "graded" && (
                              <span className="font-bold">
                                Note: {submission.grade}/20
                              </span>
                            )}
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                    {isProfessor && (
                      <div className="flex h-[200px] items-center justify-center text-muted-foreground">
                        Les activités récentes seront affichées ici.
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => navigate(isProfessor ? "/submissions" : "/submissions")}
                >
                  {isProfessor ? "Voir toutes les soumissions" : "Voir toutes les soumissions"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
