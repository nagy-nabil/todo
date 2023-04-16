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

export function createTaskMenu(listID: string, todoID: string): void {
    ipcRenderer.send('create-task-menu', listID, todoID);
}

export function createListMenu(listID: string): void {
    ipcRenderer.send('create-list-menu', listID);
}

type IpcRendererEventHandler = (event: Electron.IpcRendererEvent, ...args: any[]) => void;
export function registerPlaySoundHandler(listner: IpcRendererEventHandler): void {
    ipcRenderer.on('play-sound', listner);
}
