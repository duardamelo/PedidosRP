import React from 'react';

export default function Header({ setScreen }) {
  return (
    <header>
      <div className="logo">RP DIGITAL</div>
      <nav>
        <a onClick={() => setScreen('cardapio')}>Cardápio</a>
        <a onClick={() => setScreen('pedidos')}>Meus Pedidos</a>
        <a onClick={() => setScreen('perfil')}>Perfil</a>
        <a onClick={() => setScreen('login')}>Sair</a>
      </nav>
    </header>
  );
}