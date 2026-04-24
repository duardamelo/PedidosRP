import React, { useState } from 'react';
import { auth } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Cadastro.css'; 
import { Link } from 'react-router-dom';

export default function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = async (e) => {
    e.preventDefault();
    
    if (senha !== confirmarSenha) {
      alert("As senhas não conferem!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      alert("Conta criada com sucesso! Agora você pode fazer login.");
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <div className="container">
      <div className="logo">RP DIGITAL</div>
      <div className="subtitle">Restaurante Popular</div>

      <form onSubmit={handleCadastro}>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Senha (mínimo 6 dígitos)</label>
          <input 
            type="password" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required 
          />
        </div>

        <div className="form-group">
          <label>Confirmar Senha</label>
          <input 
            type="password" 
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required 
          />
        </div>

        <button type="submit" className="btn">Cadastrar</button>
      </form>
      
      <p>Já tem uma conta? <Link to="/">Voltar para o Login</Link></p>
    </div>
  );
}