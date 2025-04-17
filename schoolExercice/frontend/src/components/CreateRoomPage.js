<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Grid, Typography, TextField, FormHelperText, FormControl, Radio, RadioGroup, FormControlLabel, CircularProgress, Snackbar } from "@mui/material";
import { useAuth } from "./AuthContext";

const CreateRoomPage = () => {
  const [guestCanPause, setGuestCanPause] = useState(true);
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [roomCode, setRoomCode] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirection si non authentifié
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleRoomButtonPressed = () => {
    if (votesToSkip <= 0) {
      setError("Le nombre de votes doit être ≥ 1.");
      return;
    }
    setError("");
    setLoading(true);

    fetch("/api/create-room/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guest_can_pause: guestCanPause, votes_to_skip: votesToSkip })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code) {
          setRoomCode(data.code);
          navigate(`/room/${data.code}/questions`);
        } else {
          setSnackbarMessage("Erreur lors de la création de la salle.");
          setSnackbarOpen(true);
        }
      })
      .catch(() => {
        setSnackbarMessage("Erreur réseau. Réessayez.");
        setSnackbarOpen(true);
      })
      .finally(() => setLoading(false));
  };

  const handleSnackbarClose = () => setSnackbarOpen(false);

  if (roomCode) {
    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} textAlign="center">
          <Typography variant="h4">Salle créée !</Typography>
          <Typography variant="h6">Code : {roomCode}</Typography>
          <Button variant="contained" color="primary" onClick={() => navigate(`/room/${roomCode}/questions`)}>
            Ajouter des questions
          </Button>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} textAlign="center">
        <Typography variant="h4">Créer une salle d’évaluation</Typography>
      </Grid>

      <Grid item xs={12} textAlign="center">
        <FormControl error={!!error}>
          <FormHelperText>Les invités peuvent-ils mettre en pause ?</FormHelperText>
          <RadioGroup row value={guestCanPause.toString()} onChange={(e) => setGuestCanPause(e.target.value === "true")}>
            <FormControlLabel value="true" control={<Radio />} label="Oui" />
            <FormControlLabel value="false" control={<Radio />} label="Non" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth error={!!error}>
          <TextField
            label="Votes nécessaires"
            type="number"
            inputProps={{ min: 1 }}
            value={votesToSkip}
            onChange={(e) => setVotesToSkip(Number(e.target.value))}
          />
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Button fullWidth variant="contained" color="primary" onClick={handleRoomButtonPressed} disabled={loading}>
          {loading ? <CircularProgress size={24} color="inherit" /> : "Créer la salle"}
        </Button>
      </Grid>

      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose} message={snackbarMessage} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} />
    </Grid>
  );
};

export default CreateRoomPage;
=======
import React,{Component} from "react";

export default class CreateRoomPage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <p>This is the create room page</p>
    }
}
>>>>>>> ccf2c0db (Premier commit)
