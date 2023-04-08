export type Task = {
    id: string;
    name: string;
    checked: boolean;
};

export type List = {
    id: string;
    checked: boolean;
    name: string;
    tasks: {[k: string]: Task};
};

export type DbSchema = {[k: List['id']]: List};
