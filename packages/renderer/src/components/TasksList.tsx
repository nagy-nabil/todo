import React, {useState, useEffect, useMemo} from 'react';
import {distance} from 'fastest-levenshtein';
import {type DbSchema} from '../../../../types/db';
import {listPost, createListMenu, dbRead} from '#preload';
import listIcon from '../../assets/list.svg';
import TaskTask from './TaskTask';

function filterDB(db: DbSchema, query: string): DbSchema {
    // shitty code let's go
    const res: DbSchema = {};
    for (const list in db) {
        if (distance(db[list].name, query) <= 3) {
            res[list] = db[list];
        }
    }
    return res;
}

// sidebar
const TaskList: React.FC = () => {
    const [list, setList] = useState<DbSchema>();
    const [smolBtnVisible, setSmolBtnVisible] = useState<boolean>(false);
    const [focusIndex, setFocusIndex] = useState<null | number>(null);
    const [tab, setTab] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');

    const listShow = useMemo(() => {
        if (list !== undefined && searchQuery === '') {
            return list;
        } else if (list !== undefined) {
            return filterDB(list, searchQuery);
        }
    }, [list, searchQuery]);

    useEffect(() => {
        const db = async () => {
            setList(await dbRead());
        };
        db();
    }, []);

    return (
        <div className="flex flex-col md:flex-row rounded-md">
            <button
                className="w-10 h-3  m-4 md:hidden lg:hidden"
                onClick={() => {
                    setSmolBtnVisible(prev => !prev);
                }}
            >
                |||
            </button>
            <div
                className={
                    (smolBtnVisible ? 'absolute ' : 'hidden ') +
                    'z-50 h-screen min-w-1/3 bg-gray-900 text-slate-400 p-2 mr-5 md:flex md:flex-col lg:w-1/5'
                }
            >
                <button
                    className="w-10 h-3  m-4 md:hidden lg:hidden"
                    onClick={() => {
                        setSmolBtnVisible(prev => !prev);
                    }}
                >
                    |||
                </button>
                <h1 className="m-3 text-lg">Welcome Baby this your list</h1>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);
                        if (list !== undefined && formData.has('searchQuery')) {
                            setSearchQuery(formData.get('searchQuery') as string);
                        } else {
                            throw new Error('filter form not working');
                        }
                    }}
                >
                    <input
                        name="searchQuery"
                        type="text"
                        className="p-2"
                        placeholder="Search"
                    />
                </form>
                <div className="flex flex-col flex-1 overflow-y-auto border-b border-white/20 -mr-2">
                    {/* show lists */}
                    {listShow !== undefined
                        ? Object.entries(listShow).map((list, index) => {
                              // 0 => id, 1=> list
                              return (
                                  <button
                                      className={`flex flex-row p-2 my-3 w-full text-left hover:bg-slate-500 ${
                                          index === focusIndex ? 'border-4 border-red-800' : ''
                                      }`}
                                      key={list[0]}
                                      value={list[1].id}
                                      onClick={e => {
                                          setTab((e.target as HTMLButtonElement).value);
                                          setFocusIndex(index);
                                      }}
                                      onContextMenu={e => {
                                          e.preventDefault();
                                          createListMenu(list[1].id);
                                      }}
                                  >
                                      <img
                                          src={listIcon}
                                          alt="list icon"
                                          className="w-3 h-3 m-2"
                                      />
                                      {list[1].name}
                                  </button>
                              );
                          })
                        : 'loading'}
                </div>
                <form
                    className="add-task flex p-3"
                    onSubmit={async e => {
                        e.preventDefault();
                        // Read the form data
                        const form = e.target as HTMLFormElement;
                        const formData = new FormData(form);

                        // Or you can work with it as a plain object:
                        const formJson = Object.fromEntries(formData.entries());
                        await listPost(formJson['name'] as string);
                        // Clear the input field
                        const input = form.querySelector('input[name="name"]') as HTMLInputElement;
                        input.value = '';
                    }}
                >
                    <input
                        name="name"
                        type="text"
                        placeholder="New Task Name"
                    />
                    <button
                        type="submit"
                        className="p-2 w-full hover:bg-slate-500 "
                    >
                        Add List
                    </button>
                </form>
            </div>
            {list && <TaskTask list={list[tab] || null} />}

            {/* add overlay when sidebar is active on small screens */}
            {smolBtnVisible && (
                <div
                    className="fixed md:hidden top-0 left-0 w-full h-full bg-gray-900 opacity-50 z-20"
                    onClick={() => setSmolBtnVisible(false)}
                />
            )}
        </div>
    );
};

export default TaskList;
