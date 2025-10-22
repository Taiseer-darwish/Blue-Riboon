import React from "react";
import { useApp } from "../Context/AppContext";
import SportsCard from "../componnents/SportsCard";
import FAB from "../componnents/FAB";

function Sports() {
  const { sports, loading } = useApp();

  if (loading) return <p className="text-white p-20">Loading...</p>;

  return (
    <main className="w-full min-h-screen bg-[#12131a] p-20">
      <div className="grid grid-cols-3 gap-7 relative">
        {sports.map((sport) => (
          <SportsCard
            key={sport.id}
            id={sport.id}
            name={sport.name}
            image={sport.imageURL}
          />
        ))}
        <FAB to="/Addsport" />
      </div>
    </main>
  );
}

export default Sports;
