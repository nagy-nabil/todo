import React from 'react';
import {type List} from '../../../../types/db';
import listIcon from '../../assets/list.svg';
import TaskTask from './TaskTask';
// sidebar
const TaskList: React.FC<{tasksList: List['name'][]}> = ({tasksList}) => {
    return (
        <div className="flex flex-row">
            <div className="hidden h-screen w-1/3 bg-gray-900 text-slate-400 p-2 md:flex md:flex-col lg:w-1/5">
                <h1 className="m-3 text-lg">Welcome Baby this your list</h1>
                <input
                    type="text"
                    className="p-2"
                    placeholder="Search"
                />
                <div className="flex flex-col flex-1 overflow-y-auto border-b border-white/20 -mr-2">
                    {tasksList.map(list => {
                        return (
                            <button
                                className="flex flex-row p-2 my-3 w-full text-left hover:bg-slate-500"
                                key={list}
                            >
                                <img
                                    src={listIcon}
                                    alt="list icon"
                                    className="w-3 h-3 m-2"
                                />
                                {list}
                            </button>
                        );
                    })}
                </div>
                <button className="p-2 w-full hover:bg-slate-500 ">Add List</button>
            </div>
            <TaskTask
                listName="List One"
                tasks={[{checked: true, id: 3, name: 'gfddsfg', steps: []}]}
            />
        </div>
    );
};

export default TaskList;
