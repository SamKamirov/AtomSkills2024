import React from "react";
import { Link } from "react-router-dom";

export const Empty = ({ path }) => {
  return (
    <div className="panel panel--single panel--colored">
      <h2>Sorry, not available</h2>
      <Link to={path} className="unit-card__menu unit-card__menu--save">Back</Link>
    </div>
  )
}
