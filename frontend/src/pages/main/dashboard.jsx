import React, { useState } from 'react';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Loading } from '../../components/loading';
import { Student } from '../../components/dashboards/student';
import { Teacher } from '../teacher/teacher';
import { Empty } from '../../components/empty';
import { Middle } from '../../components/sections/middle';
import { Left } from '../../components/sections/left';
import { Calendar } from '../../components/calendar';

const dashboards = {
  'teacher': Teacher,
  'student': Student
}

export const Dashboard = () => {
  const isLoading = useSelector(state => state.app.loading);
  const user = useSelector(state => state.app.user);

  if (isLoading) {
    return (<Loading />)
  }

  if (!user) {
    return (<Empty />)
  }

  console.log(user.role);

  return (
    <Fragment>
      <Left user={user} />
      <Middle user={user} />
      <Calendar />
    </Fragment >
  );
};
