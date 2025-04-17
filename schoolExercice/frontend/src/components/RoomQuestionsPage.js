import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Typography, Button, Card, CardContent, CircularProgress } from "@mui/material";

const RoomQuestionsPage = () => {
  const { roomCode } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/room/${roomCode}/questions/`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [roomCode]);

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} textAlign="center">
        <Typography variant="h4">Salle : {roomCode}</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate(`/room/${roomCode}/question/add`)}>
          Ajouter une question
        </Button>
      </Grid>

      {loading ? (
        <Grid item xs={12} textAlign="center">
          <CircularProgress />
        </Grid>
      ) : questions.length > 0 ? (
        questions.map((q) => (
          <Grid item xs={12} md={8} key={q.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{q.text}</Typography>
                <ul>
                  {q.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
                <Typography variant="body2" color="textSecondary">
                  Points : {q.points}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12} textAlign="center">
          <Typography>Aucune question pour l'instant.</Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default RoomQuestionsPage;
