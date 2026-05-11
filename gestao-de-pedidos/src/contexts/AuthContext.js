import React, { createContext, useState, useEffect, useContext } from "react";
import { authService } from "../services/authService";
import { db } from "../services/firebase"; // Certifique-se de importar seu db (Firestore)
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Função para buscar dados extras do Firestore
  const buscarDadosUsuario = async (firebaseUser) => {
    if (firebaseUser) {
      const docRef = doc(db, "usuarios", firebaseUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Unifica os dados do Auth com os dados do Firestore (tipo, nome, etc)
        return {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          ...docSnap.data(),
        };
      }
    }
    return firebaseUser;
  };

  useEffect(() => {
    const unsubscribe = authService.observarAuthState(async (user) => {
      if (user) {
        const usuarioCompleto = await buscarDadosUsuario(user);
        setUsuario(usuarioCompleto);
      } else {
        setUsuario(null);
      }
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, senha) => {
    try {
      const user = await authService.login(email, senha);
      const usuarioCompleto = await buscarDadosUsuario(user);
      setUsuario(usuarioCompleto);
      return usuarioCompleto;
    } catch (error) {
      console.error("Erro no Contexto (Login):", error.code);
      throw error;
    }
  };

  // Mantenha as funções de cadastrar e logout como estão, 
  // mas garanta que o cadastrar também salve o 'tipo' no futuro.

  const valor = {
    usuario,
    carregando,
    login,
    logout: async () => {
      await authService.logout();
      setUsuario(null);
    },
    estaAutenticado: !!usuario
  };

  return (
    <AuthContext.Provider value={valor}>
      {!carregando && children}
    </AuthContext.Provider>
  );
};