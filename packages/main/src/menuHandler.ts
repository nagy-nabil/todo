import {Menu, BrowserWindow, type IpcMainEvent} from 'electron';
import {taskDelete, listDelete} from './db';

export const createListItemMenu = (e: IpcMainEvent, listID: string) => {
    console.log('in main');

    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: 'edit',
            click() {
                console.log(`edit ${listID}`);
            },
        },
        {type: 'separator'},
        {
            label: 'delete',
            click() {
                console.log(`delete ${listID}`);
                listDelete(listID);
            },
        },
    ];
    const menu = Menu.buildFromTemplate(template);
    menu.popup({window: BrowserWindow.fromWebContents(e.sender) as BrowserWindow});
};

export const createTaskItemMenu = (e: IpcMainEvent, listID: string, todoID: string) => {
    console.log('in main');

    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: 'edit',
            click() {
                console.log(`edit ${todoID}`);
            },
        },
        {
            label: 'delete',
            click() {
                console.log(`delete ${todoID}`);
                taskDelete(listID, todoID);
            },
        },
    ];
    const menu = Menu.buildFromTemplate(template);
    menu.popup({window: BrowserWindow.fromWebContents(e.sender) as BrowserWindow});
};
