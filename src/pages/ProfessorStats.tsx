
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileCheck, Clock, Award } from "lucide-react";
import StatCard from "@/components/StatCard";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  { month: "Jan", moyenne: 14.2 },
  { month: "Fév", moyenne: 13.8 },
  { month: "Mar", moyenne: 15.1 },
  { month: "Avr", moyenne: 14.5 },
];

const ProfessorStats = () => {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="mb-6 text-2xl font-bold">Statistiques</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Étudiants"
            value="124"
            icon={<Users className="h-4 w-4" />}
            description="Inscrits ce semestre"
          />
          <StatCard
            title="Examens Corrigés"
            value="47"
            icon={<FileCheck className="h-4 w-4" />}
            description="Sur 50 soumissions"
          />
          <StatCard
            title="Temps Moyen"
            value="2h15"
            icon={<Clock className="h-4 w-4" />}
            description="Par examen"
          />
          <StatCard
            title="Moyenne Générale"
            value="14.5/20"
            icon={<Award className="h-4 w-4" />}
            description="Ce semestre"
          />
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Moyennes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 20]} />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="moyenne"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessorStats;
