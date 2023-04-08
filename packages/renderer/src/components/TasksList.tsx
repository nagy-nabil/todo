import React, {useState} from 'react';
import {type DbSchema} from '../../../../types/db';
import {listPost} from '#preload';
import listIcon from '../../assets/list.svg';
import TaskTask from './TaskTask';
// sidebar
const TaskList: React.FC<{tasksList: DbSchema}> = ({tasksList}) => {
    const [smolBtnVisible, setSmolBtnVisible] = useState<boolean>(false);
    const [tab, setTab] = useState<string>('');
    return (
        <div className="flex flex-row rounded-md">
            <button
                className="w-5 h-3 md:hidden lg:hidden"
                onClick={() => {
                    setSmolBtnVisible(prev => !prev);
                }}
            >
                |||
            </button>
            <div
                className={
                    (smolBtnVisible ? ' ' : 'hidden ') +
                    'resize-x h-screen min-w-1/3 bg-gray-900 text-slate-400 p-2 md:flex md:flex-col lg:w-1/5'
                }
            >
                <h1 className="m-3 text-lg">Welcome Baby this your list</h1>
                <input
                    type="text"
                    className="p-2"
                    placeholder="Search"
                />
                <div className="flex flex-col flex-1 overflow-y-auto border-b border-white/20 -mr-2">
                    {Object.entries(tasksList).map(list => {
                        // 0 => id, 1=> list
                        return (
                            <button
                                className="flex flex-row p-2 my-3 w-full text-left hover:bg-slate-500"
                                key={list[0]}
                                value={list[1].id}
                                onClick={e => {
                                    setTab((e.target as HTMLButtonElement).value);
                                }}
                            >
                                <img
                                    src={listIcon}
                                    alt="list icon"
                                    className="w-3 h-3 m-2"
                                />
                                {list[1].name}
                            </button>
                        );
                    })}
                </div>
                <form
                    className="add-task flex "
                    onSubmit={async e => {
                        e.preventDefault();
                        // Read the form data
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);

                        // Or you can work with it as a plain object:
                        const formJson = Object.fromEntries(formData.entries());
                        await listPost(formJson['name'] as string);
                        // Clear the input field
                        const input = form.querySelector('input[name="name"]') as HTMLInputElement;
                        input.value = '';
                    }}
                >
                    <input
                        name="name"
                        type="text"
                        placeholder="New Task Name"
                    />
                    <button
                        type="submit"
                        className="p-2 w-full hover:bg-slate-500 "
                    >
                        Add List
                    </button>
                </form>
            </div>
            <TaskTask list={tasksList[tab] || null} />
        </div>
    );
};

export default TaskList;
