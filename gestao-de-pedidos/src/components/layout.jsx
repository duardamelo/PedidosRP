import React from "react";
import Sidebar from "./sidebar"; 
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Layout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Erro ao sair:", error);
    }
  };

  return (
    <div className="admin-container">
      <Sidebar />

      <div className="main-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Barra superior simplificada */}
        <header className="topbar" style={{ 
          padding: '15px 25px', 
          display: 'flex', 
          justifyContent: 'flex-end',
          background: 'var(--branco)',
          borderBottom: '1px solid var(--borda)'
        }}>
          <button onClick={handleLogout} className="btn-sair-link" style={{ 
            background: 'none', border: 'none', color: 'var(--vermelho-erro, #dc3545)', cursor: 'pointer', fontWeight: 'bold' 
          }}>
            Sair do Sistema
          </button>
        </header>

        <main className="content-area">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;