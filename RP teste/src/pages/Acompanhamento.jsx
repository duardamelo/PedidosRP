import React from 'react';
import Header from './Header';

export default function Acompanhamento({ setScreen }) {
  return (
    <>
      <Header setScreen={setScreen} />
      <div className="container container-acompanhamento">
        <div className="titulo">Pedido #1023</div>
        <div className="info-acompanhamento">Horário de retirada: 12:00</div>
        
        <div className="status-container">
          <div className="status">
            <div className="circulo ativo">1</div>
            <p>Recebido</p>
          </div>
          <div className="linha"></div>
          <div className="status">
            <div className="circulo ativo">2</div>
            <p>Em preparo</p>
          </div>
          <div className="linha"></div>
          <div className="status">
            <div className="circulo">3</div>
            <p>Pronto</p>
          </div>
        </div>
        
        <div className="mensagem">Seu pedido está sendo preparado</div>
        <button className="botao" onClick={() => setScreen('cardapio')}>Voltar ao Cardápio</button>
      </div>
    </>
  );
}