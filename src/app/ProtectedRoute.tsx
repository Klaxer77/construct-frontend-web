import { Navigate, Outlet } from "react-router";
import { useUserStore } from "../shared/stores/userStore";
import { useCurrentUser } from "../shared/hooks/useAuth";
import { useEffect } from "react";

interface ProtectedRouteProps {
  roles?: string[];
}

export const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { setUser } = useUserStore();
  const { data, isLoading } = useCurrentUser();
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) return null;

  if (!data) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(data.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};
