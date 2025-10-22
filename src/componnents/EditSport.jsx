import React from "react";
import { useApp } from "../Context/AppContext";
import EditEntity from "../componnents/Forms/EditEntity";

function EditSport() {
  const { updateSport, checkSportExists } = useApp();

  return (
    <EditEntity
      entityType="Sport"
      updateEntityFn={updateSport}
      navigateTo="/sports"
      title="Edit Sport"
      checkEntityExists={checkSportExists}
    />
  );
}

export default EditSport;