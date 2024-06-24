import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTaskById, logoutAction, markWork, sendToWork } from "../../store/app-data";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { v1 } from "uuid";
import { Search } from "../search/search";
import { toast } from "react-toastify";

const ListItem = ({ item, className }) => {
  const path = (className === 'task-element' ? 'task' : 'lesson');

  return (
    <li className="tasks__item">
      <Link to={`/${path}/${item.code}`}>
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

const Filters = () => {
  return (
    <ul className="menu">
      <li className="menu__item">
        <a className="menu__link menu__link--active">Код</a>
      </li>
      <li className="menu__item">
        <a className="menu__link menu__link--active">Заголовок</a>
      </li>
      <li className="menu__item">
        <a className="menu__link menu__link--active">Содержание</a>
      </li>
      <li className="menu__item">
        <a className="menu__link menu__link--active">Приложение</a>
      </li>
      <li className="menu__item">
        <a className="menu__link menu__link--active">Сложность</a>
      </li>
      <li className="menu__item">
        <a className="menu__link menu__link--active">Время</a>
      </li>
    </ul>
  )
}

const TaskForm = () => {
  const selectedTask = useSelector(state => state.app.selectedTask.find((item) => item));
  const user = useSelector(state => state.app.user);

  return (
    <section className="task-response">
      <h2>Информация о задании</h2>
      {user && user.role === 'teacher' && <TeacherTaskView task={selectedTask} user={user} />}
      {user && user.role === 'student' && <StudentTaskView />}
    </section>
  );
}

const titles = {
  'lesson-view': 'Задания',
  'task': 'Задания',
  'task-view': 'Материалы'
}

const TeacherTaskView = ({ user, task }) => {
  console.log(user);
  const studentTasks = useSelector(state => state.app.studentTasks);

  return (
    <section>
      <h2>{task.title}</h2>
      <p>Сложность: {task.difficulty}</p>

      <form className="picture-upload-form">
        <Link to={`/tasks/view/${task.code}`} type="submit" className="upload-task-btn">Просмотр</Link>
      </form>

    </section>
  )
}

const StudentTaskView = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector(state => state.app.selectedTask);
  const studentTasks = useSelector(state => state.app.studentTasks);
  const user = useSelector(state => state.app.user);
  const imageRef = useRef();

  const filtered = studentTasks && studentTasks.find((item) => item.student === user._id && item.tasks[0].code === selectedTask[0].code);
  console.log(filtered);
  const id = v1();

  const [task, setTask] = useState({
    _id: '',
    code: selectedTask[0].code,
    student: filtered && filtered.student,
    tasks: [
      {
        code: filtered && filtered.tasks[0].code,
        status: '',
        mark: filtered && filtered.tasks[0].mark,
        comment: filtered && filtered.tasks[0].mark,
        supplement: filtered && filtered.tasks[0].supplement
      }
    ]
  })

  const handleToCheck = (e) => {
    e.preventDefault();
    const task = {
      _id: filtered && filtered.id,
      code: filtered.code,
      student: filtered && filtered.student,
      tasks: [
        {
          code: selectedTask[0].code,
          status: 'отправлено на проверку',
          mark: filtered && filtered.tasks[0].mark,
          comment: filtered && filtered.tasks[0].mark,
          supplement: filtered && filtered.tasks[0].supplement
        }
      ]
    };
    dispatch(markWork({ id: task.code, task: task }));
  }

  const handleToCheckChange = () => {

  };

  const variants = {
    'взято в работу': (
      <form className="picture-upload-form" onSubmit={handleToCheck} onChange={handleToCheckChange}>
        <div className="upload-label-wrapper">
          {/* {task.supplement.file ? <h3>{imageRef.current.files[0].name}</h3> : (
            <label htmlFor="upload-input" className="upload-label">Прикрепить файл</label>
          )} */}
          <input type="file" accept="image/png, image/gif, image/jpeg" name='upload-input' id='upload-input' hidden ref={imageRef} />
        </div>
        <button type="submit" className="upload-task-btn">Отправить на проверку</button>
      </form>
    ),
    'отправлено на проверку': '',
    'проверено': ''
  };

  let status = filtered && filtered.tasks[0].status

  const handleSubmit = (e) => {
    e.preventDefault();

    if (status === 'взято в работу' && !task.supplement.file) {
      toast.warn("Не выбран файл")
      return;
    }

    console.log({
      'code': id, student: user._id, 'tasks': [
        {
          code: selectedTask[0].code,
          status: 'взято в работу',
          mark: filtered && filtered.tasks[0].mark,
          comment: filtered && filtered.tasks[0].comment,
          supplement: {
            title: '',
            file: ''
          }
        }
      ]
    })
    dispatch(sendToWork({
      'code': id, student: user._id, 'tasks': [
        {
          code: selectedTask[0].code,
          status: 'взято в работу',
          mark: filtered && filtered.tasks[0].mark,
          comment: filtered && filtered.tasks[0].mark,
          supplement: filtered && filtered.tasks[0].supplement
        }
      ]
    }));
    dispatch(fetchTaskById(id));
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      status: 'отправлено на проверку',
      supplement: {
        title: 'Картинка',
        file: imageRef.current.files[0]
      }
    });
  }

  return (
    <section>
      <h2>{selectedTask[0].title}</h2>
      <h3>{status && `Статус: ${status}`}</h3>
      <p>Сложность: {selectedTask[0].difficulty}</p>
      {status ? variants[status] : <form className="picture-upload-form" onSubmit={handleSubmit} onChange={handleChange}>
        <button type="submit" className="upload-task-btn">Взять в работу</button>
      </form>}
    </section>
  )
}

const searchTasks = (tasks, search) => {
  if (search === '') return tasks;
  const results = [];

  const codeResult = tasks.find((task) => task.code.includes(search));
  if (codeResult) results.push(codeResult);

  const titleResult = tasks.find((task) => task.title.includes(search));
  if (titleResult) results.push(titleResult);

  tasks.forEach((task) => {
    if (task.content.includes(search)) results.push(task);
  });

  tasks.forEach((task) => {
    task.supplement && task.supplement.forEach((supplement) => {
      if (supplement.title.includes(search)) results.push(task);
    });
  });

  tasks.forEach((task) => {
    task.supplement && task.supplement.forEach((supplement) => {
      if (supplement.file.includes(search)) results.push(task);
    });
  });

  return results;
};


const reduceTasks = (tasks) => {
  const res = tasks.reduce((acc, curr) => {
    const index = acc.findIndex(
      item => Object.values(item).
        some(value => value >
          Object.values(curr)[0]));
    if (index === -1) {
      acc.push(curr);
    } else {
      acc.splice(index, 0, curr);
    }
    return acc;
  }, []);

  return res
}

const sortTasks = (type, tasks) => {
  if (!type || !tasks) return tasks;
  switch (type) {
    case 'Код': return reduceTasks([...tasks]);
    case 'Заголовок': return [...tasks].sort((prev, next) => next.title - prev.title);
    case 'Содержание': return [...tasks].sort((prev, next) => prev.content - next.content);
    case 'Приложение': return [...tasks].sort((prev, next) => prev.supplement.title - next.supplement.title);
    case 'Сложность': return [...tasks].sort((prev, next) => prev.difficulty - next.difficulty);
    case 'Время': return [...tasks].sort((prev, next) => prev.time - next.time);
    default: return tasks;
  }
}

const Sorting = ({ onClick }) => {
  const handleClick = (e) => onClick(e.target.textContent);

  return (
    <ul className="menu" onClick={handleClick}>
      <li className="menu__item">
        <a className="menu__link menu__link--active">Код</a>
      </li>
      <li className="menu__item">
        <a className="menu__link menu__link--active">Заголовок</a>
      </li>
      <li className="menu__item">
        <a className="menu__link menu__link--active">Содержание</a>
      </li>
      {/* <li className="menu__item">
        <a className="menu__link menu__link--active">Приложение</a>
      </li> */}
      <li className="menu__item">
        <a className="menu__link menu__link--active">Сложность</a>
      </li>
      <li className="menu__item">
        <a className="menu__link menu__link--active">Время</a>
      </li>
    </ul>
  )
}

export const Right = ({ className, tasks, lessons }) => {
  const [sortingType, setSortingType] = useState('');
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const sortedTasks = sortTasks(sortingType, tasks)
  const searchedTasks = sortedTasks && searchTasks(sortedTasks, search);

  const handleClick = () => dispatch(logoutAction());

  return (
    <section className={`panel panel--tasks ${className}`}>
      <div className="control__wrapper">
        <button className="exit-button" onClick={handleClick}>Exit</button>
      </div>
      <h2 className="title title--tasks">{titles[className]}</h2>
      {className === 'task' && <Search setSearch={setSearch} />};
      {<Sorting onClick={setSortingType} />}

      {searchedTasks && className != 'task-view' && (
        <ul className="tasks__list">
          {searchedTasks && searchedTasks.map((item, index) => <ListItem item={item} key={index} className={'task-element'} />)}
        </ul>
      )}

      {lessons && (
        <ul className="tasks__list">
          {lessons && lessons.map((item, index) => <ListItem item={item} key={index} className={'lesson-element'} />)}
        </ul>
      )}
      {className === 'task-view' && <TaskForm />}
    </section>
  )
}
