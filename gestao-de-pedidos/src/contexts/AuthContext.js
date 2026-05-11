import React, { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../services/authService";

// Cria o contexto
const AuthContext = createContext({});

// Hook personalizado para usar o Auth em qualquer lugar
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Monitora o estado da autenticação (se o usuário está logado ou não)
  useEffect(() => {
    const unsubscribe = authService.observarAuthState((user) => {
      setUsuario(user);
      setCarregando(false); // Assim que o Firebase responde, paramos de mostrar "Carregando"
    });

    // Limpa o observador quando o componente é destruído
    return () => unsubscribe();
  }, []);

  // Função de Cadastro
  const cadastrar = async (email, senha) => {
    try {
      const user = await authService.cadastrar(email, senha);
      setUsuario(user);
      return user;
    } catch (error) {
      console.error("Erro no Contexto (Cadastro):", error.code);
      throw error;
    }
  };

  // Função de Login
  const login = async (email, senha) => {
    try {
      const user = await authService.login(email, senha);
      setUsuario(user);
      return user;
    } catch (error) {
      console.error("Erro no Contexto (Login):", error.code);
      throw error;
    }
  };

  // Função de Logout (Sair)
  const logout = async () => {
    try {
      await authService.logout();
      setUsuario(null);
    } catch (error) {
      console.error("Erro ao Sair:", error.code);
      throw error;
    }
  };

  // Valores que estarão disponíveis em todo o App
  const valor = {
    usuario,
    carregando,
    cadastrar,
    login,
    logout,
    estaAutenticado: !!usuario
  };

  return (
    <AuthContext.Provider value={valor}>
      {!carregando && children} 
      {/* O "!carregando" garante que o App só apareça quando o Firebase já souber se há um usuário */}
    </AuthContext.Provider>
  );
};