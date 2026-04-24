import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Pedidos.css';

export default function Pedidos() {
  const navigate = useNavigate();
  const [horario, setHorario] = useState('');
  const [pagamento, setPagamento] = useState('');

  const handleConfirmar = () => {
    if (!horario || !pagamento) {
      alert("Por favor, selecione o horário e a forma de pagamento.");
      return;
    }
    // No futuro, aqui enviaremos os dados para o Firestore
    alert(`Pedido confirmado para às ${horario}!`);
    navigate('/cardapio'); 
  };

  return (
    <div className="pedidos-body">
      <header className="rp-header">
        <div className="logo">RP DIGITAL</div>
        <nav>
          <Link to="/cardapio">Cardápio</Link>
          <Link to="/pedidos">Meus Pedidos</Link>
          <Link to="/">Sair</Link>
        </nav>
      </header>

      <div className="container-pedido">
        <div className="titulo-pedido">Seu Pedido</div>

        <table className="tabela-pedidos">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantidade</th>
              <th>Preço</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Prato do Dia</td>
              <td>1</td>
              <td>R$ 1,00</td>
            </tr>
            <tr>
              <td>Suco Natural</td>
              <td>1</td>
              <td>R$ 1,00</td>
            </tr>
          </tbody>
        </table>

        <div className="resumo-total">Total: R$ 2,00</div>

        <div className="secao-pedido">
          <h3>Horário de retirada</h3>
          <label className="opcao-radio"><input type="radio" name="hora" value="11:30" onChange={(e) => setHorario(e.target.value)} /> 11:30</label>
          <label className="opcao-radio"><input type="radio" name="hora" value="12:00" onChange={(e) => setHorario(e.target.value)} /> 12:00</label>
          <label className="opcao-radio"><input type="radio" name="hora" value="12:30" onChange={(e) => setHorario(e.target.value)} /> 12:30</label>
        </div>

        <div className="secao-pedido">
          <h3>Forma de pagamento</h3>
          <label className="opcao-radio"><input type="radio" name="pag" value="Pix" onChange={(e) => setPagamento(e.target.value)} /> Pix</label>
          <label className="opcao-radio"><input type="radio" name="pag" value="Dinheiro" onChange={(e) => setPagamento(e.target.value)} /> Dinheiro em espécie</label>
        </div>

        <button className="btn-confirmar" onClick={handleConfirmar}>Confirmar Pedido</button>
      </div>
    </div>
  );
}