import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

import Login from "./components/login";
import Cadastro from "./components/cadastro";
import Home from "./components/home";
import Estoque from "./components/estoque";
import Feedback from "./components/feedback";
import Pedidos from "./components/pedidos";
import Layout from "./components/layout";
import Acompanhamento from './components/cliente/acompanhamentopedido';
import CardapioDigital from './components/cliente/cardapioCliente';
import CardapioCliente from "./components/cardapio"; // Ou o nome do seu arquivo de cardápio

import "./App.css";

function App() {
  // Puxamos os dados do usuário direto do seu Contexto
const { usuario, carregando } = useAuth();

  if (carregando) return <p>Carregando...</p>;


  const isFuncionario = usuario && usuario.tipo === 'funcionario';
  const isCliente = usuario && usuario.tipo === 'cliente';
  usuario ? <Layout><Home /></Layout> : <Navigate to="/login" />

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rota do Cliente - Aberta temporariamente para teste */}
        <Route path="/cardapio" element={<CardapioDigital />} /> 
        <Route path="/acompanhamento" element={<Acompanhamento />} />

        {/* Rotas de Funcionário - Abertas temporariamente para pular o login */}
        <Route path="/dashboard" element={<Layout><Home /></Layout>} />
        <Route path="/estoque" element={<Layout><Estoque /></Layout>} />
        <Route path="/pedidos" element={<Layout><Pedidos /></Layout>} />
        <Route path="/feedback" element={<Layout><Feedback /></Layout>} />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;