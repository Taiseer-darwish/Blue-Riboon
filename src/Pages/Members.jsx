import React from "react";
import FAB from "../componnents/FAB";
import MemberCard from "../componnents/MemberCard";
import { useApp } from "../Context/AppContext";

function Members() {
  const { members, loading } = useApp();
  if (loading) return <p className="text-white p-20">Loading...</p>;

  return (
    <main className=" w-full min-h-screen m-auto flex justify-center items-center bg-[#12131a] p-20">
      <div className=" grid grid-cols-3 gap-7">
        {members.map((member) => (
          <MemberCard key={member.id} name={member.name} image={member.imageURL} />
        ))}
        <FAB to="/AddMember" />
      </div>
    </main>
  );
}

export default Members;
