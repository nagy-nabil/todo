import React, {useState} from 'react';
import {type Task} from '../../../../types/db';
import {createTaskMenu, taskUpdate} from '#preload';

const Todo: React.FC<{listID: string; todo: Task}> = ({listID, todo}) => {
    const [checked, setChecked] = useState<boolean>(todo.checked);
    const [isChanging, setIsChanging] = useState<boolean>(false);
    // state to control is the todo p or input
    const [statusEditing, setStatusEditing] = useState<boolean>(false);
    // const [task, setTask] = useState<string>(todo.details);

    return (
        <div
            key={todo.id}
            className="flex flex-row gap-x-2 hover:bg-slate-500 w-4/5 bg-slate-600 p-3"
            onContextMenu={e => {
                e.preventDefault();
                createTaskMenu(listID, todo.id);
            }}
        >
            <input
                className="mr-2 max-w-full h-fit overflow-x-auto"
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
            {statusEditing ? (
                <input
                    className="w-full"
                    defaultValue={todo.name}
                    type="text"
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            taskUpdate(listID, todo.id, {name: e.currentTarget.value});
                            setStatusEditing(false);
                        }

                        if (e.key === 'Escape') {
                            console.log('ignore new value only return to old and span');
                            setStatusEditing(false);
                        }
                    }}
                />
            ) : (
                <span
                    onClick={() => {
                        setStatusEditing(true);
                    }}
                >
                    {checked ? <del>{todo.name}</del> : todo.name}
                </span>
            )}
            {/* <p>{new Date(todo.createAt).toUTCString()}</p> */}
        </div>
    );
};

export default Todo;
