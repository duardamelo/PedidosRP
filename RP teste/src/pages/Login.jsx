import React from 'react';

export default function Login({ setScreen }) {
  return (
    <div className="login-page">
      <div className="container-login">
        <div className="logo-login">RP DIGITAL</div>
        <div className="subtitle">Restaurante Popular</div>
        <form onSubmit={(e) => { e.preventDefault(); setScreen('cardapio'); }}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Digite seu email" required />
          </div>
          <div className="form-group">
            <label>Senha</label>
            <input type="password" placeholder="Digite sua senha" required />
          </div>
          <button type="submit" className="btn">Entrar</button>
          <div className="links">
            Não tem conta? <a href="#">Cadastrar</a><br /><br />
            <a href="#">Esqueceu a senha?</a>
          </div>
        </form>
        <div className="footer">Universidade do Estado do Rio Grande do Norte</div>
      </div>
    </div>
  );
}