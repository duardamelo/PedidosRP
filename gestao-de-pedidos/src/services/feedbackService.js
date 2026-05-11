import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase";

function observarFeedbacks(callback) {
  const q = query(collection(db, "feedbacks"));

  return onSnapshot(q, (snapshot) => {
    const feedbacks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(feedbacks);
  });
}

export const feedbackService = {
  observarFeedbacks
};
