
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IProject} from '../../models/Project.types'
import { ICardsUpdate, ICardUpdate, IProjectImportantUpdate, IProjectNotesUpdate, ITaskCommentLikesUpdate, ITaskCommentsUpdate, ITaskCommentUpdate, ITasksUpdate, ITaskUpdate, updateCard, updateCards, updateProject, updateProjectImportant, updateProjectNotes, updateTask, updateTaskComment, updateTaskCommentLikes, updateTaskComments, updateTasks } from "store/actionCreators/Projects";
import { IComment, ITask, ITodoCard} from "models/Project.types";

interface IProjectsState {
    projects: IProject[];
    currentProject: IProject | null
}

const initialState: IProjectsState = {
    projects: [],
    currentProject: null
}

export const ProjectsSlice = createSlice({
    initialState: initialState,
    name: 'ProjectsSlice',
    reducers: {
        setProjects: (state, action: PayloadAction<IProject[]>) => {
            state.projects = action.payload;
        },
        setCurrentProject: (state, action: PayloadAction<IProject>) => {
            state.currentProject = action.payload;
        },
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


        builder.addCase(updateCards, (state, action: PayloadAction<ICardsUpdate>) => {
            const {newCards, projectId} = action.payload;
            const project = state.projects.find((project) => project.id === projectId);

            if (project) {
                project.cards = newCards
            }
        })


        builder.addCase(updateCard, (state, action: PayloadAction<ICardUpdate>) => {
            const {cardId, projectId, newCard} = action.payload;

            const project: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
            const card = project?.cards.find((card: ITodoCard) => card.id === cardId);

            if (project && card) {
                card.title = newCard.title;
                card.tasks = newCard.tasks;
            }
        })


        builder.addCase(updateTasks, (state, action: PayloadAction<ITasksUpdate>) => {
            const {newTasks, projectId, cardId} = action.payload;
            const project = state.projects.find((project) => project.id === projectId);
            const card = project?.cards.find((card: ITodoCard) => card.id === cardId);
            if (project && card) {
                card.tasks = newTasks
              
            }
        })


        builder.addCase(updateTask, (state, action: PayloadAction<ITaskUpdate>) => {
            const {projectId, cardId, taskId, newTask} = action.payload;
            const project: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
            const card = project?.cards.find((card: ITodoCard) => card.id === cardId);
            const task = card?.tasks.find((task: ITask) => task.id === taskId);
            
            
            
            if (project && card && task) {
                task.desc = newTask.desc;
                task.notes = newTask.notes;
                task.title = newTask.title;
                task.subtasks = newTask.subtasks;
                task.date.completion = newTask.date.completion;
                task.date.change = newTask.date.change;
                
                
            }
        })


        builder.addCase(updateTaskComments, (state, action: PayloadAction<ITaskCommentsUpdate>) => {
            const {projectId, cardId, taskId, newComments} = action.payload;

            const project: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
            const card = project?.cards.find((card: ITodoCard) => card.id === cardId);
            const task = card?.tasks.find((task: ITask) => task.id === taskId);
            
            if (project && card && task) {
                task.comments = newComments
                
            }
            
        })

        
        builder.addCase(updateTaskComment, (state, action: PayloadAction<ITaskCommentUpdate>) => {
            const {projectId, cardId, taskId, commentId, newComment} = action.payload;

            const project: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
            const card = project?.cards.find((card: ITodoCard) => card.id === cardId);
            const task = card?.tasks.find((task: ITask) => task.id === taskId);
            const comment = task?.comments.find((comment: IComment) => comment.id === commentId);
            
            if (project && card && task && comment) {
                comment.comments = newComment.comments;
                comment.date.change = newComment.date.change;
                comment.likes = newComment.likes;
                comment.text = newComment.text;
            }


            
        })

        
        builder.addCase(updateTaskCommentLikes, (state, action: PayloadAction<ITaskCommentLikesUpdate>) => {
            const {projectId, cardId, taskId, commentId, newCommentLikes} = action.payload;

            const project: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
            const card = project?.cards.find((card: ITodoCard) => card.id === cardId);
            const task = card?.tasks.find((task: ITask) => task.id === taskId);
            const comment = task?.comments.find((comment: IComment) => comment.id === commentId);
            
            if (project && card && task && comment) {
                comment.likes = newCommentLikes;
            }
            
        })
        
    },
})


export default ProjectsSlice.reducer;

export const {
    setProjects,
    setCurrentProject,
    
} = ProjectsSlice.actions

