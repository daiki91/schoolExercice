import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, ChevronRight, FilePlus, Search } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Layout from "@/components/Layout";
import FileUpload from "@/components/FileUpload";
import { useAuth } from "@/context/AuthContext";
import { getExamsByProfessorId, getExamsForStudent, mockExams } from "@/services/mockData";
import { Exam } from "@/types";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Le titre doit contenir au moins 5 caractères",
  }),
  description: z.string().min(10, {
    message: "La description doit contenir au moins 10 caractères",
  }),
  dueDate: z.date({
    required_error: "Une date limite est requise",
  }),
  gradeScale: z.coerce.number().min(10).max(100),
});

const Exams: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  const isProfessor = user?.role === "professor";
  
  const exams = isProfessor 
    ? getExamsByProfessorId(user?.id || "")
    : getExamsForStudent();

  const filteredExams = exams.filter(exam => 
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exam.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      gradeScale: 100,
    },
  });

  const onFileSelect = (file: File) => {
    setUploadedFile(file);
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!uploadedFile) {
      toast({
        title: "Fichier requis",
        description: "Veuillez charger un sujet d'examen",
        variant: "destructive",
      });
      return;
    }

    // Here we would typically send this to an API
    const newExam: Partial<Exam> = {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate.toISOString(),
      gradeScale: data.gradeScale,
    };

    toast({
      title: "Examen créé",
      description: "L'examen a été créé avec succès",
    });

    setOpen(false);
    form.reset();
    setUploadedFile(null);
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Examens</h1>
            <p className="text-muted-foreground">
              {isProfessor 
                ? "Gérez vos examens et suivez les soumissions" 
                : "Consultez et soumettez vos examens"
              }
            </p>
          </div>
          
          {isProfessor && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>
                  <FilePlus className="mr-2 h-4 w-4" />
                  Créer un examen
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Créer un nouvel examen</DialogTitle>
                  <DialogDescription>
                    Saisissez les détails de l'examen et téléchargez le sujet
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Titre</FormLabel>
                          <FormControl>
                            <Input placeholder="Titre de l'examen" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Description de l'examen, instructions, etc." 
                              className="min-h-[100px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="dueDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date limite</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Sélectionner une date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="gradeScale"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Barème</FormLabel>
                            <FormControl>
                              <Input type="number" min={10} max={100} {...field} />
                            </FormControl>
                            <FormDescription>
                              Sur combien de points (10-100)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormItem>
                      <FormLabel>Sujet d'examen</FormLabel>
                      <FileUpload
                        onFileSelect={onFileSelect}
                        accept="application/pdf"
                        label="Déposer le sujet d'examen (PDF)"
                      />
                    </FormItem>
                    
                    <DialogFooter>
                      <Button type="submit">Créer l'examen</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher des examens..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="active">
              {isProfessor ? "Actifs" : "À faire"}
            </TabsTrigger>
            <TabsTrigger value="past">
              {isProfessor ? "Passés" : "Complétés"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredExams.length > 0 ? (
                filteredExams.map((exam) => (
                  <Card key={exam.id} className="card-hover">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl">{exam.title}</CardTitle>
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
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Créé le:</span>
                          <span>{new Date(exam.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date limite:</span>
                          <span>{new Date(exam.dueDate).toLocaleDateString()}</span>
                        </div>
                        {!isProfessor && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Professeur:</span>
                            <span>{exam.professorName}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        onClick={() => navigate(`/exams/${exam.id}`)}
                      >
                        {isProfessor ? "Gérer" : "Consulter"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex h-40 items-center justify-center text-center text-muted-foreground">
                  {searchTerm 
                    ? "Aucun examen ne correspond à votre recherche." 
                    : "Aucun examen disponible pour le moment."}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="active">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredExams
                .filter(exam => new Date(exam.dueDate) >= new Date())
                .length > 0 ? (
                filteredExams
                  .filter(exam => new Date(exam.dueDate) >= new Date())
                  .map((exam) => (
                    <Card key={exam.id} className="card-hover">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-xl">{exam.title}</CardTitle>
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
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Créé le:</span>
                            <span>{new Date(exam.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date limite:</span>
                            <span>{new Date(exam.dueDate).toLocaleDateString()}</span>
                          </div>
                          {!isProfessor && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Professeur:</span>
                              <span>{exam.professorName}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          onClick={() => navigate(`/exams/${exam.id}`)}
                        >
                          {isProfessor ? "Gérer" : "Consulter"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
              ) : (
                <div className="col-span-full flex h-40 items-center justify-center text-center text-muted-foreground">
                  Aucun examen actif pour le moment.
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="past">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredExams
                .filter(exam => new Date(exam.dueDate) < new Date())
                .length > 0 ? (
                filteredExams
                  .filter(exam => new Date(exam.dueDate) < new Date())
                  .map((exam) => (
                    <Card key={exam.id} className="card-hover">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-xl">{exam.title}</CardTitle>
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
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Créé le:</span>
                            <span>{new Date(exam.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date limite:</span>
                            <span>{new Date(exam.dueDate).toLocaleDateString()}</span>
                          </div>
                          {!isProfessor && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Professeur:</span>
                              <span>{exam.professorName}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full"
                          onClick={() => navigate(`/exams/${exam.id}`)}
                        >
                          {isProfessor ? "Gérer" : "Consulter"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
              ) : (
                <div className="col-span-full flex h-40 items-center justify-center text-center text-muted-foreground">
                  Aucun examen passé pour le moment.
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Exams;
