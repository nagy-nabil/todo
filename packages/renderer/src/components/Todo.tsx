import React, {useState} from 'react';
import {type Step} from '../../../../types/db';

const Todo: React.FC<{todo: Step}> = ({todo}) => {
    const [checked, setChecked] = useState<boolean>(todo.checked);
    // const [task, setTask] = useState<string>(todo.details);
    return (
        <div key={todo.id}>
            <label>
                <input
                    type="checkbox"
                    value={todo.id}
                    defaultChecked={checked}
                    onChange={() => setChecked(!checked)}
                />
                {todo.task}
                <p>{new Date(todo.createAt).toUTCString()}</p>
            </label>
        </div>
    );
};

export default Todo;
