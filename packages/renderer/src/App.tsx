import React, {useEffect, useState} from 'react';
import './global.css';
import TaskList from './components/TasksList';
import {dbRead} from '#preload';
import {type DbSchema} from '../../../types/db';

function App() {
    const [list, setList] = useState<DbSchema | null>(null);
    useEffect(() => {
        const db = async () => {
            setList(await dbRead());
        };
        db();
    });
    return <div className="App">{list !== null ? <TaskList tasksList={list} /> : 'lodaing'}</div>;
}

export default App;
