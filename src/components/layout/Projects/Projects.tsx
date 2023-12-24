import { IProject } from 'models/Project.types';

import {useEffect, useState} from 'react'
import './Projects.styles.scss';
import { ProjectList } from '../ProjectList/ProjectList';
import { useSearchProject, useSortProjects } from 'hooks/useFilter';
import { useAppSelector } from 'hooks/useAppSelector';

interface Props {
    
}

export const Projects: React.FC<Props> = () => {
    const {projects} = useAppSelector(state => state.ProjectsReducer)
    const {search, sortingBy} = useAppSelector(state => state.FilterReducer)
    const sortedProjects = useSortProjects(projects, sortingBy);
    const searchedProjects = useSearchProject(sortedProjects, search)

    
    return (
        <div className="projects">
            <div className="wrapper">
                {
                    searchedProjects.length ? <ProjectList projects={searchedProjects}/> : <h4>Проекты не найдены</h4>
                }
                
            </div>
        </div>
        
    )
}