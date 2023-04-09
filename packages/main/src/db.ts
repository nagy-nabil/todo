import {resolve} from 'node:path';
import fs from 'fs/promises';
import {v4 as uuidv4} from 'uuid';
// import {type Database, verbose} from 'sqlite3';
import type {Task, DbSchema} from '../../../types/db';
// const sqlite3 = verbose();

//! current db location is cwd change it later
/**
 * if db already exist won't do shit, if not exist create file called "mock-db.json"
 * @param path default cwd
 */
// export async function dbConntect(path?: string): Promise<Database> {
//     const dbPath = resolve(path || '', 'mock-db.db');
//     console.log('🪵 file "db.ts" ~  line "9" ~ token ~ \x1b[0;32mdbPath\x1b[0m = ', dbPath);

//     // OPEN_CREATE will open the database or create it if not exist
//     const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, err => {
//         if (err) {
//             console.log(
//                 '🪵 file "db.ts" ~  line "32" ~ token ~ \x1b[0;32merr\x1b[0m = ',
//                 err.message,
//             );
//             throw err;
//         }
//         console.log('connected to database');
//     });
//     return db;
// }

// TODO make path into user data
/**
 * make sure that database exist
 */
export async function dbGurd(_path?: string) {
    //
}

export async function dbRead(path?: string): Promise<DbSchema> {
    const dbPath = resolve(path || '', 'mock-db.json');
    const db = await fs.readFile(dbPath, {
        encoding: 'utf-8',
    });
    return JSON.parse(db) as DbSchema;
}

export async function dbWrite(content: DbSchema, path?: string): Promise<void> {
    const dbPath = resolve(path || '', 'mock-db.json');
    await fs.writeFile(dbPath, JSON.stringify(content, null, 2));
}

/**
 * return list content
 * @param name
 * @returns
 */
export async function listPost(name: string): Promise<DbSchema[string]> {
    const db = await dbRead();
    const id = uuidv4();
    db[id] = {name, checked: false, id, tasks: {}};
    await dbWrite(db);
    return db[name];
}

/**
 * return list content
 * @param listName
 * @param name
 * @returns
 */
export async function taskPost(listID: string, task: string): Promise<DbSchema[string]> {
    const db = await dbRead();
    if (listID in db) {
        const id = uuidv4();
        db[listID]['tasks'][id] = {checked: false, id, name: task};
    } else {
        throw new Error('list name not exist');
    }
    await dbWrite(db);
    return db[listID];
}

// type task but with no id => to not give the user ability to change the id
type TaskNoID = {
    [k in keyof Task]?: k extends 'id' ? never : Task[k];
};
export async function taskUpdate(
    listID: string,
    taskID: DbSchema[string]['tasks'][string]['id'],
    data: TaskNoID,
): Promise<DbSchema[string]['tasks']> {
    const db = await dbRead();
    if (listID in db) {
        db[listID]['tasks'][taskID] = {...db[listID]['tasks'][taskID], ...data};
        console.log(
            "🪵 [db.ts:94] ~ token ~ \x1b[0;32mdb[listID]['tasks'][taskID]\x1b[0m = ",
            db[listID]['tasks'][taskID],
        );
    } else {
        throw new Error('list name not exist');
    }
    await dbWrite(db);
    return db[listID]['tasks'];
}

/**
 * @param listID
 * @returns void
 */
export async function listDelete(listID: string): Promise<void> {
    const db = await dbRead();
    if (listID in db) {
        delete db[listID];
    } else {
        throw new Error('list name not exist');
    }
    await dbWrite(db);
    return;
}

/**
 * return list content
 * @param listID
 * @returns void
 */
export async function taskDelete(listID: string, taskID: string): Promise<void> {
    const db = await dbRead();
    if (listID in db && taskID in db[listID]['tasks']) {
        delete db[listID]['tasks'][taskID];
    } else {
        throw new Error('listID neither taskID exist');
    }
    await dbWrite(db);
    return;
}
