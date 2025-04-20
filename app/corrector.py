from typing import Dict, List
from app.models import QCMQuestion, QCMFeedback, FeedbackDetail
from app.explanation import ExplanationGenerator

class QCMCorrector:
    def __init__(self):
        """Initialise le correcteur de QCM"""
        self.explanation_generator = ExplanationGenerator()
        
        # Mapping des réponses correctes pour les questions standards sur les SGBD
        self.standard_answers = {
            "a1": True,  # Une clé primaire dans une base de données relationnelle ne peut contenir de valeurs nulles
            "a2": False, # Dans un modèle relationnel, une table peut avoir plusieurs clés primaires
            "a3": True,  # Un index dans une base de données est utilisé pour accélérer les requêtes
            "a4": False, # Une base de données NoSQL est mieux adaptée pour des données structurées complexes
            "a5": True,  # La normalisation dans une base de données vise à minimiser la duplication des données
            "a6": True   # Une jointure dans SQL est utilisée pour combiner les résultats de plusieurs tables
        }
        
        # Mapping des affirmations pour la génération d'explications
        self.standard_statements = {
            "a1": "Une clé primaire dans une base de données relationnelle ne peut contenir de valeurs nulles.",
            "a2": "Dans un modèle relationnel, une table peut avoir plusieurs clés primaires.",
            "a3": "Un index dans une base de données est utilisé pour accélérer les requêtes en permettant un accès rapide aux données.",
            "a4": "Une base de données NoSQL est mieux adaptée pour des données structurées complexes et des relations multiples entre entités.",
            "a5": "La normalisation dans une base de données vise à minimiser la duplication des données.",
            "a6": "Une jointure dans SQL est utilisée pour combiner les résultats de plusieurs tables en fonction d'une condition spécifiée."
        }
    
    def correct_qcm(self, questions: List[QCMQuestion], student_answers: Dict[str, bool]) -> QCMFeedback:
        """
        Corrige un QCM et fournit un feedback détaillé
        
        Args:
            questions: Liste des questions du QCM
            student_answers: Réponses de l'étudiant
        
        Returns:
            Un objet QCMFeedback contenant la note et le détail du feedback
        """
        # Si les questions ne sont pas fournies, utiliser les questions standard
        if not questions:
            questions = self._get_standard_questions()
        
        # Initialiser le feedback
        feedback = {}
        score = 0
        total_questions = len(questions)
        
        # Évaluer chaque réponse
        for question in questions:
            question_id = question.question_id
            
            # Vérifier que l'étudiant a répondu à cette question
            if question_id not in student_answers:
                continue
                
            student_answer = student_answers[question_id]
            is_correct = student_answer == question.correct_answer
            
            if is_correct:
                score += 1
            
            # Générer l'explication avec DeepSeek-Coder
            explanation = self.explanation_generator.generate_explanation(
                question.statement, 
                not (is_correct == False and student_answer == True)  # Vrai si l'affirmation est vraie ou si l'étudiant a correctement identifié qu'elle est fausse
            )
            
            # Formater la réponse de l'étudiant pour l'affichage
            student_answer_text = "vrai" if student_answer else "faux"
            
            # Ajouter au feedback
            feedback[question_id] = FeedbackDetail(
                correct=is_correct,
                reponse_etudiant=student_answer_text,
                explication=explanation
            )
        
        # Calculer la note sur 20
        note_sur_20 = (score / total_questions) * 20 if total_questions > 0 else 0
        
        # Retourner le résultat
        return QCMFeedback(
            note_sur_20=round(note_sur_20, 2),
            score_brut=score,
            feedback=feedback
        )
    
    def _get_standard_questions(self) -> List[QCMQuestion]:
        """
        Retourne la liste des questions standard pour le QCM sur les SGBD
        """
        questions = []
        for question_id, statement in self.standard_statements.items():
            questions.append(QCMQuestion(
                question_id=question_id,
                statement=statement,
                correct_answer=self.standard_answers[question_id]
            ))
        return questions