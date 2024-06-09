import React from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../store/app-data";

export const Calendar = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutAction());
  }
  return (
    <section className="panel panel--calendar">
      <div className="control__wrapper">
        <button className="exit-button" onClick={handleClick}>Exit</button>
      </div>
      <h2 className="title title--calendar">Расписание</h2>
      <div className="calendar">
        <section className="calendar__day">
          <h2 className="calendar__title">Среда, 21 июня</h2>
          <ul className="calendar__list">
            <li className="calendar__item">
              <div className="calendar__wrapper">
                <div className="calendar__left">
                  <div className="calendar__name">Занятие</div>
                  <div className="calendar__subname">
                    Группа 1
                  </div>
                </div>
                <div className="calendar__right">
                  <div className="calendar__start">11:00</div>
                  <div className="calendar__end">13:00</div>
                </div>
              </div>
            </li>
          </ul>
          <h2 className="calendar__title">Четверг, 22 июня</h2>
          <ul className="calendar__list">
            <li className="calendar__item">
              <div className="calendar__wrapper">
                <div className="calendar__left">
                  <div className="calendar__name">Занятие</div>
                  <div className="calendar__subname">
                    Группа 1
                  </div>
                </div>
                <div className="calendar__right">
                  <div className="calendar__start">11:00</div>
                  <div className="calendar__end">13:00</div>
                </div>
              </div>
            </li>
            <li className="calendar__item calendar__item--red">
              <div className="calendar__wrapper">
                <div className="calendar__left">
                  <div className="calendar__name">Занятие</div>
                  <div className="calendar__subname">
                    Группа 1
                  </div>
                </div>
                <div className="calendar__right">
                  <div className="calendar__start">11:00</div>
                  <div className="calendar__end">13:00</div>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </section>
  )
}
