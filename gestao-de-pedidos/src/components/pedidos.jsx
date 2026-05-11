import React, { useState, useEffect } from 'react';
import { pedidosService } from "../services/pedidosService";

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const handleAtualizarStatus = async (id, novoStatus) => {
  try {
    await pedidosService.atualizarStatusPedido(id, novoStatus);
    alert("Status atualizado com sucesso!");
    // Aqui você pode chamar a função que recarrega a lista de pedidos
  } catch (error) {
    console.error("Erro ao atualizar:", error);
    alert("Erro ao atualizar o pedido.");
  }
};

  useEffect(() => {
    // Busca os pedidos do Firebase ao carregar a página
    const carregarPedidos = async () => {
      try {
        const dados = await pedidosService.listarPedidos();
        setPedidos(dados);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      }
    };
    carregarPedidos();
  }, []);

  return (
    <div className="pedidos-container">
      <header className="content-header">
        <h2>Gerenciamento de Pedidos</h2>
      </header>

      <div className="filtros-bar">
        <label>Filtrar Status:</label>
        <select 
          value={filtroStatus} 
          onChange={(e) => setFiltroStatus(e.target.value)}
          className="select-filtro"
        >
          <option value="Todos">Todos</option>
          <option value="Recebido">Recebido</option>
          <option value="Em Preparo">Em Preparo</option>
          <option value="Finalizado">Finalizado</option>
        </select>
      </div>

      <div className="data-table-container">
        <table>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Usuário</th>
              <th>Status</th>
              <th>Horário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.length > 0 ? (
              pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>#{pedido.numero || pedido.id.substring(0, 4)}</td>
                  <td>{pedido.usuarioNome || "Cliente"}</td>
                  <td>
                    <span className={`status-badge status-${pedido.status?.toLowerCase().replace(" ", "-")}`}>
                      {pedido.status}
                    </span>
                  </td>
                  <td>{pedido.horario}</td>
                  <td>
                   <button 
                        className="btn-acao-tabela"
                        onClick={async () => await pedidosService.atualizarStatusPedido(pedido.id, 'Entregue')}
                        >
                        Atualizar Status
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  Nenhum pedido encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pedidos;