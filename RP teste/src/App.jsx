import React, { useState } from 'react';
import './App.css'; // Aqui ele puxa o CSS

// Aqui ele "importa" as páginas que você acabou de criar
import Login from './Login';
import Cardapio from './Cardapio';
import Pedidos from './Pedidos';
import Acompanhamento from './Acompanhamento';

export default function App() {
  // Começamos na tela de login
  const [screen, setScreen] = useState('login');

  return (
    <div>
      {/* O React vai olhar para a variável 'screen' e mostrar apenas a página certa */}
      {screen === 'login' && <Login setScreen={setScreen} />}
      {screen === 'cardapio' && <Cardapio setScreen={setScreen} />}
      {screen === 'pedidos' && <Pedidos setScreen={setScreen} />}
      {screen === 'acompanhamento' && <Acompanhamento setScreen={setScreen} />}
    </div>
  );
}