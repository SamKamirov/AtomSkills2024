import React, { ChangeEvent, FormEvent, Fragment, useState } from "react";
import '../../../public/index.css'
import { useAppDispatch, useAppSelector } from "../../hooks/use-app-dispatch";
import { getTodos } from "../../store/app-data-selectors";
import { TodoItem } from "../../components/todo-element/todo-element";
import { uploadTodo } from "../../api/api-actions";

export const Main = () => {
    const dispatch = useAppDispatch();
    const [inputState, setInputState] = useState({
        title: ''
    })

    const todos = useAppSelector(getTodos);
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputState({
            ...inputState,
            [name]: value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(uploadTodo({ text: inputState.title }));
    }

    return (
        <article className="container">
            <header>
                <h1 className="title">TODO List</h1>
            </header>
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="text" id='title' name='title' onChange={handleChange} />
                    <input type="submit" value='Сохранить' />
                </form>
            </div>
            <ul>
                {todos && todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
            </ul>
        </article>
    )
}