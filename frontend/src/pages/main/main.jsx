import React, { useState } from 'react';
import { Fragment } from 'react';
import { VacancyList } from '../../components/vacancy/vacancy-list';
import { Navbar } from '../../components/vacancy/navbar';
import { AddVacancyModal } from '../../components/vacancy/add-vacancy-modal';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const Main = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useSelector((state) => state.app.user);

  useEffect(() => {
    if (!user) {
      navigate('login')
    }
  }, [user, navigate])

  return (
    <Fragment>
      <section className="panel panel--colored panel-1">
        <Navbar onClick={setIsModalVisible} />
        {isModalVisible && <AddVacancyModal />}
        <VacancyList />
      </section>
      <section className="panel panel--gray panel-2">
        <h2 className="title">Курс</h2>
        <ul className="menu">
          <li className="menu__item">
            <a className="menu__link menu__link--active" href="#">Всё
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              Новые
            </a>
          </li>
          <li className="menu__item">
            <a className="menu__link" href="#">
              До интервью
            </a>
          </li>
          <li className="menu__item">
            <a
              className="menu__link"
              href="#"
            >
              После интервью
            </a>
          </li>
          <li className="menu__item menu__item--right">
            <a className="menu__link" data-action="show-add-candidate" href="#">
              Добавить
            </a>
          </li>
        </ul>
        <div className="add-candidate hidden">
          <form className="form">
            <p>
              Номер штатной единицы:{'{'}' '{'}'}
              <b className="js-id" title="" data-id="" />
            </p>
            <p>
              <label htmlFor="positions-select">Должность:</label>
              <select name="positions" id="positions-select">
                <option value="none" />
              </select>
            </p>
            <p>
              <label htmlFor="positions-select">Описание вакансии:</label>
              <textarea
                name="description"
                id="description-textarea"
                cols={80}
                rows={10}
                defaultValue={''}
              />
            </p>
            <button type="submit">Добавить</button>
          </form>
        </div>
        <ul className="staff-units">
          <li className="staff-units__item">
            <a className="card" href="/staff-unit/">
              <h3 className="card__title">Поскрёбышев Максим Сергеевич</h3>
              <p className="card__detail">Кандидат на вакансию № fb5048b4</p>
            </a>
          </li>
          <li className="staff-units__item">
            <a className="card" href="/staff-unit/">
              <h3 className="card__title">Долганов Евгений Петрович</h3>
              <p className="card__detail">Кандидат на вакансию № 64f027ec</p>
            </a>
          </li>
          <li className="staff-units__item">
            <a className="card" href="/staff-unit/">
              <h3 className="card__title">Иртеньев Игорь Моисеевич</h3>
              <p className="card__detail">Кандидат на вакансию № a92958b3</p>
            </a>
          </li>
          <li className="staff-units__item">
            <a className="card" href="/staff-unit/">
              <h3 className="card__title">Фрейдкин Марк</h3>
              <p className="card__detail">Кандидат на вакансию № 4002ed28</p>
            </a>
          </li>
          <li className="staff-units__item">
            <a className="card" href="/staff-unit/">
              <h3 className="card__title">Гребенщиков Борис Борисович</h3>
              <p className="card__detail">Кандидат на вакансию № fb5048b4</p>
            </a>
          </li>
          <li className="staff-units__item">
            <a className="card" href="/staff-unit/">
              <h3 className="card__title">Быков Дмитрий Львович</h3>
              <p className="card__detail">Кандидат на вакансию № 8dc51532</p>
            </a>
          </li>
        </ul>
      </section>
      <section className="panel panel--calendar">
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
    </Fragment >
  );
};
