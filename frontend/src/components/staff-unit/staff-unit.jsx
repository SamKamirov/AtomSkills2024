import React from 'react';

export const StaffUnit = ({unit}) => {
    return (
        <div className='layout'>
            <div className='panel panel--single panel--colored'>
                <div className='panel-limiter unit-card'>
                    <h2 className='title' data-real-id='MDHt8rRtMuQLacqCu'>
                        Открытая вакансия
                    </h2>
                    <div className='unit-card__wrapper'>
                        <p>Должность: Сотрудник отдела кадров</p>
                        <form action='' className='search' method='GET'>
                            <label htmlFor='hrs=input'>Ответственный HR:</label>
                            <input
                                autoComplete='off'
                                className='mginput'
                                id='hrs-input'
                                list='hrs'
                                name='text'
                                placeholder='Не назначен'
                                type='text'
                            />
                            <datalist id='hrs'>
                                <option className='search__option'>
                                    Эдуард Артемьев
                                </option>
                                <option className='search__option'>
                                    Таисия Максимова
                                </option>
                                <option className='search__option'>
                                    Вера Колобова
                                </option>
                                <option className='search__option'>
                                    Ярослав Соколов
                                </option>
                                <option className='search__option'>
                                    Кира Павлова
                                </option>
                                <option className='search__option'>
                                    Юлия Якушева
                                </option>
                                <option className='search__option'>
                                    Даниил Гурьев
                                </option>
                                <option className='search__option'>
                                    Геннадий Шаров
                                </option>
                                <option className='search__option'>
                                    Матвей Шубин
                                </option>
                                <option className='search__option'>
                                    Ульяна Родионова
                                </option>
                                <option className='search__option'>
                                    София Котова
                                </option>
                                <option className='search__option'>
                                    Арина Гришина
                                </option>
                                <option className='search__option'>
                                    Николай Кабанов
                                </option>
                                <option className='search__option'>
                                    Ксения Анисимова
                                </option>
                            </datalist>
                            <button
                                className='visually-hidden'
                                style={{
                                    display: 'none',
                                }}
                                tabIndex='-1'
                                type='submit'
                            />
                        </form>
                        <p
                            className='unit-card__description'
                            contentEditable='true'
                        />
                    </div>
                    <ul className='unit-card__menu'>
                        <li>
                            <a href='/dashboard'>Назад</a>
                        </li>
                        <li>
                            <a
                                className='unit-card__menu unit-card__menu--save'
                                href='#'>
                                Сохранить
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
