import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Cliente.css";

function LoginCliente() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    console.log("Login efetuado com:", email);
    // Aqui você integrará com a função login(email, senha) do seu AuthContext
    navigate("/cardapio"); 
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">RP DIGITAL</div>
        <div className="auth-subtitle">Restaurante Popular</div>

        <form onSubmit={handleLogin}>
          <div className="auth-form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Digite seu email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-form-group">
            <label>Senha</label>
            <input 
              type="password" 
              placeholder="Digite sua senha" 
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-auth">Entrar</button>

          <div className="auth-links">
            Não tem conta? <span onClick={() => navigate("/cadastro")}>Cadastrar</span>
            <br /><br />
            <span onClick={() => alert("Função de recuperação em desenvolvimento.")}>Esqueceu a senha?</span>
          </div>
        </form>

        <div className="auth-footer">
          Universidade do Estado do Rio Grande do Norte
        </div>
      </div>
    </div>
  );
}

export default LoginCliente;