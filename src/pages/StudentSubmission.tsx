
import React from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Download, CheckCircle } from "lucide-react";
import FileUpload from "@/components/FileUpload";

const StudentSubmission = () => {
  const { user } = useAuth();

  const handleFileSelect = (file: File) => {
    console.log("File selected:", file);
    // Ici nous ajouterons la logique de soumission
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="mb-6 text-2xl font-bold">Soumission d'Examen</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Détails de l'Examen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Mathématiques - Algèbre Linéaire</h3>
                  <p className="text-sm text-muted-foreground">Date limite: 25 Avril 2025</p>
                </div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger le sujet
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Votre Soumission</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <FileUpload
                  onFileSelect={handleFileSelect}
                  accept="application/pdf"
                  label="Déposer votre réponse (PDF)"
                />
                <Button className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Soumettre
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Historique des Soumissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Version 1</p>
                    <p className="text-sm text-muted-foreground">Soumis le 20 Avril 2025</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default StudentSubmission;
