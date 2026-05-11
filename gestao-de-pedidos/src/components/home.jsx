import React, { useState, useEffect } from 'react';
import { pedidosService } from "../services/pedidosService";
import { feedbackService } from "../services/feedbackService";
import { estoqueService } from "../services/estoqueService";
import "../App.css";

function Home() {
  const [estatisticas, setEstatisticas] = useState({
    totalPedidos: 0,
    pedidosHoje: 0,
    totalVendas: 0,
    feedbacksPendentes: 0,
    produtosBaixoEstoque: 0,
    vendasHoje: 0
  });

  const [loading, setLoading] = useState(true);
  const [dadosRecentes, setDadosRecentes] = useState({
    pedidos: [],
    feedbacks: [],
    alertas: []
  });

  useEffect(() => {
    carregarEstatisticas();

    const unsubscribePedidos = pedidosService.observarPedidos((pedidos) => {
      atualizarEstatisticasPedidos(pedidos);
    });

    const unsubscribeFeedbacks = feedbackService.observarFeedbacks((feedbacks) => {
      atualizarEstatisticasFeedbacks(feedbacks);
    });

    const unsubscribeEstoque = estoqueService.observarEstoque((produtos) => {
      atualizarEstatisticasEstoque(produtos);
    });

    return () => {
      unsubscribePedidos();
      unsubscribeFeedbacks();
      unsubscribeEstoque();
    };
  }, []);

  // --- MANTENDO TODA A SUA LÓGICA DE CÁLCULO ---
  const carregarEstatisticas = async () => {
    try {
      setLoading(true);
      const [pedidos, feedbacks, produtos] = await Promise.all([
        pedidosService.listarPedidos(),
        feedbackService.listarFeedbacks(),
        estoqueService.listarProdutos(),
      ]);

      const hoje = new Date().toISOString().split('T')[0];
      const pedidosHoje = pedidos.filter(p => p.data?.includes(hoje)).length;
      const feedbacksPendentes = feedbacks.filter(f => f.status === 'pendente').length;
      const produtosBaixoEstoque = produtos.filter(p => p.quantidade <= p.estoqueMinimo).length;

      setEstatisticas({
        totalPedidos: pedidos.length,
        pedidosHoje,
        totalVendas: pedidos.length * 29.90, // Exemplo de cálculo
        feedbacksPendentes,
        produtosBaixoEstoque,
        vendasHoje: pedidosHoje * 29.90
      });

      setDadosRecentes({
        pedidos: pedidos.slice(0, 3),
        feedbacks: feedbacks.slice(0, 3),
        alertas: [
          ...produtos.filter(p => p.quantidade <= p.estoqueMinimo).map(p => ({ tipo: 'estoque', mensagem: `${p.nome} com estoque baixo` })),
          ...feedbacks.filter(f => f.status === 'pendente').slice(0, 2).map(f => ({ tipo: 'feedback', mensagem: `Feedback pendente: ${f.cliente}` }))
        ]
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const atualizarEstatisticasPedidos = (pedidos) => {
    const hoje = new Date().toISOString().split('T')[0];
    const pHoje = pedidos.filter(p => p.data?.includes(hoje)).length;
    setEstatisticas(prev => ({ ...prev, totalPedidos: pedidos.length, pedidosHoje: pHoje, vendasHoje: pHoje * 29.90 }));
    setDadosRecentes(prev => ({ ...prev, pedidos: pedidos.slice(0, 3) }));
  };

  const atualizarEstatisticasFeedbacks = (feedbacks) => {
    const pendentes = feedbacks.filter(f => f.status === 'pendente').length;
    setEstatisticas(prev => ({ ...prev, feedbacksPendentes: pendentes }));
  };

  const atualizarEstatisticasEstoque = (produtos) => {
    const baixo = produtos.filter(p => p.quantidade <= p.estoqueMinimo).length;
    setEstatisticas(prev => ({ ...prev, produtosBaixoEstoque: baixo }));
  };

  const formatarMoeda = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

  if (loading) return <div className="loading-container">Carregando Sistema RP Digital...</div>;

  return (
    <div className="dashboard-container">
      <header className="content-header">
        <div>
          <h2 className="titulo-principal">Painel de Controle</h2>
          <p className="subtitulo">Gerenciamento em tempo real - {new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      </header>

      {/* Grid de Estatísticas Principais */}
      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Pedidos Hoje</p>
          <h3 className="stat-value">{estatisticas.pedidosHoje}</h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Receita do Dia</p>
          <h3 className="stat-value">{formatarMoeda(estatisticas.vendasHoje)}</h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Feedbacks Pendentes</p>
          <h3 className="stat-value" style={{ color: estatisticas.feedbacksPendentes > 0 ? '#e63946' : 'inherit' }}>
            {estatisticas.feedbacksPendentes}
          </h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Ticket Médio</p>
          <h3 className="stat-value">
            {formatarMoeda(estatisticas.pedidosHoje > 0 ? estatisticas.vendasHoje / estatisticas.pedidosHoje : 0)}
          </h3>
        </div>
      </div>

      <div className="dashboard-main-content" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginTop: '20px' }}>
        
        {/* Coluna da Esquerda: Alertas e Pedidos Recentes */}
        <section>
          {dadosRecentes.alertas.length > 0 && (
            <div className="data-table-container" style={{ marginBottom: '20px', borderLeft: '5px solid #ffb703' }}>
              <h4 style={{ marginBottom: '10px' }}>Alertas de Atenção</h4>
              {dadosRecentes.alertas.map((alerta, i) => (
                <div key={i} className="alerta-item" style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                  <small style={{ color: '#666', fontWeight: 'bold' }}>[{alerta.tipo.toUpperCase()}]</small> {alerta.mensagem}
                </div>
              ))}
            </div>
          )}

          <div className="data-table-container">
            <h4>Últimos Pedidos Sincronizados</h4>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Data</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {dadosRecentes.pedidos.map(p => (
                  <tr key={p.id}>
                    <td>{p.cliente}</td>
                    <td>{new Date(p.data).toLocaleTimeString('pt-BR')}</td>
                    <td>{formatarMoeda(29.90)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Coluna da Direita: Ações e Notificações */}
        <aside>
          <div className="data-table-container" style={{ backgroundColor: '#f8f9fa' }}>
            <h4>Ações Rápidas</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
              <button className="btn-entrar" style={{ padding: '10px' }}>Novo Pedido</button>
              <button className="btn-entrar" style={{ padding: '10px', backgroundColor: '#6c757d' }}>Gerar Relatório</button>
            </div>
          </div>

          <div className="data-table-container" style={{ marginTop: '20px' }}>
            <h4>Status do Estoque</h4>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              {estatisticas.produtosBaixoEstoque} itens precisam de reposição imediata.
            </p>
          </div>
        </aside>

      </div>
    </div>
  );
}

export default Home;