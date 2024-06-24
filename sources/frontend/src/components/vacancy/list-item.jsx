import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLessons, fetchTasks, setSelectedTopic } from '../../store/app-data';
import { useSelector } from 'react-redux';

export const ListItem = ({ item }) => {
  const dispatch = useDispatch();

  const lessons = useSelector(state => state.app.lessons);
  // const filteredLessons = (item.lessons && lessons) && lessons.filter((lesson) => item.lessons.includes(lesson.code));

  const handleClick = () => {
    dispatch(setSelectedTopic(item));
  };

  return (
    <li className='staff-units__item card' onClick={handleClick}>
      <h3 className='card__title'>{item.title}</h3>
    </li>
  );
};
