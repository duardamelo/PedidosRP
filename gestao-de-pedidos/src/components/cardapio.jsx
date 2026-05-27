import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";

export default function Cardapio() {
  const [pratos, setPratos] = useState([]);
  
  // Estados para o formulário de postagem
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");

  // Função para carregar os pratos do banco
  async function carregar() {
    const querySnapshot = await getDocs(collection(db, "cardapio"));
    const lista = [];
    querySnapshot.forEach(doc => {
      lista.push({ id: doc.id, ...doc.data() });
    });
    setPratos(lista);
  }

  useEffect(() => {
    carregar();
  }, []);

  // Função para postar um novo prato
  const handlePostar = async (e) => {
    e.preventDefault();
    
    if (!nome || !preco) return alert("Preencha o nome e o preço!");

    try {
      await addDoc(collection(db, "cardapio"), {
        nome: nome,
        descricao: descricao,
        preco: parseFloat(preco),
        disponivel: true,
        dataCriacao: serverTimestamp()
      });

      alert("Prato publicado com sucesso!");
      
      // Limpa os campos do formulário
      setNome("");
      setDescricao("");
      setPreco("");
      
      // Atualiza a lista automaticamente
      carregar();
    } catch (error) {
      console.error("Erro ao postar:", error);
      alert("Erro ao salvar no banco de dados.");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Gerenciamento do Cardápio</h1>

      {/* Formulário de Postagem */}
      <div className="form-postagem" style={{ marginBottom: '40px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Postar Novo Prato</h3>
        <form onSubmit={handlePostar}>
          <div style={{ marginBottom: '10px' }}>
            <input 
              type="text" 
              placeholder="Nome do Prato" 
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <textarea 
              placeholder="Descrição" 
              value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <input 
              type="number" 
              step="0.01" 
              placeholder="Preço (Ex: 1.00)" 
              value={preco} 
              onChange={(e) => setPreco(e.target.value)} 
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <button type="submit" className="btn-verde" style={{ padding: '10px 20px', cursor: 'pointer' }}>
            Publicar no Cardápio
          </button>
        </form>
      </div>

      {/* Tabela de Visualização (O que você já tinha) */}
      <h3>Pratos Publicados</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pratos.map(p => (
            <tr key={p.id}>
              <td>{p.nome}</td>
              <td>{p.descricao}</td>
              <td>R$ {parseFloat(p.preco).toFixed(2)}</td>
              <td>{p.disponivel ? "✅ Disponível" : "❌ Indisponível"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}