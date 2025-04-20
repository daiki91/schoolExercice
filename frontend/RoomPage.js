import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Snackbar } from "@mui/material";

const RoomPage = () => {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { code } = useParams();
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Token absent, vous devez vous connecter.");
      setSnackbarOpen(true);
      return;
    }

    const fetchRoom = async (code) => {
      try {
        const res = await fetch(`/api/room/${code}/`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Erreur lors de la récupération de la salle.");
        }

        const data = await res.json();
        setRoomData(data);
      } catch (err) {
        setError(err.message);
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchRoom(code);
    }
  }, [code, token]);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  if (loading) {
    return <div>Chargement de la salle...</div>;
  }

  return (
    <div>
      <h2>Salle: {roomData ? roomData.name : "Salle inconnue"}</h2>
      <p>Code de la salle: {roomData ? roomData.code : "Inconnu"}</p>
      <p>Invités peuvent mettre en pause: {roomData ? (roomData.guest_can_pause ? "Oui" : "Non") : "Inconnu"}</p>
      <p>Votes nécessaires pour passer: {roomData ? roomData.votes_to_skip : "Inconnu"}</p>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={error}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </div>
  );
};

export default RoomPage;
