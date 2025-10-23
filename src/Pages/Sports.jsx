import React from "react";
import { useApp } from "../Context/AppContext";
import SportsCard from "../componnents/Sport/SportsCard";
import FAB from "../componnents/FAB";

function Sports() {
  const { sports, loading } = useApp();

  if (loading) return <p className="text-white p-20">Loading...</p>;

  return (
    <main
     className="w-full min-h-screen m-auto flex justify-center items-center bg-[#12131a] p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 m-auto relative gap-5">
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
