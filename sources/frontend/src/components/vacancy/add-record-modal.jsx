import React from "react";

export const AddGroupModal = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='add'>
      <form className='form' onSubmit={handleSubmit}>
        <div>
          <label htmlFor='positions-select'>Название</label>
          <input
            autoComplete='off'
            className='mginput'
            id='hrs-input'
            list='hrs'
            name='text'
            type='text'
          />
        </div>
        <button className='menu__link'>Добавить</button>
      </form>
    </div>
  )
};
