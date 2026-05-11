import React, { useState, useEffect } from 'react';
import { pedidosService } from "../services/pedidosService";
import { feedbackService } from "../services/feedbackService";
import { estoqueService } from "../services/estoqueService";

function Dashboard() {
  const [estatisticas, setEstatisticas] = useState({
    pedidosHoje: 0,
    vendasHoje: 0,
    feedbacksPendentes: 0,
    produtosBaixoEstoque: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mantendo sua lógica de carregar estatísticas iniciais
    carregarDados();

    // Mantendo seus observers em tempo real
    const unsubPedidos = pedidosService.observarPedidos(pedidos => {
      const hoje = new Date().toISOString().split('T')[0];
      const countHoje = pedidos.filter(p => p.data?.includes(hoje)).length;
      setEstatisticas(prev => ({ 
        ...prev, 
        pedidosHoje: countHoje, 
        vendasHoje: countHoje * 29.90 
      }));
    });

    return () => unsubPedidos();
  }, []);

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [pedidos, feedbacks, produtos] = await Promise.all([
        pedidosService.listarPedidos(),
        feedbackService.listarFeedbacks(),
        estoqueService.listarProdutos()
      ]);

      const hoje = new Date().toISOString().split('T')[0];
      const pHoje = pedidos.filter(p => p.data?.includes(hoje)).length;

      setEstatisticas({
        pedidosHoje: pHoje,
        vendasHoje: pHoje * 29.90,
        feedbacksPendentes: feedbacks.filter(f => f.status === 'pendente').length,
        produtosBaixoEstoque: produtos.filter(p => p.quantidade <= p.estoqueMinimo).length
      });
    } catch (error) {
      console.error("Erro no dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="content-area">Carregando painel...</div>;

  return (
    <div className="dashboard-container">
      <header className="content-header">
        <div>
          <h2>Olá, Funcionário!</h2>
          <p>Confira o resumo das atividades do Restaurante Popular hoje.</p>
        </div>
      </header>

      {/* Grid de Cards conforme Imagem 2 do Design */}
      <div className="stats-grid">
        <div className="stat-card">
          <p>Pedidos de Hoje</p>
          <h3>{estatisticas.pedidosHoje}</h3>
        </div>
        
        <div className="stat-card">
          <p>Vendas (Estimado)</p>
          <h3>R$ {estatisticas.vendasHoje.toFixed(2)}</h3>
        </div>

        <div className="stat-card">
          <p>Feedbacks Pendentes</p>
          <h3 style={{ color: estatisticas.feedbacksPendentes > 0 ? '#dc3545' : 'inherit' }}>
            {estatisticas.feedbacksPendentes}
          </h3>
        </div>

        <div className="stat-card">
          <p>Alertas de Estoque</p>
          <h3 style={{ color: estatisticas.produtosBaixoEstoque > 0 ? '#ffc107' : 'inherit' }}>
            {estatisticas.produtosBaixoEstoque}
          </h3>
        </div>
      </div>

      <div className="data-table-container" style={{ marginTop: '20px' }}>
        <h3>Ações Rápidas</h3>
        <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
          <button className="btn-acao-tabela">Gerar Relatório Diário</button>
          <button className="btn-acao-tabela" style={{ backgroundColor: '#6c757d' }}>Atualizar Cardápio</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;