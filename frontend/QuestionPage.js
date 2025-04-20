import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function QuestionPage() {
  const { roomCode } = useParams();
  const navigate = useNavigate();

  const [mode, setMode] = useState("enseignant");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correct: [],
    points: 1,
  });
  const [studentAnswers, setStudentAnswers] = useState([]);
  const [scoreResult, setScoreResult] = useState(null);
  const [error, setError] = useState("");

  const handleCorrectToggle = (index) => {
    const newCorrect = newQuestion.correct.includes(index)
      ? newQuestion.correct.filter(i => i !== index)
      : [...newQuestion.correct, index];
    setNewQuestion({ ...newQuestion, correct: newCorrect });
  };

  const handleAnswerChange = (qIndex, optIndex) => {
    const updatedAnswers = [...studentAnswers];
    const current = updatedAnswers[qIndex] || [];

    const newAnswers = current.includes(optIndex)
      ? current.filter(i => i !== optIndex)
      : [...current, optIndex];

    updatedAnswers[qIndex] = newAnswers;
    setStudentAnswers(updatedAnswers);
  };

  const handleSubmitAnswers = () => {
    let total = 0;
    let score = 0;

    questions.forEach((q, i) => {
      const correctAnswers = q.correct;
      const userAnswers = studentAnswers[i] || [];
      total += q.points;

      const isCorrect =
        userAnswers.length === correctAnswers.length &&
        userAnswers.every((ans) => correctAnswers.includes(ans));

      if (isCorrect) {
        score += q.points;
      }
    });

    setScoreResult({ score, total });
  };

  const handleAddQuestion = () => {
    if (!newQuestion.points || newQuestion.points < 1) {
      setError("Le barème doit être un nombre supérieur ou égal à 1.");
      return;
    }
    if (!newQuestion.text.trim()) {
      setError("L'énoncé de la question ne peut pas être vide.");
      return;
    }
    if (newQuestion.options.some(opt => !opt.trim())) {
      setError("Toutes les options doivent être remplies.");
      return;
    }
    if (newQuestion.correct.length === 0) {
      setError("Au moins une bonne réponse doit être sélectionnée.");
      return;
    }

    fetch(`/api/room/${roomCode}/add-question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: newQuestion.text,
        options: newQuestion.options,
        correct_answers: newQuestion.correct,
        points: newQuestion.points,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de l'ajout");
        return res.json();
      })
      .then(() => {
        setQuestions([...questions, newQuestion]); // Ajout local aussi
        setNewQuestion({
          text: "",
          options: ["", "", "", ""],
          correct: [],
          points: 1,
        });
        setError("");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Application QCM avec Barème</h1>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setMode("enseignant")}>Mode Enseignant</button>
        <button onClick={() => setMode("eleve")}>Mode Élève</button>
        <button
          onClick={() => navigate("/")}
          style={{ marginLeft: "10px", backgroundColor: "#eee" }}
        >
          Retour à l'accueil
        </button>
      </div>

      {mode === "enseignant" && (
        <div>
          <h2>Créer une question</h2>
          <input
            type="text"
            placeholder="Énoncé de la question"
            value={newQuestion.text}
            onChange={(e) =>
              setNewQuestion({ ...newQuestion, text: e.target.value })
            }
          />
          {newQuestion.options.map((opt, idx) => (
            <div key={idx}>
              <input
                type="text"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => {
                  const updatedOptions = [...newQuestion.options];
                  updatedOptions[idx] = e.target.value;
                  setNewQuestion({
                    ...newQuestion,
                    options: updatedOptions,
                  });
                }}
              />
              <input
                type="checkbox"
                checked={newQuestion.correct.includes(idx)}
                onChange={() => handleCorrectToggle(idx)}
              />
              <label>Bonne réponse</label>
            </div>
          ))}

          <div>
            <label>Barème (points attribués) : </label>
            <input
              type="number"
              min="1"
              value={newQuestion.points}
              onChange={(e) =>
                setNewQuestion({
                  ...newQuestion,
                  points: parseInt(e.target.value),
                })
              }
            />
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button onClick={handleAddQuestion}>Ajouter la question</button>

          <h3>Questions ajoutées :</h3>
          <ul>
            {questions.map((q, i) => (
              <li key={i}>
                {q.text} ({q.points} points)
              </li>
            ))}
          </ul>
        </div>
      )}

      {mode === "eleve" && (
        <div>
          <h2>Répondre aux questions</h2>
          {questions.length === 0 ? (
            <p>Aucune question disponible.</p>
          ) : (
            <form>
              {questions.map((q, qIndex) => (
                <div key={qIndex} style={{ marginBottom: "15px" }}>
                  <h4>
                    {q.text} ({q.points} points)
                  </h4>
                  {q.options.map((opt, optIndex) => (
                    <label key={optIndex} style={{ display: "block" }}>
                      <input
                        type="checkbox"
                        name={`question-${qIndex}`}
                        checked={
                          (studentAnswers[qIndex] || []).includes(optIndex)
                        }
                        onChange={() =>
                          handleAnswerChange(qIndex, optIndex)
                        }
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              ))}
              <button type="button" onClick={handleSubmitAnswers}>
                Soumettre les réponses
              </button>
            </form>
          )}

          {scoreResult && (
            <div style={{ marginTop: "20px", fontWeight: "bold" }}>
              Note : {scoreResult.score} / {scoreResult.total} points
            </div>
          )}
        </div>
      )}
    </div>
  );
}
