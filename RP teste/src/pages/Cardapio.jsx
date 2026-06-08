import React from 'react';
import Header from './Header';

export default function Cardapio({ setScreen }) {
  return (
    <>
      <Header setScreen={setScreen} />
      <div className="container container-cardapio">
        <div className="titulo">Cardápio do Dia - 13/03/2026</div>
        <div className="cardapio">
          {[
            { nome: "Prato do Dia", desc: "Arroz, feijão, frango grelhado e salada", preco: "R$ 1,00" },
            { nome: "Prato Vegetariano", desc: "Arroz, feijão, legumes grelhados", preco: "R$ 1,00" },
            { nome: "Sobremesa", desc: "Fruta da estação", preco: "R$ 0,50" },
            { nome: "Suco Natural", desc: "Suco de acerola natural", preco: "R$ 1,00" },
          ].map((item, index) => (
            <div className="card" key={index}>
              <div className="info">
                <div className="nome">{item.nome}</div>
                <div className="descricao">{item.desc}</div>
                <div className="preco">{item.preco}</div>
              </div>
              <button className="botao" onClick={() => setScreen('pedidos')}>Adicionar</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}