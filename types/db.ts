export type Step = {
    id: number;
    name: string;
    checked: boolean;
};

export type Task = {
    id: number;
    name: string;
    checked: boolean;
    steps: Step[];
};

export type List = {
    name: string;
    tasks: Task[];
};


export type DbSchema = List[];
