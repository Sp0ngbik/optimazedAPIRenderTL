import React, {useEffect} from 'react';
import './app.module.css';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {getTodoListsTK, T_TodoListInitial} from "../redux/reducers/todoList_reducer";
import AddNewTodo from "../components/AddNewTodo/AddNewTodo";
import {TodoLists} from "../components/TodoList/TodoLists";
import style from './app.module.css'
import Notification from "../helpers/notification/Notification";
import LoadingScale from "../helpers/loadingScale/LoadingScale";

export type T_FilterValues = 'all' | 'completed' | 'inProgress'

const AppTodoList = React.memo(() => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(getTodoListsTK())
    }, [dispatch]);
    const todoListsData: T_TodoListInitial[] = useAppSelector(data => data.todoList_reducer)
    return (
        <div>
            <LoadingScale/>
            <AddNewTodo/>
            <div className={style.allTodosWrapper}>
                {todoListsData.map(tl => (
                    <div key={tl.id}>
                        <TodoLists title={tl.title} todoListId={tl.id} filter={tl.filter}
                                   entityStatus={tl.entityStatus}/>
                    </div>
                ))}
            </div>
            <Notification/>
        </div>
    );
})

export default AppTodoList;
