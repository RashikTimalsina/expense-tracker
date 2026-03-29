import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Component to protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
