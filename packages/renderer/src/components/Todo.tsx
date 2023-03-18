import React, {useState} from 'react';
import {type Step} from '../../../../types/db';

const Todo: React.FC<{todo: Step}> = ({todo}) => {
    const [checked, setChecked] = useState<boolean>(todo.checked);
    // const [task, setTask] = useState<string>(todo.details);
    return (
        <label
            key={todo.id}
            className="flex flex-row gap-x-2 hover:bg-slate-500 w-4/5 bg-slate-600 p-3"
        >
            <input
                type="checkbox"
                value={todo.id}
                defaultChecked={checked}
                onChange={() => setChecked(!checked)}
            />
            {checked? <del>{todo.name}</del> : todo.name}
            {/* <p>{new Date(todo.createAt).toUTCString()}</p> */}
        </label>
    );
};

export default Todo;
