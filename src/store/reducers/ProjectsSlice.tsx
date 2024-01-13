
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {ICards, IProject} from '../../models/Project.types'
import { IProjectImportantUpdate, IProjectNotesUpdate, ITaskCommentLikesUpdate, ITaskCommentsUpdate, ITaskCommentUpdate, ITasksUpdate, ITaskUpdate, updateProject, updateProjectImportant, updateProjectNotes, updateTask, updateTaskComment, updateTaskCommentLikes, updateTaskComments, updateTasks } from "store/actionCreators/Projects";
import { IComment, ITask, TTaskStatus } from "models/TodoCard.types";

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
            const {tasks, projectId, cardTitle} = action.payload;
            const project = state.projects.find((project) => project.id === projectId);
            const projectTasks: ICards | undefined = project?.tasks
            if (projectTasks) {
                for (let key in projectTasks) {
                    if (key === cardTitle && project) {
                        project.tasks[key] = tasks
                    }
                    
                }
            }
        })


        builder.addCase(updateTask, (state, action: PayloadAction<ITaskUpdate>) => {
            const {taskId, projectId, newTask} = action.payload;
            const project: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
            const projectTasks: ICards | undefined = project?.tasks

            
            
            
            if (project) {
                for (let key in projectTasks) {
                
                    const task = project?.tasks[key as TTaskStatus].find((task: ITask) => task.id === taskId);
                

                    if (task) {
                        task.desc = newTask.desc;
                        task.notes = newTask.notes;
                        task.title = newTask.title;
                        task.subtasks = newTask.subtasks;
                        task.date.completion = newTask.date.completion;
                        task.date.change = newTask.date.change;
                    }
                }
                
            }
        })


        builder.addCase(updateTaskComments, (state, action: PayloadAction<ITaskCommentsUpdate>) => {
            const {taskId, projectId, comments} = action.payload;

            const project: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
            const projectTasks: ICards | undefined = project?.tasks

            
            
            
            if (project) {
                for (let key in projectTasks) {
                
                    const task = project?.tasks[key as TTaskStatus].find((task: ITask) => task.id === taskId);
                

                    if (task) {
                        task.comments = comments
                    }
                }
                
            }
            // const project = state.projects.find((project) => project.id === projectId);
            // let task: ITask | undefined;
            // for (let elem in project?.tasks) {
            //     task = project?.tasks[elem as TTaskStatus].find((task: ITask) => task.id === taskId);

                
            // }
            // if (project && task) {
            //     task.comments = comments;
                
            // }
        })

        
        builder.addCase(updateTaskComment, (state, action: PayloadAction<ITaskCommentUpdate>) => {
            const {taskId, projectId, commentId, newComment} = action.payload;

            const project: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
            const projectTasks: ICards | undefined = project?.tasks

            
            
            
            if (project) {
                for (let key in projectTasks) {
                
                    const task = project?.tasks[key as TTaskStatus].find((task: ITask) => task.id === taskId);
                    const comment = task?.comments.find((comment: IComment) => comment.id === commentId);

                    if (task && comment) {
                        comment.comments = newComment.comments;
                        comment.date.change = newComment.date.change;
                        comment.likes = newComment.likes;
                        comment.text = newComment.text;
                    }
                }
                
            }
            // const project = state.projects.find((project) => project.id === projectId);
            // let task: ITask | undefined;
            // for (let elem in project?.tasks) {
            //     task = project?.tasks[elem as TTaskStatus].find((task: ITask) => task.id === taskId);

                
            // }
            // const comment = task?.comments.find((comment) => comment.id === commentId);

            // if (project && task && comment) {
            //     comment.comments = newComment.comments;
            //     comment.date.change = newComment.date.change;
            //     comment.likes = newComment.likes;
            //     comment.text = newComment.text;
                
            // }
        })

        
        builder.addCase(updateTaskCommentLikes, (state, action: PayloadAction<ITaskCommentLikesUpdate>) => {
            const {taskId, projectId, commentId, newCommentLikes} = action.payload;

            const project: IProject | undefined = state.projects.find((project: IProject) => project.id === projectId);
            const projectTasks: ICards | undefined = project?.tasks

            
            
            
            if (project) {
                for (let key in projectTasks) {
                
                    const task = project?.tasks[key as TTaskStatus].find((task: ITask) => task.id === taskId);
                    const comment = task?.comments.find((comment: IComment) => comment.id === commentId);

                    if (task && comment) {
                        comment.likes = newCommentLikes;
                        
                    }
                }
                
            }
            // const project = state.projects.find((project) => project.id === projectId);
            // let task: ITask | undefined;
            // for (let elem in project?.tasks) {
            //     task = project?.tasks[elem as TTaskStatus].find((task: ITask) => task.id === taskId);

                
            // }
            // const comment = task?.comments.find((comment) => comment.id === commentId);

            // if (project && task && comment) {
            //     comment.likes = newCommentLikes;
                
                
            // }
        })
        
    },
})


export default ProjectsSlice.reducer;

export const {
    setProjects,
    
} = ProjectsSlice.actions

