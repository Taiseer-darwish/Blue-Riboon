import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
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
    return !snapshot.empty; // Return true if name exists
  };

  // Check if Member Exists
  const checkMemberExists = async (name) => {
    const q = query(collection(db, "members"), where("name", "==", name));
    const snapshot = await getDocs(q);
    return !snapshot.empty; // Return true if name exists
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}