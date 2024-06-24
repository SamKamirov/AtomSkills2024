import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Loading } from '../../components/loading';
import { Middle } from '../../components/sections/middle';
import { TopicList } from '../../components/sections/left';
import { Right } from '../../components/sections/right';
import { useDispatch } from 'react-redux';
import { fetchAllLessons, fetchAllTasks, fetchAllTopics, getStudenTasks } from '../../store/app-data';
import { filterTasks } from '../../utils';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.app.loading);
  const selectedTopic = useSelector(state => state.app.selectedTopic);
  const lessons = useSelector(state => state.app.lessons);
  const tasks = useSelector(state => state.app.tasks);


  useEffect(() => {
    dispatch(fetchAllTopics());
    dispatch(fetchAllTasks());
    dispatch(fetchAllLessons());
  }, [dispatch]);

  if (isLoading) {
    return (<Loading />);
  };

  const filteredTasks = filterTasks(selectedTopic, lessons, tasks);

  return (
    <Fragment>
      <TopicList />
      <Middle />
      <Right tasks={filteredTasks} className={'task'} />
    </Fragment >
  );
};
