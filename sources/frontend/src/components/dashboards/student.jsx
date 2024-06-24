import React from "react";
import { TopicList } from "../sections/left";
import { Middle } from "../sections/middle";
import { Calendar } from "../calendar";
import { Fragment } from "react";

export const Student = () => {
  return (
    <Fragment>
      <TopicList user={user} />
      <Middle />
      <Calendar />
    </Fragment>
  )
}
