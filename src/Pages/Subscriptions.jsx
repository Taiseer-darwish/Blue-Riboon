import React, { useState } from "react";
import { useApp } from "../Context/AppContext";
import Swal from "sweetalert2";

function Subscriptions() {
  const { members, sports, addSubscription } = useApp();
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedSports, setSelectedSports] = useState([]);

  const handleSportToggle = (sportId) => {
    setSelectedSports((prev) =>
      prev.includes(sportId)
        ? prev.filter((id) => id !== sportId)
        : [...prev, sportId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMember || selectedSports.length === 0) {
      Swal.fire(
        "Error",
        "Please select a member and at least one sport!",
        "error"
      );
      return;
    }

    try {
      for (const sportId of selectedSports) {
        await addSubscription(selectedMember, sportId);
      }
      Swal.fire("Success", "Subscription(s) added successfully!", "success");
      setSelectedMember("");
      setSelectedSports([]);
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="bg-[#12131a] min-h-screen text-white p-10">
      <h2 className="text-4xl font-bold mb-8 text-center">
        Manage Subscriptions
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-[#1e1f27] p-8 rounded-2xl shadow-[0_0_10px_#1b2c91]"
      >
        <label className="block mb-4 text-lg font-semibold">
          Select Member
        </label>
        <select
          className="w-full p-3 rounded-lg bg-transparent border border-[#1b2c91] text-white mb-6"
          value={selectedMember}
          onChange={(e) => setSelectedMember(e.target.value)}
        >
          <option value="" className="bg-[#0a0b10] text-gray-300">Choose Member </option>
          {members.map((m) => (
            <option key={m.id} value={m.id}
                          className="bg-[#0a0b10] text-gray-200"
>
              {m.name}
            </option>
          ))}
        </select>

        <label className="block mb-4 text-lg font-semibold">
          Select Sports
        </label>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {sports.map((s) => (
            <label
              key={s.id}
              className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer ${
                selectedSports.includes(s.id)
                  ? "border-[#1b2c91] bg-[#3b0f0f4f]"
                  : "border-gray-600"
              }`}
            >
              <input
                type="checkbox"
                checked={selectedSports.includes(s.id)}
                onChange={() => handleSportToggle(s.id)}
              />
              {s.name}
            </label>
          ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#200101] to-[#0a165b] font-bold shadow-[0_0_5px_#fff] hover:shadow-[0_0_15px_#1b2c91] transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Subscriptions;
