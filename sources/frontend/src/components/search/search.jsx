import React from "react";

export const Search = ({ setSearch }) => {

  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <section>
      <input
        autoComplete='off'
        className='mginput'
        id='hrs-input'
        list='hrs'
        name='fio'
        type='text'
        placeholder="Поиск"
        onChange={handleChange}
      />
    </section>
  )
}
