import React, { useState } from 'react';
import { auth } from '../../firebaseConfig'; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom'; // Adicionamos o useNavigate aqui
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  // Esse é o "gancho" que permite mudar de página
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1. Tenta fazer o login no Firebase com os dados de Apodi
      await signInWithEmailAndPassword(auth, email, senha);
      
      // 2. Se der certo, ele pula direto para o cardápio que fizemos
      navigate('/cardapio'); 
      
    } catch (error) {
      // 3. Se a senha estiver errada ou o usuário não existir, avisa aqui
      console.error("Erro detalhado:", error.code);
      alert("Erro ao entrar: Verifique seu e-mail e senha.");
    }
  };

  return (
    <div className="container">
      <div className="logo">RP DIGITAL</div>
      <div className="subtitle">Restaurante Popular - UERN</div>

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input 
            type="password" 
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="btn">Entrar</button>
      </form>

      <div className="footer-links">
        <p>Não tem conta? <Link to="/cadastro" className="link">Cadastre-se aqui</Link></p>
      </div>
	  <div className="footer">
        Universidade do Estado do Rio Grande do Norte
      </div>
    </div>
  );
}

