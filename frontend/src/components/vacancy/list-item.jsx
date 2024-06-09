import React from 'react';
import { Link } from 'react-router-dom';

export const ListItem = ({ item }) => {
  return (
    <li className='staff-units__item'>
      <Link className='card' to={`/group-unit/${item.id}`}>
        <h3 className='card__title'>{item.title}</h3>
      </Link>
    </li>
  );
};
