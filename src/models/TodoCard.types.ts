import { INote } from "./Project.types";
import { IUser } from "./User.types";

export interface ITodoCard {
    id: number;
    title: TTaskStatus;
    tasks: ITask[];
}

export interface ITask {
    id: number;
    status: TTaskStatus;
    title: string;
    desc: string;
    date: IDates;
    notes: INote[];
    isFixed: boolean;
    subtasks: ITask[];
    comments: IComment[];
}


export interface IDates {
    creation: string;
    completion: string;
    change: string;
}


export type TTaskStatus = "queue" | "development" | "done";

export interface IComment {
    id: number;
    user: IUser;
    text: string;
    comments: IComment[];
    likes: number;
    date: IDates;
}

