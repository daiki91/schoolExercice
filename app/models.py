from typing import Dict, List, Optional
from pydantic import BaseModel

class QCMQuestion(BaseModel):
    question_id: str
    statement: str
    correct_answer: bool

class StudentAnswer(BaseModel):
    question_id: str
    answer: bool

class QCMSubmission(BaseModel):
    questions: List[QCMQuestion]
    student_answers: Dict[str, bool]

class FeedbackDetail(BaseModel):
    correct: bool
    reponse_etudiant: str
    explication: str

class QCMFeedback(BaseModel):
    note_sur_20: float
    score_brut: int
    feedback: Dict[str, FeedbackDetail]