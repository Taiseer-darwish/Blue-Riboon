import React from "react";
import { useApp } from "../../Context/AppContext";
import AddEntity from "../Forms/AddEntity";

function AddSport() {
  const { addSport, checkSportExists } = useApp();

  return (
    <AddEntity
      entityType="Sport"
      addEntityFn={addSport}
      navigateTo="/"
      title="Add Sport"
      checkEntityExists={checkSportExists}
    />
  );
}

export default AddSport;