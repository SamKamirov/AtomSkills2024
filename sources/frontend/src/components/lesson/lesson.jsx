import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Empty } from "../empty";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Right } from "../sections/right";
import { useDispatch } from "react-redux";
import { fetchAllTasks, fetchLessonById } from "../../store/app-data";
import { Loading } from "../loading";
import { Link } from "react-router-dom";

export const Lesson = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const lesson = useSelector(state => state.app.selectedLesson);
  const allTasks = useSelector(state => state.app.tasks);

  useEffect(() => {
    dispatch(fetchLessonById(id));
    dispatch(fetchAllTasks());
  }, [id, dispatch]);

  if (!lesson || !allTasks) {
    return (<Loading />)
  };

  const sortedTasks = lesson && allTasks.filter((item) => lesson.find((item) => item).tasks.includes(item.code));

  const { content } = lesson.find((item) => item);

  return (
    <section className="template">
      <div className="lesson-content">
        <div className="link-to-dashboard">
          <Link to={'dashboard'}>
            <h2>На главную</h2>
          </Link>
        </div>
        <ReactMarkdown className="content" children={content} remarkPlugins={[remarkGfm]}></ReactMarkdown>
      </div>
      <div className="lesson-tasks">
        {sortedTasks && <Right className={'lesson-view'} tasks={sortedTasks} />}
      </div>
    </section>
  )
}
