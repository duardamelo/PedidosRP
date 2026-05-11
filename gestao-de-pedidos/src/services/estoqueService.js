import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";

function observarEstoque(callback) {
  const ref = collection(db, "estoque");

  return onSnapshot(ref, (snapshot) => {
    const itens = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(itens);
  });
}

export const estoqueService = {
  observarEstoque,
};
