
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Données fictives des étudiants
const mockStudents = [
  {
    id: "student1",
    name: "Sophie Dubois",
    email: "sophie.dubois@example.com",
    profilePic: "https://i.pravatar.cc/150?u=student1",
    grade: "L3",
    submissionCount: 8,
    averageGrade: 15.5,
  },
  {
    id: "student2",
    name: "Thomas Bernard",
    email: "thomas.bernard@example.com",
    profilePic: "https://i.pravatar.cc/150?u=student2",
    grade: "L2",
    submissionCount: 6,
    averageGrade: 14.2,
  },
  {
    id: "student3",
    name: "Julie Martin",
    email: "julie.martin@example.com",
    profilePic: "https://i.pravatar.cc/150?u=student3",
    grade: "L3",
    submissionCount: 7,
    averageGrade: 16.8,
  },
  {
    id: "student4",
    name: "Lucas Petit",
    email: "lucas.petit@example.com",
    profilePic: "https://i.pravatar.cc/150?u=student4",
    grade: "M1",
    submissionCount: 9,
    averageGrade: 13.7,
  },
  {
    id: "student5",
    name: "Emma Durand",
    email: "emma.durand@example.com",
    profilePic: "https://i.pravatar.cc/150?u=student5",
    grade: "L2",
    submissionCount: 5,
    averageGrade: 17.2,
  },
];

const Students: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrer les étudiants en fonction du terme de recherche
  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="mb-6 text-2xl font-bold">Gestion des Étudiants</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Rechercher des étudiants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou email..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Étudiant</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Soumissions</TableHead>
                <TableHead>Moyenne</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.profilePic} alt={student.name} />
                        <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.submissionCount}</TableCell>
                  <TableCell className="font-medium">{student.averageGrade}/20</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Contacter
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Students;
