import React from "react";
import { Fragment } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../vacancy/navbar";
import { GroupList } from "../vacancy/vacancy-list";

export const courses = [
  {
    id: 1,
    title: 'Курс №1',
    description: 'Описание'
  },
  {
    id: 2,
    title: 'Курс №2',
    description: 'Описание'
  },
  {
    id: 3,
    title: 'Курс №3',
    description: 'Описание'
  },
  {
    id: 4,
    title: 'Курс №4',
    description: 'Описание'
  }, {
    id: 5,
    title: 'Курс №5',
    description: 'Описание'
  }
]

const MiddleListItem = ({ item }) => {
  return (
    <li className="staff-units__item">
      <Link className="card" to={`/course-unit/${item.id}`}>
        <h3 className="card__title">{item.title}</h3>
        <p className="card__detail">{item.description}</p>
      </Link>
    </li>
  )
}

const MiddleList = () => {
  return (
    <ul className="staff-units">
      {courses.map((item, index) => <MiddleListItem item={item} key={index} />)}
    </ul>
  )
}

const CourseNavBar = ({ onClick }) => {
  return (
    <ul className="menu">
      <li className="menu__item">
        <a className="menu__link menu__link--active">Всё</a>
      </li>
      <li className="menu__item menu__item--right">
        <button className="menu__link" data-action="show-add-candidate" onClick={() => onClick(true)}>
          Добавить
        </button>
      </li>
    </ul>
  )
}

const CourseModal = () => {
  return (
    <div className="add-candidate">
      <form className='form'>
        <p>
          <label htmlFor='positions-select'>Название</label>
          <input
            autoComplete='off'
            className='mginput'
            id='hrs-input'
            list='hrs'
            name='text'
            type='text'
          />
        </p>
        <p>
          <label htmlFor='positions-select'>
            Описание курса:
          </label>
          <textarea
            name='description'
            id='description-textarea'
            cols={80}
            rows={10}
            className="mginput"
          />
        </p>
        <button className='menu__link'>Добавить</button>
      </form>
    </div>
  )
}
const TeacherMiddle = () => {
  const [isCourseModal, setIsCourseModal] = useState(false);
  return (
    <Fragment>
      <h2 className="title">Курс</h2>
      <CourseNavBar onClick={setIsCourseModal} />
      {isCourseModal && <CourseModal />}
      <MiddleList />
    </Fragment>
  )
}

const StudentMiddle = () => {
  return (
    <Fragment>
      <h2 className='title'>Группы</h2>
      <ul className='menu'>
        <li className='menu__item'>
          <a
            className='menu__link'
            data-action='show-closed'
            href='#'>
            Все
          </a>
        </li>
      </ul>
      <GroupList />
    </Fragment>
  );
};

const variants = {
  teacher: TeacherMiddle,
  student: StudentMiddle
}

export const Middle = ({ user }) => {
  const Component = variants[user.role];
  return (
    <section className="panel panel--gray panel-2">
      <Component />
    </section>
  )
}
