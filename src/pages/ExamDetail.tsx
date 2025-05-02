
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Download, UploadCloud, FileText, Users, Clock, AlertCircle, Check } from "lucide-react";
import { mockExams, mockSubmissions, mockGradeModels, getSubmissionsByExamId } from "@/services/mockData";
import { useAuth } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import { Exam, Submission, GradeModel } from "@/types";

const ExamDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showGradeModelsDialog, setShowGradeModelsDialog] = useState(false);
  const [newGradeModel, setNewGradeModel] = useState<Partial<GradeModel>>({
    exerciseNumber: 1,
    modelAnswer: "",
    maxPoints: 25,
  });

  const isProfessor = user?.role === "professor";
  
  // Find the exam in our mock data
  const exam = mockExams.find((e) => e.id === id);
  
  // Get submissions for this exam
  const submissions = getSubmissionsByExamId(id || "");
  
  // Get grade models for this exam
  const gradeModels = mockGradeModels.filter((model) => model.examId === id);
  
  // For student: find their submission for this exam
  const studentSubmission = mockSubmissions.find(
    (sub) => sub.examId === id && sub.studentId === user?.id
  );

  if (!exam) {
    return (
      <Layout>
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
            <h1 className="mt-4 text-2xl font-bold">Examen non trouvé</h1>
            <p className="mt-2 text-muted-foreground">
              L'examen que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Button className="mt-4" onClick={() => navigate("/exams")}>
              Retour aux examens
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
  };

  const handleSubmitExam = () => {
    if (!uploadedFile) {
      toast({
        title: "Fichier requis",
        description: "Veuillez charger votre réponse avant de soumettre",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Examen soumis",
      description: "Votre réponse a été soumise avec succès",
    });
    
    setShowSubmitDialog(false);
    // Here we would typically send this to an API
  };

  const handleAddGradeModel = () => {
    if (!newGradeModel.modelAnswer || !newGradeModel.maxPoints) {
      toast({
        title: "Champs requis",
        description: "Tous les champs sont obligatoires",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Modèle ajouté",
      description: "Le modèle de correction a été ajouté avec succès",
    });
    
    setShowGradeModelsDialog(false);
    setNewGradeModel({
      exerciseNumber: (newGradeModel.exerciseNumber || 0) + 1,
      modelAnswer: "",
      maxPoints: 25,
    });
    // Here we would typically send this to an API
  };

  const isExamActive = new Date(exam.dueDate) >= new Date();

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-8 flex items-center">
          <Button
            variant="ghost"
            className="mr-4"
            onClick={() => navigate("/exams")}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{exam.title}</h1>
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground">
                {isProfessor ? "Créé le" : "Professeur:"} {" "}
                {isProfessor 
                  ? new Date(exam.createdAt).toLocaleDateString() 
                  : exam.professorName
                }
              </span>
              <Badge 
                variant={isExamActive ? "default" : "secondary"}
                className={isExamActive ? "bg-green-500" : ""}
              >
                {isExamActive ? "Actif" : "Terminé"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Détails de l'examen</CardTitle>
                <CardDescription>
                  {exam.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">{exam.attachments[0].fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          Ajouté le {new Date(exam.attachments[0].uploadedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="gap-1">
                      <Download className="h-4 w-4" />
                      Télécharger
                    </Button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-md border p-4">
                      <h3 className="mb-2 font-medium">Date limite</h3>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <span>{new Date(exam.dueDate).toLocaleDateString()} à {new Date(exam.dueDate).toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <div className="rounded-md border p-4">
                      <h3 className="mb-2 font-medium">Barème</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold">{exam.gradeScale}</span>
                        <span className="text-muted-foreground">points</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {!isProfessor && isExamActive && (
                  <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <UploadCloud className="mr-2 h-4 w-4" />
                        {studentSubmission ? "Modifier ma soumission" : "Soumettre ma réponse"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Soumettre votre réponse</DialogTitle>
                        <DialogDescription>
                          Téléchargez votre fichier PDF contenant votre réponse à l'examen
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <FileUpload
                          onFileSelect={handleFileSelect}
                          accept="application/pdf"
                          label="Déposer votre réponse (PDF)"
                        />
                      </div>
                      <DialogFooter>
                        <Button onClick={handleSubmitExam}>
                          Soumettre
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
                
                {!isProfessor && !isExamActive && !studentSubmission && (
                  <div className="w-full text-center text-amber-500">
                    <AlertCircle className="mx-auto mb-2 h-6 w-6" />
                    La date limite est dépassée. Vous n'avez pas soumis de réponse.
                  </div>
                )}
                
                {!isProfessor && studentSubmission && (
                  <div className="w-full text-center">
                    <Check className="mx-auto mb-2 h-6 w-6 text-green-500" />
                    Vous avez soumis votre réponse le {new Date(studentSubmission.submittedAt).toLocaleDateString()}
                    {studentSubmission.status === "graded" && (
                      <div className="mt-2 font-medium">
                        Note: <span className="text-lg">{studentSubmission.grade}</span>/100
                      </div>
                    )}
                  </div>
                )}
                
                {isProfessor && (
                  <Dialog open={showGradeModelsDialog} onOpenChange={setShowGradeModelsDialog}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        Gérer les modèles de correction
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Modèles de correction</DialogTitle>
                        <DialogDescription>
                          Ajoutez des modèles de correction pour chaque exercice
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4 space-y-4">
                        <div>
                          <h3 className="mb-2 font-medium">Modèles existants</h3>
                          {gradeModels.length > 0 ? (
                            <div className="space-y-2">
                              {gradeModels.map((model) => (
                                <div key={model.id} className="rounded-md border p-3">
                                  <div className="flex justify-between">
                                    <span className="font-medium">Exercice {model.exerciseNumber}</span>
                                    <span>{model.maxPoints} points</span>
                                  </div>
                                  <p className="mt-1 text-sm text-muted-foreground">{model.modelAnswer}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">Aucun modèle ajouté pour le moment</p>
                          )}
                        </div>
                        
                        <div className="border-t pt-4">
                          <h3 className="mb-2 font-medium">Ajouter un nouveau modèle</h3>
                          <div className="space-y-4">
                            <div className="flex gap-4">
                              <div className="w-1/3">
                                <label className="mb-1 block text-sm font-medium">Exercice</label>
                                <Input
                                  type="number"
                                  min={1}
                                  value={newGradeModel.exerciseNumber}
                                  onChange={(e) => setNewGradeModel({
                                    ...newGradeModel,
                                    exerciseNumber: parseInt(e.target.value),
                                  })}
                                />
                              </div>
                              <div className="w-2/3">
                                <label className="mb-1 block text-sm font-medium">Points</label>
                                <Input
                                  type="number"
                                  min={1}
                                  value={newGradeModel.maxPoints}
                                  onChange={(e) => setNewGradeModel({
                                    ...newGradeModel,
                                    maxPoints: parseInt(e.target.value),
                                  })}
                                />
                              </div>
                            </div>
                            <div>
                              <label className="mb-1 block text-sm font-medium">Modèle de réponse</label>
                              <Textarea
                                className="min-h-[100px]"
                                placeholder="Entrez le modèle de réponse pour cet exercice"
                                value={newGradeModel.modelAnswer}
                                onChange={(e) => setNewGradeModel({
                                  ...newGradeModel,
                                  modelAnswer: e.target.value,
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddGradeModel}>
                          Ajouter le modèle
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-6">
            {isProfessor && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Soumissions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-3xl font-bold">
                    {submissions.length}
                    <span className="ml-1 text-sm text-muted-foreground">/ 20 étudiants</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-md bg-green-50 p-2 text-center">
                      <div className="text-lg font-bold text-green-600">
                        {submissions.filter(s => s.status === "graded").length}
                      </div>
                      <div className="text-xs text-green-700">Corrigées</div>
                    </div>
                    <div className="rounded-md bg-yellow-50 p-2 text-center">
                      <div className="text-lg font-bold text-yellow-600">
                        {submissions.filter(s => s.status === "pending").length}
                      </div>
                      <div className="text-xs text-yellow-700">En attente</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(`/exams/${id}/submissions`)}
                  >
                    Voir toutes les soumissions
                  </Button>
                </CardFooter>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-muted-foreground">Créé par</dt>
                    <dd className="font-medium">{exam.professorName}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Date de création</dt>
                    <dd>{new Date(exam.createdAt).toLocaleDateString()}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Date limite</dt>
                    <dd>{new Date(exam.dueDate).toLocaleDateString()}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Statut</dt>
                    <dd>
                      <Badge variant={isExamActive ? "default" : "secondary"}>
                        {isExamActive ? "Actif" : "Terminé"}
                      </Badge>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Barème</dt>
                    <dd>{exam.gradeScale} points</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExamDetail;
