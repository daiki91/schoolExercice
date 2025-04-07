from fastapi import FastAPI, HTTPException
from app.models import QCMSubmission, QCMFeedback
from app.corrector import QCMCorrector

app = FastAPI(
    title="Service de correction automatisée pour QCM SGBD",
    description="API permettant de corriger des QCM Vrai/Faux sur les bases de données avec explications générées par DeepSeek-Coder",
    version="1.0.0"
)

# Initialiser le correcteur
corrector = QCMCorrector()

@app.post("/correct", response_model=QCMFeedback)
async def correct_qcm(submission: QCMSubmission):
    """
    Corrige un QCM Vrai/Faux sur les bases de données
    
    Prend en entrée les questions et les réponses de l'étudiant, puis retourne
    une note sur 20, un score brut et un feedback détaillé pour chaque question.
    """
    try:
        # Convertir les réponses textuelles (vrai/faux) en booléens si nécessaire
        student_answers = {}
        for question_id, answer in submission.student_answers.items():
            if isinstance(answer, str):
                answer_lower = answer.lower()
                if answer_lower in ["vrai", "true", "v", "t"]:
                    student_answers[question_id] = True
                elif answer_lower in ["faux", "false", "f"]:
                    student_answers[question_id] = False
                else:
                    raise HTTPException(status_code=400, detail=f"Format de réponse invalide pour la question {question_id}: {answer}")
            else:
                student_answers[question_id] = answer
        
        # Corriger le QCM
        feedback = corrector.correct_qcm(submission.questions, student_answers)
        return feedback
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la correction: {str(e)}")

@app.post("/correct/standard", response_model=QCMFeedback)
async def correct_standard_qcm(student_answers: dict):
    """
    Corrige le QCM standard sur les SGBD
    
    Utilise les questions prédéfinies et prend seulement les réponses de l'étudiant.
    """
    try:
        # Convertir les réponses textuelles (vrai/faux) en booléens si nécessaire
        processed_answers = {}
        for question_id, answer in student_answers.items():
            if isinstance(answer, str):
                answer_lower = answer.lower()
                if answer_lower in ["vrai", "true", "v", "t"]:
                    processed_answers[question_id] = True
                elif answer_lower in ["faux", "false", "f"]:
                    processed_answers[question_id] = False
                else:
                    raise HTTPException(status_code=400, detail=f"Format de réponse invalide pour la question {question_id}: {answer}")
            else:
                processed_answers[question_id] = answer
        
        # Corriger le QCM avec les questions standard
        feedback = corrector.correct_qcm([], processed_answers)
        return feedback
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erreur lors de la correction: {str(e)}")

@app.get("/health")
async def health_check():
    """Point de terminaison pour vérifier la santé du service"""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)