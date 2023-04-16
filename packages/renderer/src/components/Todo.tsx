import React, {useState, useRef, useEffect} from 'react';
import {type Task} from '../../../../types/db';
import {createTaskMenu, taskUpdate} from '#preload';

const Todo: React.FC<{listID: string; todo: Task; soundEffect: HTMLAudioElement}> = ({
    listID,
    todo,
    soundEffect,
}) => {
    const [checked, setChecked] = useState<boolean>(todo.checked);
    const [isChanging, setIsChanging] = useState<boolean>(false);
    // state to control is the todo p or input
    const [statusEditing, setStatusEditing] = useState<boolean>(false);

    // to reference the input when created to focus it
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (statusEditing && inputRef.current !== null) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [statusEditing]);

    return (
        <div
            key={todo.id}
            className="flex flex-row gap-x-2 hover:bg-slate-500 w-4/5 bg-neutral p-3 rounded-md"
            onContextMenu={e => {
                e.preventDefault();
                createTaskMenu(listID, todo.id);
            }}
        >
            <input
                className="mr-2 w-4 h-4 text-accent bg-accent border-gray-300 rounded-lg focus:ring-red-500  focus:ring-2 "
                type="checkbox"
                value={todo.id}
                disabled={isChanging}
                defaultChecked={checked}
                onChange={async () => {
                    setIsChanging(true);
                    // because setChecked will affect the state in the next render cycle, so cannot use "checked" new value directly here
                    await taskUpdate(listID, todo['id'], {checked: !checked});
                    // was false means you switched to true
                    if (checked === false) {
                        soundEffect.play();
                    }
                    setChecked(prev => !prev);
                    setIsChanging(false);
                }}
            />
            {statusEditing ? (
                <input
                    className="input-text-primary w-full"
                    defaultValue={todo.name}
                    type="text"
                    ref={inputRef}
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
                    className="w-full"
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
