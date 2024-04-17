import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage, RegisterPage } from "../pages";
import { useSelector } from "react-redux";
import { CheckingAuth } from "../../ui/";

export const AuthRoutes = () => {
  const { status } = useSelector((state) => state.auth);

  if (status === "checking") {
    return <CheckingAuth />
  }

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
