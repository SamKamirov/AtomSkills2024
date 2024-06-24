import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Empty } from "../empty";
import { NoData } from "../no-data/no-data";

const MiddleListItem = ({ item }) => {
  const handleClick = () => {

  };

  return (
    <li className="staff-units__item" onClick={handleClick}>
      <Link className="card" to={`/lesson/${item.code}`}>
        <h3 className="card__title">{item.title}</h3>
        <p className="card__detail"></p>
      </Link>
    </li>
  )
}

const MaterialList = () => {
  const lessons = useSelector(state => state.app.lessons);
  const selectedTopic = useSelector(state => state.app.selectedTopic);

  if (!lessons || !selectedTopic) {
    return <NoData />
  };

  const filteredLessons = selectedTopic && lessons.filter((lesson) => selectedTopic.lessons.includes(lesson.code));

  return (
    <ul className="staff-units">
      {filteredLessons.map((item, index) => <MiddleListItem item={item} key={index} />)}
    </ul>
  )
}

const Filters = () => {
  return (
    <ul className="menu">
      <li className="menu__item">
        <a className="menu__link menu__link--active">Всё</a>
      </li>
    </ul>
  )
}

export const Middle = ({ user }) => {
  return (
    <section className="panel panel--gray panel-2">
      <h2 className="title">Материал</h2>
      <MaterialList />
    </section>
  )
}
