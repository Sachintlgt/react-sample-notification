import {
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
  doc,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

export const sendNotification = (name: string) => {
  try {
    return addDoc(collection(db, "notifications"), {
      name,
      read: false,
      timestamp: new Date(),
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const readNotification = async (id: string) => {
  try {
    await updateDoc(doc(db, "notifications", id), {
      read: true,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getAllUnreadNotifications = async () => {
  try {
    const q = query(
      collection(db, "notifications"),
      where("read", "==", false),
      orderBy("timestamp", "desc")
    );
    return getDocs(q);
  } catch (e) {
    console.error("Error retrieving document: ", e);
  }
};
