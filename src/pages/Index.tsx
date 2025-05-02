
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, GraduationCap, Upload, BarChart, User, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-white py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-brand-blue">GradeEasy</h1>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Button onClick={() => navigate("/dashboard")} className="flex items-center gap-2">
                Tableau de bord
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate("/login")}>
                  Connexion
                </Button>
                <Button onClick={() => navigate("/register")}>
                  Inscription
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
              Simplifiez la correction <br /> avec l'IA
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 md:text-xl">
              GradeEasy automatise la correction d'examens grâce à l'intelligence artificielle, 
              permettant aux enseignants de se concentrer sur ce qui compte vraiment.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                className="h-12 px-8 text-base"
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
              >
                {isAuthenticated ? "Accéder à mon tableau de bord" : "Commencer gratuitement"}
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8 text-base"
                onClick={() => navigate("/login")}
              >
                {isAuthenticated ? "Gérer mes examens" : "Découvrir la plateforme"}
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Fonctionnalités principales</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 rounded-full bg-blue-100 p-3 inline-block">
                  <Upload className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Soumission simplifiée</h3>
                <p className="text-gray-600">
                  Téléchargez facilement des sujets d'examen et recevez les réponses de vos étudiants au format PDF avec notre interface glisser-déposer.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 rounded-full bg-blue-100 p-3 inline-block">
                  <GraduationCap className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Correction automatique</h3>
                <p className="text-gray-600">
                  Notre IA analyse les réponses des étudiants et les compare à vos modèles de correction pour générer des notes précises instantanément.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 rounded-full bg-blue-100 p-3 inline-block">
                  <BarChart className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="mb-3 text-xl font-bold">Analyses détaillées</h3>
                <p className="text-gray-600">
                  Visualisez les performances des étudiants avec des statistiques détaillées et des graphiques d'évolution pour suivre leur progrès.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold">Pour qui est GradeEasy ?</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Professors */}
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-brand-blue p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Professeurs</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 rounded-full bg-green-100 p-1">
                      <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span>Gagnez du temps sur la correction et le suivi des notes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 rounded-full bg-green-100 p-1">
                      <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span>Créez facilement des examens et des modèles de correction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 rounded-full bg-green-100 p-1">
                      <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span>Analysez les performances des étudiants avec des statistiques détaillées</span>
                  </li>
                </ul>
                <Button 
                  className="mt-6 w-full"
                  onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
                >
                  {isAuthenticated ? "Accéder au tableau de bord" : "Créer un compte professeur"}
                </Button>
              </div>

              {/* Students */}
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-full bg-brand-blue p-3">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Étudiants</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 rounded-full bg-green-100 p-1">
                      <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span>Accédez rapidement à tous vos examens en un seul endroit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 rounded-full bg-green-100 p-1">
                      <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span>Soumettez vos réponses facilement via notre interface intuitive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 rounded-full bg-green-100 p-1">
                      <svg className="h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                    <span>Suivez vos progrès et vos performances sur l'ensemble de vos examens</span>
                  </li>
                </ul>
                <Button 
                  className="mt-6 w-full"
                  onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
                >
                  {isAuthenticated ? "Voir mes examens" : "Créer un compte étudiant"}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-brand-blue py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold">Prêt à révolutionner votre façon de noter ?</h2>
            <p className="mx-auto mb-8 max-w-2xl text-blue-100">
              Rejoignez des milliers d'enseignants et d'étudiants qui utilisent GradeEasy pour simplifier le processus d'évaluation.
            </p>
            <Button
              variant="secondary"
              className="h-12 px-8 text-base text-brand-blue"
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
            >
              {isAuthenticated ? "Accéder à mon compte" : "Commencer maintenant"}
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-xl font-bold text-brand-blue">GradeEasy</h2>
              <p className="text-sm text-gray-600">La plateforme de correction automatisée pour l'éducation moderne</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-brand-blue">À propos</a>
              <a href="#" className="text-gray-600 hover:text-brand-blue">Fonctionnalités</a>
              <a href="#" className="text-gray-600 hover:text-brand-blue">Contact</a>
              <a href="#" className="text-gray-600 hover:text-brand-blue">Aide</a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} GradeEasy. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
