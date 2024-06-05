import React from "react";

export const AddVacancyModal = () => {
    return (
        <div className='add'>
                    <form className='form'>
                        <p>
                            Номер штатной единицы: 
                            <b
                                className='js-id'
                                title='5468a9c0-5c0f-3c8e-e4c8-2927965388b8'
                                data-id='5468a9c0-5c0f-3c8e-e4c8-2927965388b8'>
                                5468a9c0
                            </b>
                        </p>
                        <p>
                            <label htmlFor='positions-select'>Должность:</label>
                            <select name='positions' id='positions-select'>
                                <option value='none' />
                                <option value='hr'>
                                    Сотрудник отдела кадров
                                </option>
                                <option value='backend-developer'>
                                    Бэкенд-разработчик
                                </option>
                                <option value='frontend-developer'>
                                    Фронтенд-разработчик
                                </option>
                                <option value='teamlead'>Тимлид</option>
                                <option value='devops'>DevOps инженер</option>
                                <option value='qa'>
                                    Инженер по тестированию
                                </option>
                                <option value='design'>Дизайнер</option>
                            </select>
                        </p>
                        <p>
                            <label htmlFor='positions-select'>
                                Описание вакансии:
                            </label>
                            <textarea
                                name='description'
                                id='description-textarea'
                                cols={80}
                                rows={10}
                                defaultValue={''}
                            />
                        </p>
                        <button type='submit'>Добавить</button>
                    </form>
                </div>
    )
};