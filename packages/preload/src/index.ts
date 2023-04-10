/**
 * @module preload
 */

import {ipcRenderer} from 'electron';

export {versions} from './versions';

export {
    dbRead,
    dbWrite,
    listPost,
    taskPost,
    taskUpdate,
    listDelete,
    listUpdate,
    taskDelete,
} from '../../main/src/db';

export function createTaskMenu(listID: string, todoID: string) {
    ipcRenderer.send('create-task-menu', listID, todoID);
}

export function createListMenu(listID: string) {
    ipcRenderer.send('create-list-menu', listID);
}
