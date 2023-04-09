import React, {useState} from 'react';
import {type Task} from '../../../../types/db';
import {createTodoMenu, taskUpdate} from '#preload';

const Todo: React.FC<{listID: string; todo: Task}> = ({listID, todo}) => {
    const [checked, setChecked] = useState<boolean>(todo.checked);
    const [isChanging, setIsChanging] = useState<boolean>(false);
    // const [task, setTask] = useState<string>(todo.details);

    return (
        <label
            key={todo.id}
            className="flex flex-row gap-x-2 hover:bg-slate-500 w-4/5 bg-slate-600 p-3"
            onContextMenu={e => {
                e.preventDefault();
                createTodoMenu(listID, todo.id);
            }}
        >
            <input
                type="checkbox"
                value={todo.id}
                disabled={isChanging}
                defaultChecked={checked}
                onChange={async () => {
                    setIsChanging(true);
                    await taskUpdate(listID, todo['id'], {checked: !checked});
                    setChecked(!checked);
                    setIsChanging(false);
                }}
            />
            {checked ? <del>{todo.name}</del> : todo.name}
            {/* <p>{new Date(todo.createAt).toUTCString()}</p> */}
        </label>
    );
};

export default Todo;
