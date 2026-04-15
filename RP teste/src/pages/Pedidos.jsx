import React from 'react';
import Header from './Header';

export default function Pedidos({ setScreen }) {
  return (
    <>
      <Header setScreen={setScreen} />
      <div className="container container-pedidos">
        <div className="titulo">Seu Pedido</div>
        <table>
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
        
        <div className="total">Total: R$ 2,00</div>
        
        <div className="horario">
          <h3>Horário de retirada</h3>
          <label><input type="radio" name="hora" /> 11:30</label> 
          <label><input type="radio" name="hora" /> 12:00</label> 
          <label><input type="radio" name="hora" /> 12:30</label>
        </div>
        
        <div className="pagamento">
          <h3>Forma de pagamento</h3>
          <label><input type="radio" name="pagamento" /> Pix</label>
          <label><input type="radio" name="pagamento" /> Dinheiro em espécie</label>
        </div>
        
        <button className="botao botao-block" onClick={() => setScreen('acompanhamento')}>
          Confirmar Pedido
        </button>
      </div>
    </>
  );
}