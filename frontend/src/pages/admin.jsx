import React from "react";
import { courses } from "../components/sections/middle";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTeachers, sendTeacher } from "../store/app-data";


const Teacher = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(state => state.app.teachers);

  const [teacher, setTeacher] = useState({
    teacher_id: '1',
    age: 0,
    fio: '',
    courses: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTeacher({
      ...teacher,
      [name]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    dispatch(sendTeacher({ teacher }));
    dispatch(getTeachers());
  }

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  return (
    <div className="admin-panel__teacher">
      <div className='add-group-panel'>
        <h2 className="title">Teacher</h2>
        <form className='form' onChange={handleChange} onSubmit={handleSubmit}>
          <div>
            <label htmlFor='positions-select'>Номер</label>
            <input
              autoComplete='off'
              className='mginput'
              id='hrs-input'
              list='hrs'
              name='teacher_id'
              type='text'
            />
          </div>
          <div>
            <label htmlFor='positions-select'>Возраст</label>
            <input
              autoComplete='off'
              className='mginput'
              id='hrs-input'
              list='hrs'
              name='age'
              type='text'
            />
          </div>
          <div>
            <label htmlFor='positions-select'>ФИО</label>
            <input
              autoComplete='off'
              className='mginput'
              id='hrs-input'
              list='hrs'
              name='fio'
              type='text'
            />
          </div>
          <div>
            <label htmlFor='positions-select'>Курсы</label>
            <input
              autoComplete='off'
              className='mginput'
              id='hrs-input'
              list='hrs'
              name='courses'
              type='text'
            />
          </div>
          <div>
            <button className="submit-btn">Добавить</button>
          </div>
        </form>
      </div>
      <div className="admin-panel__teacher--left">
        <ul className="staff-units">
          {teachers && teachers.map((item, index) => (
            <li className="staff-units__item" key={index}>
              <Link className="card">
                <h3 className="card__title">
                  {item.fio}
                </h3>
              </Link>
            </li>)
          )}
        </ul>
      </div>
    </div>
  )
}

const Group = () => {
  return (
    <div className='add-group-panel'>
      <h2 className="title">Group</h2>
      <form className='form'>
        <div>
          <label htmlFor='positions-select'>Название</label>
          <input
            autoComplete='off'
            className='mginput'
            id='hrs-input'
            list='hrs'
            name='text'
            type='text'
          />
        </div>
        <div>
          <button className="submit-btn">Добавить</button>
        </div>
      </form>
    </div>
  )
}

const Course = () => {
  return (
    <Fragment>
      <div className='add-group-panel'>
        <h2 className="title">Course</h2>
        <form className='form'>
          <div>
            <label htmlFor='positions-select'>Название</label>
            <input
              autoComplete='off'
              className='mginput'
              id='hrs-input'
              list='hrs'
              name='text'
              type='text'
            />
          </div>
          <div>
            <button className="submit-btn">Добавить</button>
          </div>
        </form>
      </div>
      <div className="course-panel--right">

      </div>
    </Fragment>
  )
}

const variants = {
  teacher: Teacher,
  group: Group,
  course: Course,
}

export const Admin = () => {
  const navigate = useNavigate();
  const [panel, setPanel] = useState(null);
  const user = useSelector(state => state.app.user);

  const handleChange = (e) => {
    setPanel(e.target.name);
  };

  const Component = variants[panel];

  return (
    <div className="admin-card">
      <form className='entities' onChange={handleChange}>
        <li className='entities__item'>
          <label htmlFor="teacher" className="entities__title">Teacher</label>
          <input type="radio" name="teacher" id='teacher' className="hidden" />
        </li>
        <li className='entities__item'>
          <label htmlFor="group" className="entities__title">Group</label>
          <input type="radio" name="group" id="group" className="hidden" />
        </li>
        <li className='entities__item'>
          <label htmlFor="course" className="entities__title">Course</label>
          <input type="radio" name="course" id="course" className="hidden" />
        </li>
      </form>
      {panel && <Component />}
    </div>
  )
};
