import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function placeOrder(order) {
  await addDoc(collection(db, "orders"), {
    ...order,
    status: "Pending",
    createdAt: serverTimestamp(),
  });
}

export async function getUserOrders(uid) {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", uid)
  );

  const snap = await getDocs(q);

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}