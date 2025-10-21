import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function TestFirestore() {
  const [sports, setSports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "sports"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSports(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Sports from Firestore</h1>
      <ul className="list-disc pl-6">
        {sports.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </div>
  );
}
