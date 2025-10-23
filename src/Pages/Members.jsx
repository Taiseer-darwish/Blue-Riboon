import React from "react";
import FAB from "../componnents/FAB";
import MemberCard from "../componnents/Member/MemberCard";
import { useApp } from "../Context/AppContext";

function Members() {
  const { members, loading } = useApp();
  if (loading) return <p className="text-white p-20">Loading...</p>;

  return (
    <main className=" w-full min-h-screen m-auto flex justify-center items-center bg-[#12131a] p-10">
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {members.map((member) => (
          <MemberCard
            id={member.id}
            name={member.name}
            image={member.imageURL}
          />
        ))}
        <FAB to="/AddMember" />
      </div>
    </main>
  );
}

export default Members;
