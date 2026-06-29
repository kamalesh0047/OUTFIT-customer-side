import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function getProducts() {
  const snap = await getDocs(collection(db, "products"));

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function getProductsByCategory(category, subcategory = null) {
  let q;

  if (subcategory) {
    q = query(
      collection(db, "products"),
      where("category", "==", category),
      where("subcategory", "==", subcategory)
    );
  } else {
    q = query(
      collection(db, "products"),
      where("category", "==", category)
    );
  }

  const snap = await getDocs(q);

  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export async function getProduct(id) {
  const snap = await getDoc(doc(db, "products", id));

  if (!snap.exists()) return null;

  const data = snap.data();

  return {
    id: snap.id,
    ...data,

    image: data.image || data.imageUrl || "",
    imageUrl: data.imageUrl || data.image || "",
    gallery: data.gallery || [data.imageUrl || data.image || ""],

    colors: data.colors || [],
    sizes: data.sizes || [],
    specs: data.specs || [],
    care: data.care || [],

    rating: data.rating || 5,
    reviews: data.reviews || 0,
    brand: data.brand || "OUTFIT",
    stock: data.stock ?? 100,
  };
}