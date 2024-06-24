import React from "react";
import { Navbar } from "../vacancy/navbar";
import { Topics } from "../vacancy/group-list";

export const TopicList = () => {
  return (
    <section className="panel panel--colored panel-1">
      <Navbar />
      <Topics />
    </section>
  )
}
