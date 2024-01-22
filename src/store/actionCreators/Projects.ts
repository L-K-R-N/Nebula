import { UniqueIdentifier } from "@dnd-kit/core";
import { createAction } from "@reduxjs/toolkit";
import {  INote, IProject } from "models/Project.types";
import { IOption } from "models/Select.types";
import { IComment, ITask, ITodoCard } from "models/Project.types";
import { IUser } from "models/User.types";



export const updateProject = createAction<IProject, "projects/updateProject">("projects/updateProject")




export const updateProjectImportant = createAction<IProjectImportantUpdate, "projects/updateProjectImportant">("projects/updateProjectImportant")

export interface IProjectImportantUpdate {
    projectId: number;
    isImportant: boolean;
}



export const updateProjectNotes = createAction<IProjectNotesUpdate, "projects/updateProjectNotes">("projects/updateProjectNotes")

export interface IProjectNotesUpdate {
    projectId: number;
    notes: INote[];
}


export const updateCards = createAction<ICardsUpdate, "projects/updateCards">("projects/updateCards")

export interface ICardsUpdate {
    projectId: number;
    newCards: ITodoCard[];
}

export const updateCard = createAction<ICardUpdate, "projects/updateCard">("projects/updateCard")

export interface ICardUpdate {
    projectId: number;
    cardId: UniqueIdentifier;
    newCard: ITodoCard;
}

export const updateTasks = createAction<ITasksUpdate, "projects/updateTasks">("projects/updateTasks")

export interface ITasksUpdate {
    projectId: number;
    cardId: UniqueIdentifier;
    newTasks: ITask[];
}

export const updateTask = createAction<ITaskUpdate, "projects/updateTask">("projects/updateTask")


export interface ITaskUpdate {
    projectId: number;
    cardId: UniqueIdentifier;
    taskId: UniqueIdentifier;
    newTask: ITask;
}


export const updateTaskComments = createAction<ITaskCommentsUpdate, "projects/updateTaskComments">("projects/updateTaskComments")


export interface ITaskCommentsUpdate {
    projectId: number;
    cardId: UniqueIdentifier;

    taskId: UniqueIdentifier;
    newComments: IComment[];
}



export const updateTaskComment = createAction<ITaskCommentUpdate, "projects/updateTaskComment">("projects/updateTaskComment")


export interface ITaskCommentUpdate {
    projectId: number;
    cardId: UniqueIdentifier;
    taskId: UniqueIdentifier;
    commentId: number;
    newComment: IComment;
}


export const updateTaskCommentLikes = createAction<ITaskCommentLikesUpdate, "projects/updateTaskCommentLikes">("projects/updateTaskCommentLikes")


export interface ITaskCommentLikesUpdate {
    projectId: number;
    cardId: UniqueIdentifier;
    taskId: UniqueIdentifier;
    commentId: number;
    newCommentLikes: IUser[];
}

