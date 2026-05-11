import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Adicionado useNavigate
import { useAuth } from "../contexts/AuthContext"; // Adicionado useAuth

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate(); // Inicializa o navigate
  const { logout } = useAuth();   // Puxa o logout do contexto

  const isActive = (path) => location.pathname === path ? "nav-item active" : "nav-item";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); 
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <aside className="sidebar">
      <h2>RP DIGITAL</h2>
      <nav>
        <ul className="nav-links">
          <li><Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link></li>
          <li><Link to="/pedidos" className={isActive("/pedidos")}>Pedidos</Link></li>
          <li><Link to="/estoque" className={isActive("/estoque")}>Cardápio</Link></li>
          <li><Link to="/feedback" className={isActive("/feedback")}>Relatórios</Link></li>
          
          <li className="nav-item">
            <button onClick={handleLogout} className="btn-sair-sidebar">
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}