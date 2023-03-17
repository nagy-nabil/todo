export type Step = {
    id: number;
    task: string;
    checked: boolean;
    createAt: Date;
};

export type Task = {
    name: string;
    checked: boolean;
    steps: Step[];
};

export type List = {
    name: string;
    tasks: Task[];
};


export type DbSchema = List[];
