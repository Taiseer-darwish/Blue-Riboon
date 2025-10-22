import React from "react";
import { useApp } from "../Context/AppContext";
import EditEntity from "../componnents/Forms/EditEntity";

function EditMember() {
  const { updateMember, checkMemberExists } = useApp();

  return (
    <EditEntity
      entityType="Member"
      updateEntityFn={updateMember}
      navigateTo="/members"
      title="Edit Member"
      checkEntityExists={checkMemberExists}
    />
  );
}

export default EditMember;
