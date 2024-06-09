import React from "react";
import { Navbar } from "../vacancy/navbar";
import { AddGroupModal } from "../vacancy/add-vacancy-modal";
import { GroupList } from "../vacancy/vacancy-list";
import { useState } from "react";
import { Fragment } from "react";

const TeacherLeft = () => {
  const [isGroupModalVisible, setIsModalVisible] = useState(false);
  return (
    <Fragment>
      <Navbar onClick={setIsModalVisible} />
      {isGroupModalVisible && <AddGroupModal />}
      <GroupList />
    </Fragment>
  )
}

const StudentLeft = () => {
  return (
    <Fragment>
      <h2 className='title'>Что-то статическое</h2>
      <p>Статика</p>
    </Fragment>
  )
}

const variants = {
  'teacher': TeacherLeft,
  'student': StudentLeft
}

export const Left = ({ user }) => {
  const Component = variants[user.role]
  return (
    <section className="panel panel--colored panel-1">
      <Component />
    </section>
  )
}
