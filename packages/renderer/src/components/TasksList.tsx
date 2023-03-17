import React from 'react';
import {type List} from '../../../../types/db';

// sidebar
const TaskList: React.FC<{tasksList: List[]}> = ({tasksList}) => {
    return <div>
        {tasksList.map((list) => {
            return (
                <button className='block' key={list.name}>{list.name}</button>
            );
        })}
    </div>;
};

export default TaskList;
