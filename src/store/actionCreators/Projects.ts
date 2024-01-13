import { createAction } from "@reduxjs/toolkit";
import { ICards, INote, IProject } from "models/Project.types";
import { IOption } from "models/Select.types";
import { IComment, ITask, TTaskStatus } from "models/TodoCard.types";
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


export const updateTasks = createAction<ITasksUpdate, "projects/updateTasks">("projects/updateTasks")

export interface ITasksUpdate {
    projectId: number;
    cardTitle: TTaskStatus;
    tasks: ITask[];
}

export const updateTask = createAction<ITaskUpdate, "projects/updateTask">("projects/updateTask")


export interface ITaskUpdate {
    projectId: number;
    
    taskId: number;
    newTask: ITask;
}


export const updateTaskComments = createAction<ITaskCommentsUpdate, "projects/updateTaskComments">("projects/updateTaskComments")


export interface ITaskCommentsUpdate {
    projectId: number;
    taskId: number;
    comments: IComment[];
}



export const updateTaskComment = createAction<ITaskCommentUpdate, "projects/updateTaskComment">("projects/updateTaskComment")


export interface ITaskCommentUpdate {
    projectId: number;
    taskId: number;
    commentId: number;
    newComment: IComment;
}


export const updateTaskCommentLikes = createAction<ITaskCommentLikesUpdate, "projects/updateTaskCommentLikes">("projects/updateTaskCommentLikes")


export interface ITaskCommentLikesUpdate {
    projectId: number;
    taskId: number;
    commentId: number;
    newCommentLikes: IUser[];
}

