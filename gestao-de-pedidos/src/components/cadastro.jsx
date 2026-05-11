import React, { useState } from "react";
import { auth, db } from "../services/firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const realizarCadastro = async () => {
    // Verificação básica para não enviar vazio
    if (!email || !senha || !nome) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      // 1. Cria o usuário no Authentication
      const credencial = await createUserWithEmailAndPassword(auth, email, senha);
      
      // 2. Salva no Banco de Dados (Firestore)
      await setDoc(doc(db, "usuarios", credencial.user.uid), {
        nome: nome,
        email: email,
        uid: credencial.user.uid,
        dataCriacao: new Date()
      });

      alert("Cadastro realizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Erro no Firebase: " + error.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px', margin: '50px auto' }}>
      <h2>Cadastro de Usuário</h2>
      
      <input 
        type="text" 
        placeholder="Nome Completo" 
        onChange={(e) => setNome(e.target.value)} 
      />
      
      <input 
        type="email" 
        placeholder="E-mail" 
        onChange={(e) => setEmail(e.target.value)} 
      />
      
      <input 
        type="password" 
        placeholder="Senha (mínimo 6 caracteres)" 
        onChange={(e) => setSenha(e.target.value)} 
      />

      {/* Chamada direta da função no clique do botão para evitar erros de form */}
      <button 
        type="button" 
        onClick={realizarCadastro}
        style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
      >
        CADASTRAR
      </button>
      
      <button 
        type="button" 
        onClick={() => navigate("/")} 
        style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
      >
        Já tenho conta (Login)
      </button>
    </div>
  );
}

export default Cadastro;