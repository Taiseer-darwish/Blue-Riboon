import React from "react";
import { useApp } from "../../Context/AppContext";
import AddEntity from "./AddEntity";

function AddSport() {
  const { addSport, checkSportExists } = useApp();

  return (
    <AddEntity
      entityType="Sport"
      addEntityFn={addSport}
      navigateTo="/sports"
      title="Add Sport"
      checkEntityExists={checkSportExists}
    />
  );
}

export default AddSport;