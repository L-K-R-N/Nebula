export interface ITodoCard {
    id: number;
    title: string;
    tasks?: ITask[];
}

export interface ITask {
    id: number;
    title: string;
    desc: string;
    date: string;
    notes?: string[];
    isFixed: boolean;
    subtasks?: ITask[];
    comments?: IComment[];
}

export interface IComment {
    id: number;
    title: string;
    text: string;
    comments?: IComment[];
}