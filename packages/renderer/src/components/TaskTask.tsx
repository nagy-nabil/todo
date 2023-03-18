import React from 'react';
import {type Task} from '../../../../types/db';
import Todo from './Todo';

const TaskTask: React.FC<{listName: string; tasks: Task[]}> = ({
    listName,
    tasks,
}) => {
    return (
        <div className="flex flex-col text-slate-300 p-3 bg-slate-700 w-full h-screen gap-y-3">
            <h1 className="text-5xl mb-3">{listName}</h1>
            <div className="flex flex-col flex-1 gap-y-3 overflow-y-auto border-b border-white/20 -mr-2">
                {tasks.map(task => {
                    return (
                        <Todo todo={task} key={task.id}/>
                    );
                })}
            </div>
            <button className="p-2 w-full hover:bg-slate-500 ">Add a task</button>
        </div>
    );
};

export default TaskTask;
