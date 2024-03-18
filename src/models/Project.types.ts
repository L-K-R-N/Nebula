import { UniqueIdentifier } from '@dnd-kit/core';
import { IOption } from './Select.types';
import { IUser } from './User.types';

export interface IProject {
   id: number;
   title: string;
   desc: string | undefined;
   date: Date;
   notes: INote[];
   isImportant: boolean;
   cards: ITodoCard[];
}

export interface ITodoCard {
   id: UniqueIdentifier;
   title: string;
   tasks: ITask[];
}

export interface ITask {
   id: UniqueIdentifier;
   title: string;
   desc: string;
   date: IDates;
   notes: INote[];
   isFixed: boolean;
   subtasks: ITask[];
   comments: IComment[];
}

export interface IDates {
   creation: Date;
   completion: Date;
   change: Date;
}

export interface IComment {
   id: number;
   user: IUser;
   text: string;
   comments: IComment[];
   likes: IUser[];
   date: IDates;
}

export type TTodoCardInputs = Pick<ITodoCard, 'title'>;

// export interface ICards {
//     queue: ITask[];
//     development: ITask[];
//     done: ITask[];
// }

export interface INote extends IOption {
   id?: number;
}

export type TProjectInputs = Pick<IProject, 'title' | 'desc' | 'notes'>;

export type TTaskInputs = Pick<ITask, 'title' | 'desc' | 'notes' | 'date'>;

// export interface Inputs {
//     title: string;
//     desc: string;
//     notes: INote[]
// }
