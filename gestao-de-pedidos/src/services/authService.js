import { auth } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

export const authService = {
  // Cadastro de novo usuário
  cadastrar: async (email, senha) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  },

  // Login de usuário existente
  login: async (email, senha) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    return userCredential.user;
  },

  // Logout
  logout: async () => {
    await signOut(auth);
  },

  // Observador do estado de login
  observarAuthState: (callback) => {
    return onAuthStateChanged(auth, callback);
  }
};