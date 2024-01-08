import { IOption } from "./Select.types";
import { ITask } from "./TodoCard.types";

export interface IProject {
    id: number;
    title: string;
    desc: string;
    date: string;
    notes: INote[];
    isImportant: boolean;
    tasks: ITask[]
}

export interface Inputs {
    title: string;
    desc: string;
    notes: INote[]
}

export interface INote extends IOption{
    id: number;
}