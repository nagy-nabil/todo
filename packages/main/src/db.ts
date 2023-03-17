import {resolve} from 'node:path';
import fs from 'fs/promises';
import {type Database, verbose} from 'sqlite3';
import {type DbSchema} from '../../../types/db';
const sqlite3 = verbose();


//! current db location is cwd change it later
/**
 * if db already exist won't do shit, if not exist create file called "mock-db.json"
 * @param path default cwd
 */
export async function dbConntect(path?: string): Promise<Database> {
    const dbPath = resolve(path || '', 'mock-db.db');
    console.log('🪵 file "db.ts" ~  line "9" ~ token ~ \x1b[0;32mdbPath\x1b[0m = ', dbPath);

    // OPEN_CREATE will open the database or create it if not exist
    const db = new sqlite3.Database(dbPath, sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, err => {
        if (err) {
            console.log('🪵 file "db.ts" ~  line "32" ~ token ~ \x1b[0;32merr\x1b[0m = ', err.message);
            throw err;
        }
        console.log('connected to database');
    });
    return db;
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
 * return group content
 * @param name
 * @returns
 */
// export async function groupPost(name: string): Promise<DbSchema[string]> {
//     const db = await dbRead();
//     if (!(name in db)) {
//         db[name] = [];
//         await dbWrite(db);
//     }
//     return db[name];
// }
