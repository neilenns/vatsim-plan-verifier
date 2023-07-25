import { Navigate } from "react-router-dom";

interface AuthenticationGuardProps {
  component: React.ReactNode;
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({ component }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return <>{component}</>;
};
