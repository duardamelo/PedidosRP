import React, { useState } from "react";
import "../../styles/Cliente.css";

function Pedido() {
  const [horario, setHorario] = useState("12:00");
  const [formaPagamento, setFormaPagamento] = useState("Pix");

  // Dados mocados simulando itens do carrinho do cliente
  const [itens] = useState([
    { id: 1, nome: "Prato do Dia", qtd: 1, preco: 1.00 },
    { id: 2, nome: "Suco Natural", qtd: 1, preco: 1.00 }
  ]);

  const calcularTotal = () => {
    return itens.reduce((acc, item) => acc + item.preco * item.qtd, 0).toFixed(2);
  };

  const handleConfirmarPedido = () => {
    alert(`Pedido confirmado!\nRetirada: ${horario}\nPagamento: ${formaPagamento}`);
  };

  return (
    <div className="cliente-body">
      <header className="cliente-header">
        <div className="logo">RP DIGITAL</div>
        <nav>
          <a href="/cardapio">Cardápio</a>
          <a href="/pedidos">Meus Pedidos</a>
          <a href="/perfil">Perfil</a>
          <a href="/sair">Sair</a>
        </nav>
      </header>

      <div className="cliente-container">
        <div className="checkout-container" style={{ background: "white", padding: "30px", borderRadius: "10px", boxShadow: "0 3px 15px rgba(0,0,0,0.08)" }}>
          <h2 className="titulo">Seu Pedido</h2>

          <table className="tabela-pedido">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantidade</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((item) => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.qtd}</td>
                  <td>R$ {item.preco.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="total-secao">
            Total: R$ {calcularTotal()}
          </div>

          <div className="secao-opcoes">
            <h3>Horário de retirada</h3>
            <label>
              <input 
                type="radio" 
                name="hora" 
                checked={horario === "11:30"} 
                onChange={() => setHorario("11:30")} 
              /> 11:30
            </label>
            <label>
              <input 
                type="radio" 
                name="hora" 
                checked={horario === "12:00"} 
                onChange={() => setHorario("12:00")} 
              /> 12:00
            </label>
            <label>
              <input 
                type="radio" 
                name="hora" 
                checked={horario === "12:30"} 
                onChange={() => setHorario("12:30")} 
              /> 12:30
            </label>
          </div>

          <div className="secao-opcoes pagamento-opcoes">
            <h3>Forma de pagamento</h3>
            <label>
              <input 
                type="radio" 
                name="pagamento" 
                checked={formaPagamento === "Pix"} 
                onChange={() => setFormaPagamento("Pix")} 
              /> Pix
            </label>
            <label>
              <input 
                type="radio" 
                name="pagamento" 
                checked={formaPagamento === "Dinheiro"} 
                onChange={() => setFormaPagamento("Dinheiro")} 
              /> Dinheiro em espécie
            </label>
          </div>

          <button className="btn-verde" onClick={handleConfirmarPedido} style={{ width: "100%", marginTop: "30px", padding: "14px", fontSize: "16px" }}>
            Confirmar Pedido
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pedido;