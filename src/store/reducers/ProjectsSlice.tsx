
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IProject} from '../../models/Project.types'
import { IProjectImportantUpdate, IProjectNotesUpdate, ITaskCommentsUpdate, ITaskCommentUpdate, ITasksUpdate, ITaskUpdate, updateProject, updateProjectImportant, updateProjectNotes, updateTask, updateTaskComment, updateTaskComments, updateTasks } from "store/actionCreators/Projects";

interface IProjectsState {
    projects: IProject[];
}

const initialState: IProjectsState = {
    projects: [],
}

export const ProjectsSlice = createSlice({
    initialState: initialState,
    name: 'ProjectsSlice',
    reducers: {
        setProjects: (state, action: PayloadAction<IProject[]>) => {
            state.projects = action.payload;
        },
        
        // setProject: (state, action: PayloadAction<IProject>) => {
        //     // state.projects
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(updateProject, (state, action: PayloadAction<IProject>) => {
            const {id, title, desc, notes} = action.payload;
            const project = state.projects.find((project) => project.id === id);
            if (project) {
                
                project.title = title;
                project.desc = desc;
                project.notes = notes;
            }
        })


        builder.addCase(updateProjectImportant, (state, action: PayloadAction<IProjectImportantUpdate>) => {
            const {isImportant, projectId} = action.payload;
            const project = state.projects.find((project) => project.id === projectId);
            if (project) {
                project.isImportant = isImportant;
            }
        })


        builder.addCase(updateProjectNotes, (state, action: PayloadAction<IProjectNotesUpdate>) => {
            const {notes, projectId} = action.payload;
            const project = state.projects.find((project) => project.id === projectId);
            if (project) {
                project.notes = notes;
            }
        })


        builder.addCase(updateTasks, (state, action: PayloadAction<ITasksUpdate>) => {
            const {tasks, projectId} = action.payload;
            const project = state.projects.find((project) => project.id === projectId);
            if (project) {
                project.tasks = tasks;
            }
        })


        builder.addCase(updateTask, (state, action: PayloadAction<ITaskUpdate>) => {
            const {taskId, projectId, newTask} = action.payload;
            const project = state.projects.find((project) => project.id === projectId);
            const task = project?.tasks.find((task) => task.id === taskId)
            if (project && task) {
                task.comments = newTask.comments;
                task.desc = newTask.desc;
                task.notes = newTask.notes;
                task.status = newTask.status;
                task.title = newTask.title;
                task.subtasks = newTask.subtasks;
                task.date.completion = newTask.date.completion;
                task.date.change = newTask.date.change;
            }
        })


        builder.addCase(updateTaskComments, (state, action: PayloadAction<ITaskCommentsUpdate>) => {
            const {taskId, projectId, comments} = action.payload;
            const project = state.projects.find((project) => project.id === projectId);
            const task = project?.tasks.find((task) => task.id === taskId)
            if (project && task) {
                task.comments = comments;
                
            }
        })

        
        builder.addCase(updateTaskComment, (state, action: PayloadAction<ITaskCommentUpdate>) => {
            const {taskId, projectId, commentId, newComment} = action.payload;
            const project = state.projects.find((project) => project.id === projectId);
            const task = project?.tasks.find((task) => task.id === taskId);
            const comment = task?.comments.find((comment) => comment.id === commentId);

            if (project && task && comment) {
                comment.comments = newComment.comments;
                comment.date.change = newComment.date.change;
                comment.likes = newComment.likes;
                comment.text = newComment.text;
                
            }
        })
        
    },
})


export default ProjectsSlice.reducer;

export const {
    setProjects,
    
} = ProjectsSlice.actions

