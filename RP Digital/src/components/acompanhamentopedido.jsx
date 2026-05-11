import React, { useState } from 'react';
import '../../styles/Cliente.css';

const Acompanhamento = () => {
  // Lógica: O status mudará conforme o Admin atualizar no dashboard
  const [status] = useState('preparo'); // 'recebido', 'preparo', 'pronto'

  return (
    <div className="cliente-body">
      <div className="cliente-container" style={{background: 'white', borderRadius: '10px', textAlign: 'center'}}>
        <h2>Pedido #1023</h2>
        <p>Previsão de retirada: 12:30</p>

        <div className="status-container">
          <div className="status">
            <div className="circulo ativo">✓</div>
            <p>Recebido</p>
          </div>
          <div className={`linha-progresso ${status !== 'recebido' ? 'ativa' : ''}`}></div>
          
          <div className="status">
            <div className={`circulo ${status === 'preparo' || status === 'pronto' ? 'ativo' : ''}`}>
              {status === 'pronto' ? '✓' : '2'}
            </div>
            <p>Em preparo</p>
          </div>
          <div className={`linha-progresso ${status === 'pronto' ? 'ativa' : ''}`}></div>

          <div className="status">
            <div className={`circulo ${status === 'pronto' ? 'ativo' : ''}`}>3</div>
            <p>Pronto</p>
          </div>
        </div>
        
        <h3 style={{marginTop: '30px', color: '#2e7d32'}}>
          {status === 'preparo' ? "Estamos preparando sua refeição!" : "Seu pedido está pronto para retirada!"}
        </h3>
      </div>
    </div>
  );
};

export default Acompanhamento;