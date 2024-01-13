import { IOption } from "./Select.types";
import { ITask } from "./TodoCard.types";

export interface IProject {
    id: number;
    title: string;
    desc: string;
    date: Date;
    notes: INote[];
    isImportant: boolean;
    tasks: ICards
}

export interface ICards {
    queue: ITask[];
    development: ITask[];
    done: ITask[];
}

export interface Inputs {
    title: string;
    desc: string;
    notes: INote[]
}

export interface INote extends IOption{
    id: number;
}