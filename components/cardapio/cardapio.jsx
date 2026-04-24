import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';
import './Cardapio.css';

export default function Cardapio() {
  const navigate = useNavigate(); // Inicializa a navegação

  // FUNÇÃO QUE ESTAVA FALTANDO:
  // Ela recebe o nome do prato e pula para a tela de pedidos
  const adicionarItem = (nomeItem) => {
    console.log("Item selecionado:", nomeItem);
    navigate('/pedidos'); 
  };

  // Função para deslogar do sistema
  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/'); // Volta para a tela de login
    });
  };

  return (
    <div className="cardapio-body">
      {/* CABEÇALHO DO SISTEMA */}
      <header className="rp-header">
        <div className="logo">RP DIGITAL</div>
        <nav>
          <Link to="/cardapio">Cardápio</Link>
          <a href="#">Meus Pedidos</a>
          <a href="#">Perfil</a>
          <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Sair</a>
        </nav>
      </header>

      <div className="container-cardapio">
        <div className="titulo-cardapio">Cardápio do Dia - 27/03/2026</div>

        <div className="grid-cardapio">
          
          {/* Item 1 - Prato do Dia */}
          <div className="card-rp">
            <div className="info-rp">
              <div className="nome-item">Prato do Dia</div>
              <div className="desc-item">Arroz, feijão, frango grelhado e salada</div>
              <div className="preco-item">R$ 1,00</div>
            </div>
            <button className="btn-add" onClick={() => adicionarItem("Prato do Dia")}>
              Adicionar
            </button>
          </div>

          {/* Item 2 - Prato Vegetariano */}
          <div className="card-rp">
            <div className="info-rp">
              <div className="nome-item">Prato Vegetariano</div>
              <div className="desc-item">Arroz, feijão, legumes grelhados</div>
              <div className="preco-item">R$ 1,00</div>
            </div>
            <button className="btn-add" onClick={() => adicionarItem("Prato Vegetariano")}>
              Adicionar
            </button>
          </div>

          {/* Item 3 - Sobremesa */}
          <div className="card-rp">
            <div className="info-rp">
              <div className="nome-item">Sobremesa</div>
              <div className="desc-item">Fruta da estação</div>
              <div className="preco-item">R$ 0,50</div>
            </div>
            <button className="btn-add" onClick={() => adicionarItem("Sobremesa")}>
              Adicionar
            </button>
          </div>

          {/* Item 4 - Suco Natural */}
          <div className="card-rp">
            <div className="info-rp">
              <div className="nome-item">Suco Natural</div>
              <div className="desc-item">Suco de acerola natural</div>
              <div className="preco-item">R$ 1,00</div>
            </div>
            <button className="btn-add" onClick={() => adicionarItem("Suco Natural")}>
              Adicionar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}