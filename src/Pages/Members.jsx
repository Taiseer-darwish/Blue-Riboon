import React from "react";
import FAB from "../componnents/FAB";
import MemberCard from "../componnents/MemberCard";

function Members() {
  return (
    <main className=" w-full min-h-screen m-auto flex justify-center items-center bg-[#12131a] p-20">
      <div className=" grid grid-cols-3 gap-7">
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <MemberCard />
        <FAB to="/AddMember" />
      </div>
    </main>
  );
}

export default Members;
