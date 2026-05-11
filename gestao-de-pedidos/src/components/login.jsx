import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      await login(email, senha);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.code);
      // Tratamento de erros amigável
      if (error.code === "auth/invalid-credential" || error.code === "auth/user-not-found") {
        setErro("Email ou senha incorretos.");
      } else if (error.code === "auth/too-many-requests") {
        setErro("Muitas tentativas falhas. Tente novamente mais tarde.");
      } else {
        setErro("Erro ao acessar o sistema. Verifique sua conexão.");
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <h1 className="brand-title">RP DIGITAL</h1>
          <p className="brand-subtitle">Gestão Restaurante Popular</p>
        </div>

        {erro && <div className="error-message">{erro}</div>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>E-mail Corporativo</label>
            <input 
              type="email" 
              placeholder="exemplo@email.com" 
              value={email} // CONECTADO AO ESTADO
              onChange={(e) => setEmail(e.target.value)} // ATUALIZA O ESTADO
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Senha de Acesso</label>
            <input 
              type="password" 
              placeholder="Digite sua senha" 
              value={senha} // CONECTADO AO ESTADO
              onChange={(e) => setSenha(e.target.value)} // ATUALIZA O ESTADO
              required 
            />
          </div>
          
          <button type="submit" className="btn-entrar" disabled={carregando}>
            {carregando ? "Autenticando..." : "ACESSAR SISTEMA"}
          </button>
        </form>
        
        <div className="login-footer">
          <span>Novo administrador?</span>
          <button className="btn-link" onClick={() => navigate("/cadastro")}>
            Solicitar Acesso
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;