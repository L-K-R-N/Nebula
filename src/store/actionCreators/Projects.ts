import { createAction } from "@reduxjs/toolkit";

export interface IProjectUpdate {
    projectId: number;
    newTitle: string;
    newDesc: string;
    newNotes: string[];
    isImportant: boolean;
}

export const updateProject = createAction<IProjectUpdate, "projects/updateProject">("projects/updateProject")


export interface IImportantUpdate {
    projectId: number;
    isImportant: boolean;
}

export const updateImportant = createAction<IImportantUpdate, "projects/updateImportant">("projects/updateImportant")