import React, {RefObject, useRef, useState} from 'react';
import {useAppDispatch} from "../../hooks/hooks";
import {addNewTodoListTK} from "../../redux/reducers/todoList_reducer";
import style from './addNewTodo.module.css'

const AddNewTodo = () => {
    const newTitleForTodoList: RefObject<HTMLInputElement> = useRef(null)
    const [errorStatus, setErrorStatus] = useState(false)
    const dispatch = useAppDispatch()
    const addNewTodoList = () => {
        if (newTitleForTodoList.current && !errorStatus) {
            dispatch(addNewTodoListTK(newTitleForTodoList.current.value))
            newTitleForTodoList.current.value = ''
        }
    }
    const onChangeHandler = () => {
        newTitleForTodoList.current?.value.trim() ? setErrorStatus(false) : setErrorStatus(true)
    }

    return (
        <div className={style.newTodoWrapper}>
            <div className={style.newTodoBlock}>
                <input ref={newTitleForTodoList} onChange={onChangeHandler} className={errorStatus ? style.error : ''}/>
                <button onClick={addNewTodoList}>+</button>
                {errorStatus && <p className={style.errorText}>Wrong value!</p>}
            </div>
        </div>
    );
};

export default AddNewTodo;