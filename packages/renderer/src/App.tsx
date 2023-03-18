import React from 'react';
import './global.css';
// import Todo from './components/Todo';
import TaskList from './components/TasksList';

function App() {
    return (
        <div className="App">
            <TaskList
                tasksList={[
                    'list one',
                    'lsit two',
                    'list one',
                    'lsit two',
                    'list one',
                    'lsit two',
                    'list one',
                    'lsit two',
                ]}
            />
            {/* <Todo
                todo={{
                    checked: false,
                    createAt: new Date(),
                    id: 21,
                    task: 'task content',
                }}
            /> */}
        </div>
    );
}

export default App;
