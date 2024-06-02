import React, { FC } from "react";
import { useAppDispatch } from "../../hooks/use-app-dispatch";
import { deleteTodo } from "../../api/api-actions";
import { ToDo } from "../../store/app-data";

type Props = {
    todo: ToDo
}

export const TodoItem: FC<Props> = ({ todo }) => {
    const dispatch = useAppDispatch();
    const { id, text: title } = todo;
    const handleClick = () => dispatch(deleteTodo({ id }))

    return (
        <li className="todo-element">
            <p className="todo-title">{title}</p>
            <button onClick={handleClick}>Удалить</button>
        </li>
    )
}