import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";

const AppContext = createContext();

// Provider
export function AppProvider({ children }) {
  const [sports, setSports] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get Sports
  const fetchSports = async () => {
    const snapshot = await getDocs(collection(db, "sports"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSports(data);
  };

  // Get Members
  const fetchMembers = async () => {
    const snapshot = await getDocs(collection(db, "members"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMembers(data);
  };

  // Check if Sport Exists
  const checkSportExists = async (name) => {
    const q = query(collection(db, "sports"), where("name", "==", name));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  };

  // Check if Member Exists
  const checkMemberExists = async (name) => {
    const q = query(collection(db, "members"), where("name", "==", name));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  };

  // Load Data on App Start
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchSports();
      await fetchMembers();
      setLoading(false);
    };
    loadData();
  }, []);

  // Add New Sport
  const addSport = async (name, imageURL) => {
    const docRef = await addDoc(collection(db, "sports"), {
      name,
      imageURL,
      createdAt: serverTimestamp(),
    });
    setSports((prev) => [...prev, { id: docRef.id, name, imageURL }]);
  };

  // Add New Member
  const addMember = async (name, imageURL) => {
    const docRef = await addDoc(collection(db, "members"), {
      name,
      imageURL,
      createdAt: serverTimestamp(),
    });
    setMembers((prev) => [...prev, { id: docRef.id, name, imageURL }]);
  };

  // Delete Sport;
  const deleteSport = async (id) => {
    try {
      await deleteDoc(doc(db, "sports", id));
      setSports((prev) => prev.filter((sport) => sport.id !== id));
    } catch (error) {
      console.error("Error deleting sport:", error);
      throw error;
    }
  };

  // Update Sport
  const updateSport = async (id, updatedData) => {
    try {
      const sportRef = doc(db, "sports", id);
      await updateDoc(sportRef, updatedData);

      setSports((prev) =>
        prev.map((sport) =>
          sport.id === id ? { ...sport, ...updatedData } : sport
        )
      );
    } catch (error) {
      console.error("Error updating sport:", error);
      throw error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        sports,
        members,
        addSport,
        addMember,
        checkSportExists,
        checkMemberExists,
        deleteSport,
        updateSport,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
