import React, {useState} from 'react';
import {type DbSchema} from '../../../../types/db';
import Todo from './Todo';
import {taskPost, listUpdate} from '#preload';

const TaskTask: React.FC<{list: DbSchema[string] | null}> = ({list}) => {
    // state to control is the list name h1 or input for edit
    const [nameStatusEditing, setNameStatusEditing] = useState<boolean>(false);

    if (list === null) {
        return <>such an empty</>;
    } else
        return (
            <div className="flex flex-col text-slate-300 p-3 bg-slate-700 w-full h-screen gap-y-3">
                {/* edit show input else show h1 */}
                {nameStatusEditing ? (
                    <input
                        defaultValue={list.name}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                listUpdate(list.id, {name: e.currentTarget.value});
                                setNameStatusEditing(false);
                            }

                            if (e.key === 'Escape') {
                                console.log('ignore new value only return to old and h1');
                                setNameStatusEditing(false);
                            }
                        }}
                    />
                ) : (
                    <h1
                        className="text-5xl p-4 mb-3 hover:bg-slate-900"
                        onClick={() => setNameStatusEditing(true)}
                    >
                        {list.name}
                    </h1>
                )}
                <div className="todos flex flex-col flex-1  gap-y-3 overflow-y-auto items-center  border-b border-white/20 -mr-2">
                    {Object.entries(list.tasks).map(task => {
                        return (
                            <Todo
                                listID={list.id}
                                key={task[0]}
                                todo={task[1]}
                            />
                        );
                    })}
                </div>
                <form
                    className=""
                    onSubmit={async e => {
                        e.preventDefault();
                        const form = Object.fromEntries(
                            new FormData(e.target as HTMLFormElement).entries(),
                        );
                        if (form['task-name'] === '') return;
                        await taskPost(list.id, form['task-name'] as string);
                    }}
                >
                    <input
                        type="text"
                        name="task-name"
                    />
                    <button
                        className="p-2 w-full hover:bg-slate-500 "
                        type="submit"
                    >
                        Add a task
                    </button>
                </form>
            </div>
        );
};

export default TaskTask;
