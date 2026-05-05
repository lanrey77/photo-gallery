import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LoginForm from "./pages/LoginForm";
import { AuthProvider } from "./auth/AuthContext";
import Navbar from "./components/Navbar";

import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
         <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<Profile />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}