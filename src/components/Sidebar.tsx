import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { 
  BarChart, 
  BookOpen, 
  FileText, 
  Home, 
  Upload, 
  Users 
} from "lucide-react";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const professorLinks: SidebarLink[] = [
    { href: "/dashboard", label: "Tableau de bord", icon: <Home className="h-5 w-5" /> },
    { href: "/exams", label: "Examens", icon: <FileText className="h-5 w-5" /> },
    { href: "/stats", label: "Statistiques", icon: <BarChart className="h-5 w-5" /> },
    { href: "/students", label: "Étudiants", icon: <Users className="h-5 w-5" /> },
  ];

  const studentLinks: SidebarLink[] = [
    { href: "/dashboard", label: "Tableau de bord", icon: <Home className="h-5 w-5" /> },
    { href: "/exams", label: "Examens", icon: <BookOpen className="h-5 w-5" /> },
    { href: "/submissions", label: "Mes soumissions", icon: <Upload className="h-5 w-5" /> },
  ];

  const links = user?.role === "professor" ? professorLinks : studentLinks;

  return (
    <div className="hidden border-r bg-slate-50 dark:bg-gray-800 md:block">
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="flex-1 space-y-1 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                location.pathname === link.href
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted hover:text-foreground"
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
