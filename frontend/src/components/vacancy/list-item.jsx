import React from 'react';

export const ListItem = ({title}) => {
    return (
        <li className='staff-units__item'>
            <a
                className='card'
                href='/staff-unit/64f027ec-5224-4102-96bb-0b5bc4cb27df'>
                <h3 className='card__title'>{title}</h3>
            </a>
        </li>
    );
};
