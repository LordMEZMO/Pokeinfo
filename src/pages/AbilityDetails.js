import React from "react";
import { useParams } from "react-router-dom";

function AbilityDetails() {
  let { name } = useParams();

  return <div>{name}</div>;
}

export default AbilityDetails;
