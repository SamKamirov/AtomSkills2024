import React from "react";
import { courses } from "../components/sections/middle";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteStudent, getStudents, getTeachers, logoutAction, sendStudent, sendTeacher } from "../store/app-data";
import { Empty } from "../components/empty";


const Teacher = () => {
  const dispatch = useDispatch();
  const teachers = useSelector(state => state.app.teachers);

  const [teacher, setTeacher] = useState({
    fio: '',
    email: 0,
    username: '',
    password: '',
    role: 'teacher'
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
    dispatch(sendTeacher({ teacher }));
    dispatch(getTeachers());
  }

  useEffect(() => {
    dispatch(getTeachers());
  }, [dispatch]);

  return (
    <div className="admin-panel__teacher">
      <div className='add-group-panel'>
        <h2 className="title">Наставник</h2>
        <form className='form' onChange={handleChange} onSubmit={handleSubmit}>
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
            <label htmlFor='positions-select'>Электронная почта</label>
            <input
              autoComplete='off'
              className='mginput'
              id='hrs-input'
              list='hrs'
              name='email'
              type='text'
            />
          </div>
          <div>
            <label htmlFor='positions-select'>Имя пользователя</label>
            <input
              autoComplete='off'
              className='mginput'
              id='hrs-input'
              list='hrs'
              name='username'
              type='text'
            />
          </div>
          <div>
            <label htmlFor='positions-select'>Пароль</label>
            <input
              autoComplete='off'
              className='mginput'
              id='hrs-input'
              list='hrs'
              name='password'
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

const Student = () => {
  const dispatch = useDispatch();
  const students = useSelector(state => state.app.students);
  const user = useSelector(state => state.app.user);
  const [student, setStudent] = useState({
    fio: '',
    email: 0,
    username: '',
    password: '',
    role: 'student'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setStudent({
      ...student,
      [name]: value
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendStudent({ student }));
  }

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);


  const handleStudentClick = (id) => {
    console.log(id);
    dispatch(deleteStudent(id.id));
  };

  return (
    <div className="admin-panel__teacher">
      <div className='add-group-panel'>
        <h2 className="title">Обучающийся</h2>
        <form className='form' onChange={handleChange} onSubmit={handleSubmit}>
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
            <label htmlFor='positions-select'>Электронная почта</label>
            <input
              autoComplete='off'
              className='mginput'
              id='hrs-input'
              list='hrs'
              name='email'
              type='text'
            />
          </div>
          <div>
            <label htmlFor='positions-select'>Имя пользователя</label>
            <input
              autoComplete='off'
              className='mginput'
              id='hrs-input'
              list='hrs'
              name='username'
              type='text'
            />
          </div>
          <div>
            <label htmlFor='positions-select'>Пароль</label>
            <input
              autoComplete='off'
              className='mginput'
              id='hrs-input'
              list='hrs'
              name='password'
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
          {students && students.map((item, index) => (
            <li className="staff-units__item" key={index} onClick={() => handleStudentClick(item)}>
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

const variants = {
  teacher: Teacher,
  student: Student
}

export const Admin = () => {
  const [panel, setPanel] = useState(null);
  const user = useSelector(state => state.app.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate('/')
    }
  }, [user, dispatch])

  const handleChange = (e) => setPanel(e.target.name);

  const Component = variants[panel];

  const handleClick = () => dispatch(logoutAction());

  return (
    <div className="admin-card">
      <form className='entities' onClick={handleChange}>
        <div className='entities__item'>
          <label htmlFor="teacher" className="entities__title">Наставники</label>
          <input type="radio" name='teacher' id='teacher' className="hidden" />
        </div>
        <div className='entities__item'>
          <label htmlFor="student" className="entities__title">Обучающиеся</label>
          <input type="radio" name='student' id="student" className="hidden" />
        </div>
        <div className='entities__item'>
          <label className="entities__title" onClick={handleClick}> Выход</label>
        </div>
      </form >
      {panel && <Component />}
    </div >
  )
};
