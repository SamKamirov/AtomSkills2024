import { ListItem } from './list-item';
import React from 'react';
import { useSelector } from 'react-redux';

export const Topics = () => {
  const topic = useSelector(state => state.app.topics);

  return (
    <ul className='staff-units'>
      {topic && topic.map((item, index) => (<ListItem item={item} key={index} />))}
    </ul>
  );
};
