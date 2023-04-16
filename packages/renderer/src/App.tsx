import React, {useRef} from 'react';
import './global.css';
import TaskList from './components/TasksList';

// TODO please choose different way to add the sound
function App() {
    const soundEffect = useRef(new Audio('./assets/checkSound.wav')).current;

    return (
        <div className="App h-screen w-screen bg-base-100 text-base-content">
            <TaskList soundEffect={soundEffect} />
        </div>
    );
}

export default App;
