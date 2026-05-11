import React from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import Login from "./components/login";
import Cadastro from "./components/cadastro";
import Home from "./components/home";
import Estoque from "./components/estoque";
import Feedback from "./components/feedback";
import Pedidos from "./components/pedidos";
import Layout from "./components/layout";

import "./App.css";

function App() {
  const { usuario, carregando, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (carregando) return <p>Carregando...</p>;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/"); 
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  const mostrarMenu = usuario && location.pathname !== "/";

  const Header = () => (
    <header className="header-sistema">
      <button onClick={() => navigate("/dashboard")}>🏠</button>
      <h1>Gestão RU</h1>
      <button onClick={handleLogout} className="btn-sair">
        Sair
      </button>
    </header>
  );

  const Footer = () => (
    <footer className="footer-centralizado">
      <nav>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/estoque")}>Estoque</button>
        <button onClick={() => navigate("/pedidos")}>Pedidos</button>
        <button onClick={() => navigate("/feedback")}>Feedback</button>
      </nav>
    </footer>
  );
  return (
    <div className="App">
      <Routes>
        {/* Rota de Login sem Sidebar */}
        <Route path="/" element={!usuario ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas Protegidas envolvidas pelo Layout */}
        <Route path="/dashboard" element={usuario ? <Layout><Home /></Layout> : <Navigate to="/" />} />
        <Route path="/estoque" element={usuario ? <Layout><Estoque /></Layout> : <Navigate to="/" />} />
        <Route path="/pedidos" element={usuario ? <Layout><Pedidos /></Layout> : <Navigate to="/" />} />
        <Route path="/feedback" element={usuario ? <Layout><Feedback /></Layout> : <Navigate to="/" />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;