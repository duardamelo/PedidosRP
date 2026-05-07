import React, { useState } from 'react';
import '../../styles/Cliente.css';

const Cardapio = () => {
  // Lógica: Simulando dados que virão do Firestore
  const [itens] = useState([
    { id: 1, nome: "Prato do Dia", preco: 1.00, desc: "Arroz, feijão e frango" },
    { id: 2, nome: "Suco Natural", preco: 1.00, desc: "Acerola 300ml" },
  ]);

  const adicionarAoCarrinho = (item) => {
    console.log("Adicionado:", item.nome);
    alert(`${item.nome} foi adicionado ao seu pedido!`);
  };

  return (
    <div className="cliente-body">
      <header className="cliente-header">
        <div className="logo">RP DIGITAL</div>
        <nav>
          <a href="/cardapio">Cardápio</a>
          <a href="/acompanhamento">Acompanhamento</a>
        </nav>
      </header>
      
      <div className="cliente-container">
        <h1>Cardápio do Dia</h1>
        <div className="cardapio-grid">
          {itens.map(item => (
            <div key={item.id} className="card-item">
              <div>
                <h3>{item.nome}</h3>
                <p>{item.desc}</p>
                <strong>R$ {item.preco.toFixed(2)}</strong>
              </div>
              <button className="btn-verde" onClick={() => adicionarAoCarrinho(item)}>
                Adicionar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cardapio;