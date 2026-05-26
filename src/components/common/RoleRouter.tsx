import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { StudentDashboard } from "@/components/dashboards/StudentDashboard";
import { CounselorDashboard } from "@/components/dashboards/CounselorDashboard";
import { OnCampusCounselorDashboard } from "@/components/dashboards/OnCampusCounselorDashboard";
import { listenAuth, AppUser } from "@/services/auth";
import { getRole } from "@/lib/auth";

export const RoleRouter = () => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listenAuth((u) => { setUser(u); setLoading(false); });
  }, []);

  if (loading) return null;

  const role = user?.role || getRole();
  if (!role) return <Navigate to="/login" replace />;
  switch (role) {
    case 'student':
      return <StudentDashboard />;
    case 'counselor':
      return <CounselorDashboard />;
    case 'on-campus-counselor':
      return <OnCampusCounselorDashboard />;
    default:
      return <StudentDashboard />;
  }
};


