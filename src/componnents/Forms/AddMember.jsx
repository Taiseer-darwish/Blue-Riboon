import React from "react";
import { useApp } from "../../Context/AppContext";
import AddEntity from "./AddEntity";

function AddMember() {
  const { addMember, checkMemberExists } = useApp();

  return (
    <AddEntity
      entityType="Member"
      addEntityFn={addMember}
      navigateTo="/members"
      title="Add Member"
      checkEntityExists={checkMemberExists}
    />
  );
}

export default AddMember;