import React, { useEffect, useState } from "react";
import { feedbackService } from "../services/feedbackService";

function Feedback({ onNavegar }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = feedbackService.observarFeedbacks((dados) => {
      setFeedbacks(dados);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="componente-com-layout">
      <header>
        <button onClick={() => onNavegar("dashboard")}>&lt;</button>
        <h1>Feedback</h1>
      </header>

      <main>
        {loading && <p>Carregando feedbacks...</p>}

        {!loading && feedbacks.length === 0 && (
          <p>Nenhum feedback encontrado.</p>
        )}

        {!loading &&
          feedbacks.map((fb) => (
            <section key={fb.id} className="feedback-section">
              <h2>{fb.nome || "Anônimo"}</h2>
              <p>{fb.mensagem}</p>
            </section>
          ))}
      </main>

      <footer className="footer-centralizado">
        <nav>
          <button onClick={() => onNavegar("funcionario")}>Funcionário</button>
          <button onClick={() => onNavegar("pagamentos")}>Pagamentos</button>
          <button onClick={() => onNavegar("feedback")}>Feedbacks</button>
          <button onClick={() => onNavegar("estoque")}>Estoque</button>
        </nav>
      </footer>
    </div>
  );
}

export default Feedback;
