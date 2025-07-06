// src/components/PublicRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const authUser = useSelector((state) => state.user.authUser);

  if (authUser?.id) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
