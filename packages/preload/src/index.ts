/**
 * @module preload
 */

import {ipcRenderer} from 'electron';

export {versions} from './versions';
export {dbRead, dbWrite, listPost, taskPost, taskUpdate} from './dbApi';

export function createTodoMenu(listID: string, todoID: string) {
    ipcRenderer.send('create-menu', listID, todoID);
}
