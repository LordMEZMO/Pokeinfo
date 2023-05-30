import React from "react";
import { useParams } from "react-router-dom";

function MoveDetails() {
  let { name } = useParams();
  return <div>{name}</div>;
}

export default MoveDetails;
