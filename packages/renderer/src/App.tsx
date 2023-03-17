import React, {useState} from 'react';
import {versions} from '#preload';
import './global.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App bg-slate-900">
      <div>
        <a
          className='text-lg'
          href="https://vitejs.dev"
          target="_blank"
          rel="noreferrer"
        >
          vite
        </a>
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noreferrer"
        ></a>
      </div>
      <h1 className="text-6xl text-gray-800">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <p>
        we are using versions node-{versions.node} chrome-{versions.chrome} electron-
        {versions.electron}
      </p>
    </div>
  );
}

export default App;
