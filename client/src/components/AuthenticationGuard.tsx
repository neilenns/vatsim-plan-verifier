import { Navigate } from "react-router-dom";

interface AuthenticationGuardProps {
  role: "admin" | "user";
  component: React.ReactNode;
}

export const AuthenticationGuard = ({ role, component }: AuthenticationGuardProps) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  if (!localStorage.getItem("role")) {
    return <Navigate to="/login" />;
  }

  if (role === "admin" && localStorage.getItem("role") !== "admin") {
    return <Navigate to="/login" />;
  }

  // At this point the role must be user or they are an admin so it's fine to return the component
  return <>{component}</>;
};
