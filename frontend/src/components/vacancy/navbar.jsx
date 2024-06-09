import React from 'react';
import { Fragment } from 'react';

export const Navbar = ({ onClick }) => {
  return (
    <Fragment>
      <h2 className='title'>Группы</h2>
      <ul className='menu'>
        <li className='menu__item'>
          <a
            className='menu__link'
            data-action='show-closed'
            href='#'>
            Все
          </a>
        </li>
        <li className='menu__item menu__item--right'>
          <button className='menu__link' onClick={() => onClick(true)}>
            Добавить
          </button>
        </li>
      </ul>
    </Fragment>
  );
};
