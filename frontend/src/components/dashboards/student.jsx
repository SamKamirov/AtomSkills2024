import React from "react";
import { Left } from "../sections/left";
import { Middle } from "../sections/middle";
import { Calendar } from "../calendar";
import { Fragment } from "react";

export const Student = () => {
  return (
    <Fragment>
      <Left user={user} />
      <Middle />
      <Calendar />
    </Fragment>
  )
}
