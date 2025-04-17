<<<<<<< HEAD
import React, { useState } from "react";
import { TextField, Button, Grid, Typography, FormHelperText, FormControl } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RoomJoinPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const roomButtonPressed = () => {
    if (!roomCode.trim()) {
      setError("Le code de la salle ne peut pas être vide.");
      return;
    }
    setError("");

    fetch("/api/join-room/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: roomCode })
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
          <TextField label="Code de la salle" placeholder="Ex: ABC123" value={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Button fullWidth variant="contained" color="primary" onClick={roomButtonPressed}>
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
};

export default RoomJoinPage;
=======
import React,{Component} from "react";

export default class RoomJoinPage extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return <p>This is the room join page</p>
    }
}
>>>>>>> ccf2c0db (Premier commit)
