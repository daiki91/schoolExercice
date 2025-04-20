import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RoomJoinPage() {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth(); // ✅ On récupère bien user

  // ✅ Utilise useEffect pour faire une redirection au bon moment
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (user?.role !== "élève") {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  const roomButtonPressed = () => {
    if (!roomCode.trim()) {
      setError("Le code de la salle ne peut pas être vide.");
      return;
    }
    setError("");

    fetch("/api/join-room/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: roomCode }),
    })
      .then((res) => {
        if (res.ok) {
          navigate(`/room/${roomCode}/questions`);
        } else {
          setError("Code invalide. Réessayez.");
        }
      })
      .catch(() => setError("Erreur réseau. Réessayez."));
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Typography variant="h4">Rejoindre une salle</Typography>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth error={!!error}>
          <TextField
            label="Code de la salle"
            placeholder="Ex: ABC123"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={roomButtonPressed}
        >
          Rejoindre
        </Button>
      </Grid>

      <Grid item xs={12}>
        <Button fullWidth variant="outlined" component={Link} to="/">
          Retour à l'accueil
        </Button>
      </Grid>
    </Grid>
  );
}
