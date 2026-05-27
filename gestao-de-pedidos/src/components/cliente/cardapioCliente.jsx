import React, { useState, useEffect } from 'react'; // Adicionado useEffect
import { db } from "../../services/firebase"; // Importe o db (verifique o caminho)
import { collection, getDocs } from "firebase/firestore";
import '../styles/Cliente.css';

const Cardapio = () => {
  // Agora começamos com uma lista vazia que virá do banco
  const [itens, setItens] = useState([]);

  // Lógica para buscar os dados do Firestore
  useEffect(() => {
    async function buscarCardapio() {
      try {
        const querySnapshot = await getDocs(collection(db, "cardapio"));
        const lista = [];
        querySnapshot.forEach(doc => {
          lista.push({ id: doc.id, ...doc.data() });
        });
        setItens(lista);
      } catch (error) {
        console.error("Erro ao buscar cardápio:", error);
      }
    }
    buscarCardapio();
  }, []);

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
                {/* Note que aqui usamos item.nome e item.descricao para bater com o banco */}
                <h3>{item.nome}</h3>
                <p>{item.descricao}</p> 
                <strong>R$ {parseFloat(item.preco).toFixed(2)}</strong>
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