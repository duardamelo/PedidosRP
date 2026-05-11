import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  getDocs 
} from "firebase/firestore";

const pedidosRef = collection(db, "pedidos");

function observarPedidos(callback) {
  const q = query(pedidosRef, orderBy("criadoEm", "desc"));
  return onSnapshot(q, (snapshot) => {
    const pedidos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(pedidos);
  });
}

async function listarPedidos() {
  try {
    const q = query(pedidosRef, orderBy("criadoEm", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Erro ao listar pedidos:", error);
    return [];
  }
}

export const pedidosService = {
  observarPedidos,
  listarPedidos 
};