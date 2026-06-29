import {
  collection,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
export async function getWishlist(uid) {
  const q = query(
    collection(db, "wishlist"),
    where("userId", "==", uid)
  );

  const snap = await getDocs(q);

  return snap.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}