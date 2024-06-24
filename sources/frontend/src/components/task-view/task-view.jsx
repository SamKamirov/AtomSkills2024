import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchAllTasks, fetchTaskById, getStudenTasks, getStudents, logoutAction, markWork, setSelectedStudent } from "../../store/app-data";

const MiddleListItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setSelectedStudent(item));
  };


  return (
    <li className="staff-units__item" onClick={handleClick}>
      <Link className="card">
        <h3 className="card__title">{item.fio}</h3>
        <p className="card__detail"></p>
      </Link>
    </li>
  )
}

const ListItem = ({ item, className }) => {
  const path = (className === 'task-element' ? 'task' : 'lesson');
  const dispatch = useDispatch();

  return (
    <li className="tasks__item" onClick={() => dispatch(fetchTaskById(item.code))}>
      <Link>
        <div className="tasks__wrapper">
          <div className="tasks__left">
            <div className="tasks__name">{item.title}</div>
            {className === 'task-element' && (
              <div className="tasks__subname">
                Группа 1
              </div>
            )}
          </div>
          {className === 'task-element' && (
            <div className="tasks__right">
              <div className="tasks__start">11:00</div>
              <div className="tasks__end">13:00</div>
            </div>
          )}
        </div>
      </Link>
    </li>
  )
}

export const TaskView = ({ link }) => {
  const { id } = useParams();
  const [mark, setMark] = useState(5);
  const dispatch = useDispatch();
  const selectedTask = useSelector(state => state.app.selectedTask);
  const studentTasks = useSelector(state => state.app.studentTasks);
  const tasks = useSelector(state => state.app.tasks);
  const students = useSelector(state => state.app.students);
  const student = useSelector(state => state.app.selectedStudent);

  let filtered = [];
  let studentSelectedTask = [];

  if (studentTasks && tasks && student) {
    filtered = tasks.filter((item) => studentTasks.find((task) => task.tasks[0].code === item.code && task.student === student.id))
  }
  studentSelectedTask = studentTasks && selectedTask && studentTasks.find((item) => item.tasks[0].code === selectedTask.code);

  const [userTask, setTask] = useState({
    _id: '',
    code: '',
    student: '',
    tasks: [
      {
        status: '',
        mark: 1,
        comment: '',
        supplement: [
          {
            title: '',
            file: ''
          }
        ]
      }
    ]
  });
  const [userID, setID] = useState();

  useEffect(() => {
    dispatch(fetchTaskById(id));
    dispatch(getStudenTasks());
    dispatch(getStudents());
    dispatch(fetchAllTasks());
  }, [dispatch])

  const handleClick = () => dispatch(logoutAction());
  const handleSelection = (e) => {
    const task = studentTasks.find((item) => item.tasks[0].code === selectedTask[0].code);
    console.log(task);
    setID(userID => task.code);
    setTask({
      ...userTask,
      ...{ _id: task.id, code: task.code, student: task.student, tasks: { code: task.tasks[0].code, comment: '', mark: mark, status: 'проверено' } }
    })
    setMark(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(markWork({ id: userID, task: userTask }));
  }

  return (
    <>
      <section className="panel panel--colored panel-task-view">
        <div className="link-to-dashboard">
          <Link to={`/tasks/${link}`}><h2>Назад</h2></Link>
        </div>
        <div className="link-to-dashboard">
          <Link to={'dashboard'}><h2>На главную</h2></Link>
        </div>
        <h2 className="title">Студенты</h2>
        <ul className="staff-units">
          {students && students.map((item, index) => <MiddleListItem item={item} key={index} />)}
        </ul>
      </section>
      <section className={`panel panel--gray panel-2 task-view`}>
        <h2 className="title">Задания</h2>
        <ul className="staff-units">
          {student && filtered.map(((item, index) => <ListItem item={item} key={index} />))}
        </ul>
      </section>
      <section className={`panel panel--tasks task task-view`}>
        <div className="control__wrapper">
          <button className="exit-button" onClick={handleClick}>Exit</button>
        </div>
        <h2 className="title title--tasks">Оценка</h2>
        <h2>{selectedTask && selectedTask[0].title}</h2>
        <h3>Cтатус: {studentSelectedTask && studentSelectedTask.status}</h3>
        <p>Сложность: {selectedTask && selectedTask.find(item => item).difficulty}</p>
        <div className="mark-wrappper">
          <label htmlFor="mark" className="mark-label">Оценка</label>
          <select title="Оценка" name="mark" id="mark" className="mark-value" onClick={handleSelection} defaultValue={5} defaultChecked={5}>
            <option value={5}>5</option>
            <option value={4}>4</option>
            <option value={3}>3</option>
            <option value={2}>2</option>
          </select>
        </div>
        <button type="submit" className="upload-task-btn" onClick={handleSubmit}>Сохранить</button>
      </section>
    </>

  )
}
