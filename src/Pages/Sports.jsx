import React from "react";
import SportsCard from "../componnents/SportsCard";
import FAB from "../componnents/FAB";

function Sports() {
  return (
    <>
      <main className=" w-full min-h-screen bg-[#12131a] p-20">
        <div className=" grid grid-cols-3 gap-7">
          <SportsCard />
          <SportsCard />
          <SportsCard />
          <SportsCard />
          <SportsCard />
          <SportsCard />
          <FAB to="/Addsport" />
        </div>
      </main>
    </>
  );
}

export default Sports;
