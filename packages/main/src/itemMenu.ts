import {Menu, BrowserWindow, type IpcMainEvent} from 'electron';
import {taskDelete} from './db';

// app.on('browser-window-created', () => {
// });

export const createMenuHandler = (e: IpcMainEvent, listID: string, todoID: string) => {
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
