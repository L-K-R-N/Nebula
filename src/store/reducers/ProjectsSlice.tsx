
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {IProject} from '../../models/Project.types'
import { IImportantUpdate, IProjectUpdate, updateImportant, updateProject } from "store/actionCreators/Projects";

interface IProjectsState {
    projects: IProject[];
}

const initialState: IProjectsState = {
    projects: [
        {id: 1, title: 'Dao-do-list', desc: 'ато очень интересное тестовое задание', notes: ['React', 'TypeScript'], date: '10.03.2023', isImportant: true},
        {id: 2, title: 'Ao-do-list', desc: 'Рто очень интересное тестовое задание', notes: ['React', 'TypeScript'], date: '10.03.2023', isImportant: true},
        {id: 3, title: 'To-do-list', desc: 'Это очень интересное тестовое задание', notes: ['React', 'TypeScript'], date: '10.03.2023', isImportant: false},
    ],
}

export const ProjectsSlice = createSlice({
    initialState: initialState,
    name: 'ProjectsSlice',
    reducers: {
        setProjects: (state, action: PayloadAction<IProject[]>) => {
            state.projects = action.payload;
        },
        
        setProject: (state, action: PayloadAction<IProject>) => {
            // state.projects
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateProject, (state, action: PayloadAction<IProjectUpdate>) => {
            const {projectId, newTitle, newDesc, newNotes, isImportant} = action.payload;
            const project = state.projects.find((project) => project.id === projectId);
            if (project) {
                project.title = newTitle;
                project.desc = newDesc;
                project.notes = newNotes;
                project.isImportant = isImportant;
            }
        })
        builder.addCase(updateImportant, (state, action: PayloadAction<IImportantUpdate>) => {
            const {isImportant, projectId} = action.payload;
            const project = state.projects.find((project) => project.id === projectId);
            if (project) {
                project.isImportant = isImportant;
            }
        })
        
    },
})


export default ProjectsSlice.reducer;

export const {
    setProjects,
    
} = ProjectsSlice.actions

