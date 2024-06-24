import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAllLessons, fetchLessons, fetchTaskById, getStudenTasks, setSelectedTopic } from "../../store/app-data";
import { useSelector } from "react-redux";
import { Empty } from "../../components/empty";
import ReactMarkdown from "react-markdown";
import { Right } from '../../components/sections/right';
import { Loading } from "../../components/loading";
import { Link } from "react-router-dom";


export const Task = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchTaskById(id));
    dispatch(fetchAllLessons());
    dispatch(getStudenTasks());
  }, [dispatch]);

  const task = useSelector(state => state.app.selectedTask);
  const lessons = useSelector(state => state.app.lessons);
  const loading = useSelector(state => state.app.loading);


  const filteredLessons = lessons && lessons.filter((item) => item.tasks.includes(id));


  if (loading) {
    return (<Loading />);
  };

  if (!task || loading) {
    return <Loading />
  }

  const { content } = task[0];

  return (
    <section className="template task">
      <div className="task-content">
        <div className="link-to-dashboard">
          <Link to={'dashboard'}>
            <h2>На главную</h2>
          </Link>
        </div>
        {content && <ReactMarkdown className="content" children={content}></ReactMarkdown>}
      </div>
      {filteredLessons && <Right className={'task-view'} lessons={filteredLessons} />}
      <div className="task-tasks">
      </div>
    </section>
  )
};
