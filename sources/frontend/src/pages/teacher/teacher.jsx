import React from "react";
import { Fragment } from "react";
import { TopicList } from "../../components/sections/left";
import { Middle } from "../../components/sections/middle";
import { Calendar } from "../../components/calendar";

export const Teacher = ({ user }) => {
  return (
    <Fragment>
      <TopicList user={user} />
      <Middle user={user} />
      <Calendar />
    </Fragment>
  )
}
