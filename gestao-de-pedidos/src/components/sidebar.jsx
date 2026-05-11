import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "nav-item active" : "nav-item";

  return (
    <aside className="sidebar">
      <h2>RP DIGITAL</h2>
      <nav>
        <ul className="nav-links">
          <li><Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link></li>
          <li><Link to="/pedidos" className={isActive("/pedidos")}>Pedidos</Link></li>
          <li><Link to="/estoque" className={isActive("/estoque")}>Cardápio</Link></li>
          <li><Link to="/feedback" className={isActive("/feedback")}>Relatórios</Link></li>
        </ul>
      </nav>
    </aside>
  );
}