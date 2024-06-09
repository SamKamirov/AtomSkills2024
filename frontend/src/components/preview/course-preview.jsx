import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { isTeacher } from '../../utils';
import { useSelector } from 'react-redux';
import { groupList } from '../../const';
import { Loading } from '../loading';
import { Empty } from '../empty';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../sections/middle';

const userHeaders = {
  'cource': <h2 className='title'>Курс</h2>,
  'group': <h2 className='title'>Группа</h2>,
};

export const CoursePreview = ({ type }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isLoading = useSelector(state => state.app.loading);
  const unit = courses.find((item) => item.id == id);

  if (isLoading) {
    return (<Loading />);
  }

  if (!unit) {
    return (<Empty />);
  };

  const handleClick = () => {
    navigate('dashboard');
  }

  return (
    <div className='layout'>
      <div className='panel panel--single panel--colored'>
        <div className='panel-limiter'>
          <h2 className='title'>Курс</h2>
          <div className='unit-card__wrapper'>
            <form className='form'>
              <div className='input-group'>
                <label>Название</label>
                <input className='mginput' defaultValue={unit.title} />
              </div>
              <div className="input-group">
                <label>Описание</label>
                <textarea
                  autoComplete='off'
                  className='mginput'
                  id='hrs-input'
                  list='hrs'
                  name='text'
                  type='text'
                />
              </div>
            </form>
          </div>
          <ul className='unit-card__menu'>
            <li>
              <Link to={'dashboard'}>Назад</Link>
            </li>
            <li className='unit-card__menu'>
              <button className='menu__link' onClick={handleClick}>Сохранить</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
