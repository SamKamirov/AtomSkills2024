import { groupList } from '../../const';
import { ListItem } from './list-item';
import React from 'react';

export const GroupList = () => {
  return (
    <ul className='staff-units'>
      {groupList.map((item, index) => (<ListItem item={item} key={index} />))}
    </ul>
  );
};
