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
import CardapioDigital from './components/cliente/cardapiododia';

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
        {/* Rota Inicial e Pública */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas de Cliente (Só acessa se for cliente) */}
        <Route path="/cardapio" element={
          isCliente ? <CardapioDigital /> : <Navigate to="/login" />
        } />
        <Route path="/acompanhamento" element={
          isCliente ? <Acompanhamento /> : <Navigate to="/login" />
        } />

        {/* Rotas de Funcionário / Admin (Envolvidas pelo Layout) */}
        <Route path="/dashboard" element={isFuncionario ? <Layout><Home /></Layout> : <Navigate to="/login" />} />
        <Route path="/estoque" element={isFuncionario ? <Layout><Estoque /></Layout> : <Navigate to="/login" />} />
        <Route path="/pedidos" element={isFuncionario ? <Layout><Pedidos /></Layout> : <Navigate to="/login" />} />
        <Route path="/feedback" element={isFuncionario ? <Layout><Feedback /></Layout> : <Navigate to="/login" />} />

        {/* Rota de escape para qualquer endereço errado */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;