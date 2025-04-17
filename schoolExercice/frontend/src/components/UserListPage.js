import React, { useState, useEffect } from "react";
import { Grid, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

const UserListPage = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users/");
        const data = await res.json();
        setStudents(data.students);
        setTeachers(data.teachers);
      } catch (error) {
        console.error("Erreur lors du chargement des utilisateurs :", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Paper style={{ padding: "20px", margin: "20px" }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Liste des étudiants et enseignants
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Étudiants
          </Typography>
          <List>
            {students.map((student) => (
              <ListItem key={student.id} divider>
                <ListItemText primary={student.username} />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom>
            Enseignants
          </Typography>
          <List>
            {teachers.map((teacher) => (
              <ListItem key={teacher.id} divider>
                <ListItemText primary={teacher.username} />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default UserListPage;
