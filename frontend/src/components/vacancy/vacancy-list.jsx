import {vacancyList} from '../../const';
import {ListItem} from './list-item';
import React from 'react';

export const VacancyList = () => {
    return (
        <ul className='staff-units'>
            {vacancyList.map((item, index) => (<ListItem title={item.title} key={index} />))}
        </ul>
    );
};
